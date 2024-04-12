"use client"
import { useUser } from '@/context/context';
import React, { useEffect, useState } from 'react'
import {useRouter } from "next/navigation"
import Link from "next/link"
const navigation = [
  { name: "Home", href: "/" },
  { name: "Applied", href: "/applied" },
];
const Navbar = () => {

   const { userData, logout } =  useUser();

   const [isAdmin, setIsAdmin]  = useState(false);

   const router = useRouter()

    const handleLogout = () => {
      logout();
      router.push("/login")
    };

    useEffect(()=>{
     userData?.role === "admin" ? setIsAdmin(true) : setIsAdmin(false);
    },[userData])


  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <h1>Ideamagix</h1>
            </a>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-white"
              >
                {item.name}
              </Link>
            ))}
            {isAdmin && <Link href="/admin">Admin Panel</Link>}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {userData ? (
              <div className="flex justify-between items-center">
                <div className="mr-4">
                  <Link
                    className="text-sm bg-white text-black px-4 py-2 rounded-full"
                    href="/addpersonalinfo"
                  >
                    upload your info
                  </Link>
                </div>
                <div className="mr-4">
                  <button
                    onClick={handleLogout}
                    className="text-sm bg-white text-black px-4 py-2 rounded-full"
                  >
                    Logout
                  </button>
                </div>

                <div>
                  <h1>Welcome, {userData.name}</h1>
                  {/* Display other user data */}
                </div>
              </div>
            ) : (
              <a
                href="/login"
                className="text-sm font-semibold leading-6 text-white"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar


