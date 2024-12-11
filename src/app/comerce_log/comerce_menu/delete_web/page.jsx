"use client";

import Comerce_menu from "@/Comerce/Comerce_menu";
import Delete_web from "@/Comerce/Delete_web";

export default function CreateComercePage() {
  return (
    <div className="w-full min-h-screen bg-white flex">
      {/* Barra lateral */}
      <div className="w-1/4 bg-white p-4">
        <Comerce_menu />
      </div>

      {/* Delete web */}
      <div className=" w-full max-w-xl mx-40">
        <Delete_web role={true} />
      </div>
    </div>
  );
}
