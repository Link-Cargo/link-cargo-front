import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StyledComponentsRegistry from './_lib/registry';
import { RecoilRootWrapper, ReactQueryProviders } from './provider';

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
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <title>링카고, 바다에서 시작하는 해외수출, 더 쉽고 편리하게</title>
      </head>
      <RecoilRootWrapper>
        <ReactQueryProviders>
          <StyledComponentsRegistry>
            <body>{children}</body>
          </StyledComponentsRegistry>
        </ReactQueryProviders>
      </RecoilRootWrapper>
    </html>
  );
}
