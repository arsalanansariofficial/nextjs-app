'use server';

import z from 'zod';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs/promises';
import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { deleteUser, getUser, saveUser } from '~/_data/user-repository';

const signupSchema = z.object({
  email: z.string().email({ message: 'Shold be valid Email' }),
  name: z.string().min(7, { message: 'Should be atleast 7 characters' })
});

export type State = {
  image?: File;
  name?: string;
  email?: string;
  message?: string;
  errors?: { name?: string[]; email?: string[] };
};

export async function signup(
  _prevState: State,
  formData: FormData
): Promise<State> {
  const image = formData.get('image') as File;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const result = signupSchema.safeParse({ name, email });

  if (!result.success) {
    return {
      name,
      email,
      errors: result.error.flatten().fieldErrors as State['errors']
    };
  }

  try {
    const ext = path.extname(image.size ? image.name : 'user.jpg');
    const base = path.basename(image.size ? image.name : 'user.jpg', ext);
    const fileName = `${base}_${crypto.randomBytes(8).toString('hex')}${ext}`;
    const filePath = path.join(process.cwd(), 'public/user-images', fileName);

    const user = await saveUser({
      name,
      email,
      image: `/user-images/${fileName}`
    });

    if (!user) {
      throw new Error('Failed to save user');
    }

    if (image.size) {
      await fs.writeFile(filePath, Buffer.from(await image.arrayBuffer()));
    }

    if (!image.size) {
      const file = await fs.readFile(
        path.join(process.cwd(), 'public/user-images/user.jpg')
      );

      await fs.writeFile(filePath, Buffer.from(file.buffer));
    }
  } catch (error: unknown) {
    return { name, email, message: (error as Error).message };
  }

  revalidatePath('/');
  return { name, email };
}

export async function removeUser(id: string): Promise<string | User> {
  const user = await getUser(id);

  if (!user) {
    return 'Failed to delete user';
  }

  try {
    await fs.unlink(path.join(process.cwd(), 'public', user.image));
  } catch {
    return 'Failed to delete user';
  }

  const deleted = await deleteUser(id);

  if (!deleted) {
    return 'Failed to delete user';
  }

  revalidatePath('/');
  return user;
}
