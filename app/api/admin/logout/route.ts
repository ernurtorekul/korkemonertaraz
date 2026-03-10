import { NextRequest, NextResponse } from 'next/server';
import { signOut } from '@/lib/supabase/auth';

export async function POST(request: NextRequest) {
  try {
    // Sign out from Supabase
    await signOut();

    // Create response and clear the admin token cookie
    const response = NextResponse.json({ success: true });

    response.cookies.set('adminToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: error?.message || 'Logout failed' },
      { status: 500 }
    );
  }
}
