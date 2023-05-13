import { Nunito } from "next/font/google";
import RegisterModal from "./components/Modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import ToasterProvider from "./providers/ToasterProvider";

import './globals.css'
import { Toaster } from "react-hot-toast";

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
        <ToasterProvider/>
        <RegisterModal/>
        <Navbar/>
      </ClientOnly>
    </html>
  )
}
