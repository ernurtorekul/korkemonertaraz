import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/lib/supabase/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const data = await signIn(email, password);

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
    return NextResponse.json(
      { error: error?.message || 'Authentication failed' },
      { status: 401 }
    );
  }
}
