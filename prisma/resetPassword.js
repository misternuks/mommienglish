import { PrismaClient } from '@prisma/client';  // Use ES Module syntax for imports
import bcrypt from 'bcryptjs';  // Import bcryptjs for password hashing

const prisma = new PrismaClient();  // Initialize Prisma Client

async function updateAdminPassword() {
  const plainPassword = 'Buntal0ve';  // Replace with the actual plain text password

  // Use bcryptjs to hash the password with saltRounds = 10 (a good balance for production)
  const hashedPassword = bcrypt.hashSync(plainPassword, 10);

  console.log('New hashed password:', hashedPassword);

  // Update the password in the database for the admin user
  await prisma.user.update({
    where: { email: 'moenaminer1029@gmail.com' },  // Adjust the email to match your admin user's email
    data: { password: hashedPassword },  // Update the password field with the new hashed password
  });

  console.log('Admin password updated successfully');
}

updateAdminPassword()
  .catch((e) => {
    console.error('Error updating admin password:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();  // Properly disconnect the Prisma client to prevent open connections in production
  });
