import { Nunito } from "next/font/google";
import RegisterModal from "./components/Modals/RegisterModal";
import LoginModal from "./components/Modals/LoginModal";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import ToasterProvider from "./providers/ToasterProvider";

import './globals.css'
import { Toaster } from "react-hot-toast";
import getCurrentUser from "./actions/getCurrentUser";

export const metadata = {
  title: 'bnb@trc',
  description: 'BNB at TRC',
}

const font = Nunito({
  subsets:["latin"],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
      <ClientOnly>
        <ToasterProvider />
        <LoginModal/>
        <RegisterModal/>
        <Navbar currentUser={currentUser}/>
      </ClientOnly>
    </html>
  )
}
