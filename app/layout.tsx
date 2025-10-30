import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sound Board',
  description: 'Interactive sound board with various sound effects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
