import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StyledComponentsRegistry from './_lib/registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '링카고',
  description: '바다에서 시작하는 해외수출, 더 쉽고 편리하게',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <title>링카고, 바다에서 시작하는 해외수출, 더 쉽고 편리하게</title>
      </head>
      <StyledComponentsRegistry>
        <body className={inter.className}>{children}</body>
      </StyledComponentsRegistry>
    </html>
  );
}
