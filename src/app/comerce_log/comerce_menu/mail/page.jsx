"use client";

import Comerce_menu from "@/Comerce/Comerce_menu";
import Mail from "@/Comerce/Mail";

export default function CreateComercePage() {
  return (
    <div className="w-full min-h-screen bg-white flex">
      {/* Barra lateral */}
      <div className="w-1/4 bg-white p-4">
        <Comerce_menu />
      </div>

      {/* Mail */}
      <div className=" w-full max-w-xl mx-40">
        <Mail role={true} />
      </div>
    </div>
  );
}
