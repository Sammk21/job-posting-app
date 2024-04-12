"use client";
import Hero from "@/modules/client";
import CompanyListing from "@/modules/comopany-list";

export default function Home() {


  return (
   
      <main className="flex flex-col items-center justify-between p-24 gap-y-6 relative ">
        <Hero />
        <CompanyListing />
      </main>

  );
}
