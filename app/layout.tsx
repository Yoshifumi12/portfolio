import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Container from './components/Container'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Yoshifumi Suzuki | Full Stack Software Engineer',
  description:
    'Full Stack Software Engineer (JavaScript/TypeScript) with production experience across React/Next.js frontends, Node.js backends, and PostgreSQL.',
  openGraph: {
    title: 'Yoshifumi Suzuki | Full Stack Software Engineer',
    description:
      'Full Stack Software Engineer (JavaScript/TypeScript) with production experience across React/Next.js frontends, Node.js backends, and PostgreSQL.',
    url: 'https://yoshi-xi.vercel.app',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Container>{children}</Container>
      </body>
    </html>
  )
}
