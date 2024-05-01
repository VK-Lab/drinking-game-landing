import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
// import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CrossX',
  description: 'Web3 Gaming Platform on Roblox',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
