import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';

import { PropsWithChildren } from '~/_definitions/props';

import './globals.css';

const geist = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Simple Next.js Application',
  description: 'Created by Arsalan Ansari'
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>{children}</body>
    </html>
  );
}
