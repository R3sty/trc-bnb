
"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai"
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, [])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => { }}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          >
          Staycation at The Residences
        </div>
        <div
          className="p4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover;shadow-md transition"
          onClick={toggleOpen}>
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
            { console.log("current user:", currentUser)}
              {currentUser ? (
                <>
                  <MenuItem label="My Trips" onClick={()=> router.push("/trips") }/>
                  <MenuItem label="My Favorites" onClick={()=> router.push("/favorites") }/>
                  <MenuItem label="My Reservations" onClick={()=> router.push("/reservations") }/>
                  <MenuItem label="My Properties" onClick={()=> router.push("/properties") }/>
                  <MenuItem label="Rent your unit" onClick={() => router.push("/trips")} />
                  <hr/>
                  <MenuItem label="Logout" onClick={() => signOut()} />
                </>
              ) : (
                <>
                  <MenuItem label="Login"  onClick={loginModal.onOpen}/>
                  <MenuItem label="Sign up" onClick={registerModal.onOpen}/>
                </>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu;