import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, createAdminSession, isAdminConfigured } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    console.log('Admin login request received');
    console.log('ADMIN_EMAIL configured:', Boolean(process.env.ADMIN_EMAIL));
    console.log('ADMIN_PASSWORD_HASH configured:', Boolean(process.env.ADMIN_PASSWORD_HASH));

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

    // Create session
    await createAdminSession(email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('ADMIN LOGIN ERROR:', error);
    return NextResponse.json(
      { message: 'Internal server error during admin login.' },
      { status: 500 }
    );
  }
}