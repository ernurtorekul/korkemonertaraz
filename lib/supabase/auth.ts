import { supabase } from './client';
import { supabaseAdmin } from './server';

// Client-side: Sign in with email and password
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

// Client-side: Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Client-side: Get current user
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Client-side: Sign up with email and password
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

// Server-side: Verify admin token (session)
export async function verifyAdminSession(token: string): Promise<boolean> {
  try {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return false;
    }

    // You can add additional checks here, like checking if user email is from an approved list
    return true;
  } catch (error) {
    console.error('Error verifying session:', error);
    return false;
  }
}

// Server-side: Verify JWT token and return user data
export async function verifyToken(token: string) {
  try {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      throw new Error('Invalid token');
    }

    return user;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Invalid token');
  }
}

// Server-side: Create a new admin user
export async function createAdminUser(email: string, password: string): Promise<void> {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) throw error;
}
