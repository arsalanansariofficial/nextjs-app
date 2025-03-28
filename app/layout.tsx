import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';

import Header from '~/_components/header';
import { PropsWithChildren } from '~/_lib/definitions';
import { ThemeProvider } from './_components/theme-provider';

import '~/globals.css';

const geist = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Simple Next.js Application',
  description: 'Created by Arsalan Ansari'
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.className} bg-background text-foreground p-4 antialiased`}
      >
        <ThemeProvider enableSystem attribute="class" defaultTheme="system">
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
