'use server';

import z from 'zod';
import path from 'path';
import fs from 'fs/promises';
import { User } from '@prisma/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { getImageName } from '~/lib/utils';
import * as userRepository from '~/_data/user-repository';

const emailError = { invalid: { message: 'Shold be valid Email' } };
const nameError = { min: { message: 'Should be atleast 7 characters' } };

const signupSchema = z.object({
  name: z.string().min(7, nameError.min),
  email: z.string().email(emailError.invalid)
});

const editSchema = z.object({
  name: z.string().min(7, nameError.min).optional(),
  email: z.string().email(emailError.invalid).optional()
});

export type State = {
  image?: File;
  name?: string;
  email?: string;
  message?: string;
  errors?: { name?: string[]; email?: string[] };
};

export async function signup(_: State, formData: FormData): Promise<State> {
  const image = formData.get('image') as File;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const result = signupSchema.safeParse({ name, email });

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors as State['errors'];
    return { name, email, errors };
  }

  const fileName = getImageName(image);
  const filePath = path.join(process.cwd(), 'public', fileName);
  const defaultPath = path.join(process.cwd(), 'public/user.jpg');

  try {
    let { buffer } = await fs.readFile(defaultPath);
    const user = await userRepository.saveUser({
      name,
      email,
      image: `${fileName}`
    });

    if (!user) throw new Error('Failed to save user');
    if (image.size) buffer = await image.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(buffer));

    revalidatePath('/');
    return { name, email };
  } catch (error: unknown) {
    return { name, email, message: (error as Error).message };
  }
}

export async function editUser(
  id: string,
  _: State,
  formData: FormData
): Promise<State> {
  const updateUser = userRepository.updateUser;
  const saved = await userRepository.getUser(id);
  if (!saved) return { message: 'Failed to update' };

  const image = formData.get('image') as File;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const result = editSchema.safeParse({ name, email });

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors as State['errors'];
    return { name, email, errors };
  }

  try {
    if (image.size) {
      const fileName = getImageName(image);
      const filePath = path.join(process.cwd(), 'public', fileName);

      await fs.unlink(path.join(process.cwd(), 'public', saved.image));
      await updateUser(id, { name, email, image: `${fileName}` });
      await fs.writeFile(filePath, Buffer.from(await image.arrayBuffer()));
    } else {
      const user = await updateUser(id, { ...saved, name, email });
      if (!user) throw new Error('Failed to save user');
    }
  } catch (error: unknown) {
    return { name, email, message: (error as Error).message };
  }

  revalidatePath('/');
  redirect('/');
}

export async function removeUser(id: string): Promise<string | User> {
  try {
    const user = await userRepository.getUser(id);
    const deleted = await userRepository.deleteUser(id);

    if (!user || !deleted) return 'Failed to delete user';
    await fs.unlink(path.join(process.cwd(), 'public', user.image));

    revalidatePath('/');
    return user;
  } catch {
    return 'Failed to delete user';
  }
}
