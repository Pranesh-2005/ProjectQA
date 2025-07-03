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
      <head>
        {/* Favicon for most browsers */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* SVG Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        {/* Android Chrome */}
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />
        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        {/* Microsoft Tile */}
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        {/* Theme Color */}
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>{children}</body>
    </html>
  )
}
