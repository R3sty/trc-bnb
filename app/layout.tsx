import { Nunito } from 'next/font/google'
import Navbar from "@/app/components/navbar/Navbar";
import LoginModal from "@/app/components/Modals/LoginModal";
import RegisterModal from "@/app/components/Modals/RegisterModal";
import RentModal from "./components/Modals/RentModal";

import ToasterProvider from '@/app/providers/ToasterProvider';

import './globals.css'
import ClientOnly from './components/ClientOnly';
import getCurrentUser from './actions/getCurrentUser';

export const metadata = {
  title: 'trc-bnb',
  description: 'TRC-BnB',
}

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}
