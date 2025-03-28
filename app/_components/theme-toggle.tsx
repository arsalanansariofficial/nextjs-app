'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

import { useTheme } from 'next-themes';

import { Button } from '~/_components/ui/button';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme((localStorage.getItem('theme') as string) || 'light');
  }, [setTheme]);

  return (
    <Button
      size="icon"
      variant="outline"
      className="justify-self-end"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
