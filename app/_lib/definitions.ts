import React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { User } from '@prisma/client';
import * as LabelPrimitive from '@radix-ui/react-label';
import type { VariantProps } from 'class-variance-authority';

import { buttonVariants } from '~/_components/ui/button';

export type EditProps = { user?: User };
export type UsersProps = { users: User[] };

export type EditPageProps = { params: Promise<{ id: string }> };
export type RouteProps = { params: Promise<{ imageName: string }> };

export type InputProps = React.ComponentProps<'input'>;
export type PropsWithChildren = Readonly<{ children: React.ReactNode }>;

export type UserPayload = { name: string; email: string; image: string };
export type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root>;

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };
export type ThemeProviderProps = React.ComponentProps<
  typeof NextThemesProvider
>;

export type loginState = {
  email?: string;
  message?: string;
  password?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};

export type SignupState = {
  image?: File;
  name?: string;
  email?: string;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
  };
};
