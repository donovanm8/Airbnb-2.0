import Image from "next/image";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  GlobeAltIcon,
  UserCircleIcon,
  XMarkIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import SignupModal from "./modals/SignupModal";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/init";
import { signoutUser } from "@/redux/userSlice";
import { closeHeader, openHeader } from "@/redux/modalSlice";
import SigninModal from "./modals/SignInModal";

export default function Header() {
  const firstName = useSelector((state) => state.user.name);
  const isEditing = useSelector((state) => state.modals.headerOpen);

  const dispatch = useDispatch();

  async function handleSignout() {
    await signOut(auth);
    dispatch(signoutUser());
  }

  return (
    <header
      className={`sticky z-50 grid grid-cols-2 ${
        !isEditing && "!grid-cols-3"
      } bg-white shadow-md p-5 md:px-10`}
    >
      <div className="relative flex items-center h-10 my-auto">
        <Image
          src={"https://rb.gy/snfck"}
          style={{ objectFit: "contain", objectPosition: "left" }}
          fill
          className="cursor-pointer"
        />
      </div>
      {!isEditing && (
        <div className="flex items-center py-2 border-b md:border-2 md:rounded-full md:shadow-sm">
          <input
            type="text"
            placeholder="Start your search"
            className="outline-none pl-4 bg-transparent flex-grow text-sm text-gray-600 placeholder:text-gray-400"
          />
          <MagnifyingGlassIcon className="hidden md:inline-flex h-8 p-2 rounded-full bg-airbnb text-white cursor-pointer md:mx-2" />
        </div>
      )}
      <div className={`flex items-center justify-end space-x-4 text-gray-500`}>
        {!isEditing ? (
          <>
            <p className="hidden lg:inline-flex">Airbnb your home</p>
            <GlobeAltIcon className="hidden sm:inline w-6 iconAnim" />
            <div
              className={`flex items-center space-x-2 border-2 rounded-full p-2 iconAnim ${
                firstName && "px-4"
              }`}
              onClick={() => dispatch(openHeader())}
            >
              <Bars3Icon className="w-6" />
              <UserCircleIcon className="w-6 " />
            </div>
          </>
        ) : (
          <div className="relative flex items-center space-x-6 md:space-x-4">
            {!firstName ? (
              <>
                <SignupModal />
                <SigninModal />
                <XMarkIcon
                  onClick={() => dispatch(closeHeader())}
                  className="absolute top-2.5 -left-16 md:-left-20 w-6 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
                />
              </>
            ) : (
              <>
                <button
                  className="headerBtn bg-airbnb text-white"
                  onClick={handleSignout}
                >
                  Log out
                </button>
                <XMarkIcon
                  onClick={() => dispatch(closeHeader())}
                  className="absolute top-2.5 -left-16 md:-left-20 w-6 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
                />
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
