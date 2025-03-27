import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type User = {
  name: string;
  email: string;
  image: string;
};

export async function saveUser(user: User) {
  try {
    // await prisma.user.deleteMany();
    return await prisma.user.create({ data: user });
  } catch {
    return null;
  }
}

export async function updateUser(id: string, user: User) {
  try {
    return await prisma.user.update({ data: user, where: { id } });
  } catch {
    return null;
  }
}

export async function getUsers() {
  try {
    return await prisma.user.findMany();
  } catch {
    return null;
  }
}

export async function getUser(id: string) {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

export async function deleteUser(id: string) {
  try {
    return await prisma.user.delete({ where: { id } });
  } catch {
    return null;
  }
}
