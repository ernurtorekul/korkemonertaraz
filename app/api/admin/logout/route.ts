import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Create response and clear the admin token cookie
    const response = NextResponse.json({ success: true });

    response.cookies.delete('adminToken');

    return response;
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: error?.message || 'Logout failed' },
      { status: 500 }
    );
  }
}
