import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// Next.js processes this global stylesheet at build time.
// @ts-expect-error CSS files are handled by Next.js, not TypeScript.
import './globals.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Config } from '@/config';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: Config.metadata.title,
  description: Config.metadata.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
