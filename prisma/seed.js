// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL }, // Change to your admin email
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      isAdmin: true,
    },
  });
}

main()
  .then(() => {
    console.log('Admin user created');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
