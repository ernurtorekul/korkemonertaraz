import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/lib/supabase/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const data = await signIn(email, password);

    // Return the access token
    return NextResponse.json({
      token: data.session.access_token,
      user: { email: data.user.email }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error?.message || 'Authentication failed' },
      { status: 401 }
    );
  }
}
