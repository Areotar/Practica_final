"use client";

import React from "react";
import Modify_web from "@/Comerce/Modify_web";
import Comerce_menu from "@/Comerce/Comerce_menu"; // Asegúrate de que la ruta sea correcta.

export default function CreateWebPage() {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Barra lateral */}
      <aside className="w-64 bg-white p-4">
        <Comerce_menu />
      </aside>

      {/* Modify Web */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          <Modify_web />
        </div>
      </main>
    </div>
  );
}
