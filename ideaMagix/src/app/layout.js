import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/modules/navbar/Navbar";
import { UserProvider } from "@/context/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Navbar />
          <main className="flex flex-col items-center justify-between p-24 gap-y-6 relative ">
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
