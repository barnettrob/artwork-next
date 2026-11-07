import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
