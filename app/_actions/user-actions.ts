'use server';

import { redirect } from 'next/navigation';

export type State = {
  image?: File;
  name?: string;
  email?: string;
  errors?: { name?: string; email?: string };
};

export async function signup(
  prevState: State,
  formData: FormData
): Promise<State> {
  const errors: State['errors'] = {};

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  // const image = formData.get('image') as File;

  if (!name) {
    errors.name = 'Enter a valid Name';
  }

  if (!email) {
    errors.email = 'Enter a valid Email';
  }

  if (name && !email) {
    redirect('/');
  }

  return { name, email, errors };
}
