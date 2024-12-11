"use client";

import Comerce_menu from "@/Comerce/Comerce_menu";
import Get_users from "@/Comerce/Get_users";

export default function CreateComercePage() {
  return (
    <div className="w-full min-h-screen bg-white flex">
      {/* Barra lateral */}
      <div className="w-1/4 bg-white p-4">
        <Comerce_menu />
      </div>

      {/* Get de los usuarios */}
      <div className=" w-full max-w-xl mx-40">
        <Get_users role={true} />
      </div>
    </div>
  );
}
