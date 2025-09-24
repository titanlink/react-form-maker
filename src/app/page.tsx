'use client'

import { Playground } from "@/components/custom/form/Playground";
import { Toaster } from "sonner";


export default function Home() {
  

  return (
    <div className="w-full font-sans px-4 py-8 ">
      <main className="flex flex-col  row-start-2 items-center sm:items-start">
        <Playground />
         <Toaster richColors />
      </main>
    </div>
  );
}
