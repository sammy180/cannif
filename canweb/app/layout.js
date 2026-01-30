import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OpenCAN-ESP32 - Automotive-grade CAN/CAN FD & LIN Interface',
  description: 'Open-source ESP32-based interface board for CAN, CAN FD, and LIN buses. Automotive-grade, IP68-rated, with isolated transceivers.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
