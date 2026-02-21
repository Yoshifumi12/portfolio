import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Minimize2, X } from 'lucide-react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Yoshi',
  description: 'Portfolio built with Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="relative flex h-dvh overflow-hidden p-4">
          <div className="relative overflow-hidden rounded-lg border transition-all duration-700 size-full bg-neutral-800 flex flex-col">
            <div className="flex gap-2 opacity-50 p-2 shrink-0">
              <div className="bg-red-600 text-red-600 hover:text-red-800 rounded-full w-5 h-5 cursor-pointer">
                <X width={20} height={20} />
              </div>
              <div className="bg-slate-700 rounded-full w-5 h-5" />
              <div className="bg-green-600 text-green-600 hover:text-green-800 rounded-full w-5 h-5 cursor-pointer overflow-hidden">
                <Minimize2 width={20} height={20} className="rotate-90" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-600 hover:scrollbar-thumb-gray-300">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
