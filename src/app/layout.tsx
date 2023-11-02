'use client';
import './globals.css'
import { Inter } from 'next/font/google'
import {Realtime} from 'ably'
import { AblyProvider } from 'ably/react'


const inter = Inter({ subsets: ['latin'] })


const prefix = process.env.API_ROOT || ''
const clientId =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15)


const client = new Realtime.Promise({authUrl: `${prefix}/api?clientId=${clientId}`})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AblyProvider client={client}>
          {children}
        </AblyProvider>
      </body>
    </html>
  )
}
