import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/lib/supabase/auth';

// Rate limiting: Simple in-memory store (use Redis/Upstash in production)
const loginAttemptsMap = new Map<string, { count: number; resetTime: number; lastAttempt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_ATTEMPTS = 5; // Max 5 failed attempts per 15 minutes per IP
const LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes lockout after max attempts

function checkLoginRateLimit(identifier: string): { allowed: boolean; error?: string } {
  const now = Date.now();
  const record = loginAttemptsMap.get(identifier);

  if (!record || now > record.resetTime) {
    // First attempt or window expired
    loginAttemptsMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW, lastAttempt: now });
    return { allowed: true };
  }

  // Check if locked out
  if (record.count >= RATE_LIMIT_MAX_ATTEMPTS) {
    const lockoutEndTime = record.lastAttempt + LOCKOUT_DURATION;
    if (now < lockoutEndTime) {
      const remainingMinutes = Math.ceil((lockoutEndTime - now) / 60000);
      return { allowed: false, error: `Too many failed login attempts. Please try again in ${remainingMinutes} minutes.` };
    } else {
      // Lockout period expired, reset
      loginAttemptsMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW, lastAttempt: now });
      return { allowed: true };
    }
  }

  // Increment attempt count
  record.count++;
  record.lastAttempt = now;
  return { allowed: true };
}

function recordFailedLogin(identifier: string) {
  const record = loginAttemptsMap.get(identifier);
  if (record) {
    record.count++;
    record.lastAttempt = Date.now();
  }
}

function clearLoginAttempts(identifier: string) {
  loginAttemptsMap.delete(identifier);
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Rate limiting based on IP
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimitCheck = checkLoginRateLimit(ip);

    if (!rateLimitCheck.allowed) {
      return NextResponse.json({ error: rateLimitCheck.error }, { status: 429 });
    }

    const data = await signIn(email, password);

    // Clear failed login attempts on successful login
    clearLoginAttempts(ip);

    // Create response with token in body for client-side storage
    const response = NextResponse.json({
      token: data.session.access_token,
      user: { email: data.user.email }
    });

    // Set httpOnly cookie for server-side verification (middleware)
    // Cookie expires in 7 days (same as Supabase session default)
    const expiresAt = data.session.expires_at
      ? new Date(data.session.expires_at * 1000)
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    response.cookies.set('adminToken', data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);

    // Record failed login attempt
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    recordFailedLogin(ip);

    return NextResponse.json(
      { error: error?.message || 'Authentication failed' },
      { status: 401 }
    );
  }
}
