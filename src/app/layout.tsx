'use client';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { configureAbly } from "@ably-labs/react-hooks";
import { useEffect } from 'react'


const inter = Inter({ subsets: ['latin'] })


const prefix = process.env.API_ROOT || ''
const clientId =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15)

configureAbly({
  authUrl: `${prefix}/api?clientId=${clientId}`,
  clientId: clientId,
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
