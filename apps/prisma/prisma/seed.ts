import { PrismaClient } from '@prisma/client/basic';

const prisma = new PrismaClient();

async function main() {
  const davy = await prisma.user.upsert({
    where: { username: 'davy' },
    update: {},
    create: {
      username: 'davy',
      password: '123456',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  const testSchema = await prisma.schema.upsert({
    where: { name: 'test databases' },
    update: {},
    create: {
      name: 'test databases',
      dbType: 'postgres',
      dbUrl: 'postgresql://postgres@localhost:5432/shukun_ai',
      tables: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  console.log({ davy, testSchema });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
