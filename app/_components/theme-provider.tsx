'use client';

import React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { ThemeProviderProps } from '~/_lib/definitions';

export function ThemeProvider(props: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{props.children}</NextThemesProvider>;
}
