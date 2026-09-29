import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'change-this-in-production';

// Convert SESSION_SECRET to Uint8Array for jose
const SECRET_KEY = new TextEncoder().encode(SESSION_SECRET);

export interface AdminSession {
  email: string;
  expiresAt: string;
}

/**
 * Verify admin credentials against environment variables
 */
export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  console.log('=== verifyAdminCredentials ===');
  console.log('Input email:', email);
  console.log('Input password length:', password.length);
  console.log('ADMIN_EMAIL:', ADMIN_EMAIL);
  console.log('ADMIN_PASSWORD_HASH:', ADMIN_PASSWORD_HASH);

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH) {
    console.error('Admin credentials not configured in environment');
    return false;
  }

  // Normalize email
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedAdminEmail = ADMIN_EMAIL.trim().toLowerCase();

  console.log('Normalized email:', normalizedEmail);
  console.log('Normalized admin email:', normalizedAdminEmail);
  console.log('Email matches:', normalizedEmail === normalizedAdminEmail);

  if (normalizedEmail !== normalizedAdminEmail) {
    console.log('Email comparison failed');
    return false;
  }

  // Verify password using bcrypt
  try {
    console.log('Attempting bcrypt.compare...');
    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    console.log('Password comparison result:', isValid);
    return isValid;
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}

/**
 * Create admin session with JWT token
 */
export async function createAdminSession(email: string): Promise<void> {
  console.log('=== createAdminSession ===');
  console.log('Creating session for email:', email);
  console.log('SESSION_SECRET configured:', !!SESSION_SECRET);
  
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  
  const token = await new SignJWT({ email, expiresAt: expiresAt.toISOString() })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET_KEY);
  
  console.log('JWT token created, length:', token.length);

  const cookieStore = await cookies();
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });
  
  console.log('Cookie set: admin_session');
}

/**
 * Verify admin session from cookie
 */
export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');

  if (!sessionCookie) {
    return false;
  }

  try {
    const { payload } = await jwtVerify(sessionCookie.value, SECRET_KEY);
    const expiresAt = new Date((payload as any).expiresAt);
    
    return expiresAt > new Date();
  } catch (error) {
    return false;
  }
}

/**
 * Clear admin session
 */
export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}

/**
 * Check if admin credentials are configured
 */
export function isAdminConfigured(): boolean {
  return !!(ADMIN_EMAIL && ADMIN_PASSWORD_HASH);
}
