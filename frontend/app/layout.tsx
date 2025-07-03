import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Project QA Assistant',
  description: 'Projet QA Assistant is a tool to help you with your project-related questions and tasks.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
