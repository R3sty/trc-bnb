import { Nunito } from "next/font/google";
import Modal from "./components/Modals/Modal";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";

import './globals.css'

export const metadata = {
  title: 'bnb@trc',
  description: 'BNB at TRC',
}

const font = Nunito({
  subsets:["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
     <ClientOnly>
        <Navbar />
      </ClientOnly>
    </html>
  )
}
