'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { ThemeProviderProps } from '~/_lib/definitions';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
