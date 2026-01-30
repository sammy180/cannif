import '../globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin Dashboard - OpenCAN-ESP32',
  description: 'Waitlist management dashboard for OpenCAN-ESP32 launch.',
}

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
