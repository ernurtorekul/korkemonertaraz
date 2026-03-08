/**
 * Create Admin User Script (Node.js version)
 *
 * Usage: node scripts/create-admin.js <email> <password>
 *
 * Example: node scripts/create-admin.js admin@example.com password123
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('../korkemtarazsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'korkemtaraz-f6b00',
});

const auth = admin.auth();

async function createAdminUser(email, password) {
  try {
    console.log(`Creating admin user: ${email}`);

    const userRecord = await auth.createUser({
      email: email,
      password: password,
      emailVerified: false,
      disabled: false,
    });

    console.log('✅ Admin user created successfully!');
    console.log('UID:', userRecord.uid);
    console.log('Email:', userRecord.email);
    console.log('\nYou can now login at: http://localhost:3000/admin');
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);

    if (error.code === 'auth/email-already-exists') {
      console.log('\n⚠️  User already exists. You can use the existing credentials to login.');
    }
  }
}

// Get email and password from command line arguments
const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.log('Usage: node scripts/create-admin.js <email> <password>');
  console.log('Example: node scripts/create-admin.js admin@example.com mySecurePassword123');
  process.exit(1);
}

createAdminUser(email, password)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
