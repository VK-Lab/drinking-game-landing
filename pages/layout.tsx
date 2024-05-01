'use client';

import './globals.css';
import { Providers } from './providers';
import localFont from 'next/font/local';

const myFont = localFont({ src: './SuperMario256.ttf', variable: '--my-font' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${myFont.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
