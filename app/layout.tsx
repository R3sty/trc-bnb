import { Nunito } from 'next/font/google'
import Navbar from "@/app/components/navbar/Navbar";
import LoginModal from "@/app/components/Modals/LoginModal";
import RegisterModal from "@/app/components/Modals/RegisterModal";
import RentModal from "./components/Modals/RentModal";

import './globals.css'
import ClientOnly from './components/ClientOnly';
import getCurrentUser from './actions/getCurrentUser';

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
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
          <LoginModal/>
          <RegisterModal/>
          <RentModal/>
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}
