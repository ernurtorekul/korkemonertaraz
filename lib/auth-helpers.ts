import { cookies } from 'next/headers';
import { verifyAdminSession } from '@/lib/supabase/auth';
import { NextRequest } from 'next/server';

/**
 * Get admin token from request (checks Authorization header and cookie)
 */
export async function getAdminToken(request?: NextRequest): Promise<string | null> {
  // First try Authorization header (for direct API calls)
  const authHeader = request?.headers.get('authorization')?.replace('Bearer ', '');

  if (authHeader) {
    return authHeader;
  }

  // Fall back to cookie (for browser requests)
  try {
    const cookieStore = await cookies();
    return cookieStore.get('adminToken')?.value || null;
  } catch {
    return null;
  }
}

/**
 * Verify admin authentication (checks both header and cookie)
 */
export async function verifyAdminAuth(request?: NextRequest): Promise<boolean> {
  const token = await getAdminToken(request);
  return token ? await verifyAdminSession(token) : false;
}
