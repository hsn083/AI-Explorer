import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, isAdminConfigured } from '@/lib/admin-auth';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'change-this-in-production';
const SECRET_KEY = new TextEncoder().encode(SESSION_SECRET);

export async function POST(request: NextRequest) {
  try {
    console.log('Admin login request received');
    console.log('ADMIN_EMAIL configured:', Boolean(process.env.ADMIN_EMAIL));
    console.log('ADMIN_PASSWORD_HASH configured:', Boolean(process.env.ADMIN_PASSWORD_HASH));
    console.log('SESSION_SECRET configured:', !!SESSION_SECRET);

    // Check if admin credentials are configured
    if (!isAdminConfigured()) {
      console.error('Admin credentials not configured');
      return NextResponse.json(
        { message: 'Admin email is not configured.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('Request body:', body);
    
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    
    console.log('Parsed email:', email);
    console.log('Parsed password length:', password.length);

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Verify credentials
    const isValid = await verifyAdminCredentials(email, password);
    console.log('Credentials valid:', isValid);

    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create session token
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    
    const token = await new SignJWT({ email, expiresAt: expiresAt.toISOString() })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(SECRET_KEY);
    
    console.log('JWT token created, length:', token.length);

    // Create response with cookie
    const response = NextResponse.json({ success: true });
    
    // Set cookie on the response
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });
    
    console.log('Cookie set on response: admin_session');

    return response;
  } catch (error) {
    console.error('ADMIN LOGIN ERROR:', error);
    return NextResponse.json(
      { message: 'Internal server error during admin login.' },
      { status: 500 }
    );
  }
}