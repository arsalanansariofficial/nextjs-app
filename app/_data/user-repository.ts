import { PrismaClient } from '@prisma/client';

import { UserPayload } from '~/_lib/definitions';

const prisma = new PrismaClient();

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

export async function saveUser(user: UserPayload) {
  try {
    return await prisma.user.create({ data: user });
  } catch {
    return null;
  }
}

export async function updateUser(id: string, user: UserPayload) {
  try {
    return await prisma.user.update({ data: user, where: { id } });
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
