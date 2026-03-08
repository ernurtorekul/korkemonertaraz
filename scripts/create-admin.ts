/**
 * Create Admin User Script
 *
 * Usage: npx tsx scripts/create-admin.ts <email> <password>
 *
 * Example: npx tsx scripts/create-admin.ts admin@example.com password123
 *
 * Make sure to run: npm install -D tsx first
 */

import { adminAuth } from '../lib/firebase/admin';

async function createAdminUser(email: string, password: string) {
  try {
    console.log(`Creating admin user: ${email}`);

    const userRecord = await adminAuth.createUser({
      email,
      password,
      emailVerified: false,
      disabled: false,
    });

    console.log('✅ Admin user created successfully!');
    console.log('UID:', userRecord.uid);
    console.log('Email:', userRecord.email);
    console.log('\nYou can now login at: http://localhost:3000/admin');
  } catch (error: any) {
    console.error('❌ Error creating admin user:', error.message);

    if (error.code === 'auth/email-already-exists') {
      console.log('\nUser already exists. You can use the existing credentials to login.');
    }
  }
}

// Get email and password from command line arguments
const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.log('Usage: npx tsx scripts/create-admin.ts <email> <password>');
  console.log('Example: npx tsx scripts/create-admin.ts admin@example.com mySecurePassword123');
  process.exit(1);
}

createAdminUser(email, password);
