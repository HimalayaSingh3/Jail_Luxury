'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login() {
  // Redirect to Google OAuth
  redirect(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`);
}

export async function logout() {
  // Clear session cookie
  cookies().delete('session');
  redirect('/login');
}

export async function getSession() {
  const session = cookies().get('session');
  return session ? session.value : null;
}