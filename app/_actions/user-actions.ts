'use server';

import z from 'zod';
import path from 'path';
import fs from 'fs/promises';
import { admin, signIn, loginSchema, signOut } from '../../auth';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { getImageName } from '~/_lib/utils';
import * as userRepository from '~/_data/user-repository';
import { loginState, SignupState } from '~/_lib/definitions';

const errors = {
  email: { invalid: { message: 'Shold be valid Email' } },
  name: { min: { message: 'Should be atleast 7 characters' } }
};

const signupSchema = z.object({
  name: z.string().min(7, errors.name.min),
  email: z.string().email(errors.email.invalid)
});

const editSchema = z.object({
  name: z.string().min(7, errors.name.min).optional(),
  email: z.string().email(errors.email.invalid).optional()
});

export async function deleteUser(id: string) {
  try {
    const user = await userRepository.getUser(id);
    const deleted = await userRepository.deleteUser(id);

    if (!user || !deleted) return { message: 'Failed to delete user' };
    await fs.unlink(path.join(process.cwd(), 'public', user.image));

    revalidatePath('/');
    return { user };
  } catch {
    return { message: 'Failed to delete user' };
  }
}

export async function signupUser(
  _: SignupState,
  formData: FormData
): Promise<SignupState> {
  const image = formData.get('image') as File;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const result = signupSchema.safeParse({ name, email });

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors as SignupState['errors'];
    return { name, email, errors };
  }

  const fileName = getImageName(image);
  const filePath = path.join(process.cwd(), 'public', fileName);
  const defaultPath = path.join(process.cwd(), 'public/sample/user.jpg');

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

export async function updateUser(
  id: string,
  _: SignupState,
  formData: FormData
): Promise<SignupState> {
  const updateUser = userRepository.updateUser;
  const saved = await userRepository.getUser(id);
  if (!saved) return { message: 'Failed to update' };

  const image = formData.get('image') as File;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const result = editSchema.safeParse({ name, email });

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors as SignupState['errors'];
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

export async function loginAdmin(
  _: loginState,
  formData: FormData
): Promise<loginState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const result = loginSchema.safeParse({ email, password });

  if (!result.success) {
    return { email, password, errors: result.error.flatten().fieldErrors };
  }

  if (email === admin.email && password === admin.password) {
    return await signIn('credentials', formData);
  }

  return { email, password, message: 'Login failed' };
}

export async function logoutAdmin() {
  'use server';
  await signOut();
}
