"use client";

import Get_comerce from "@/Admin/Get_comerce";
import AdminMenu from "@/Admin/Admin_menu";

export default function DeleteComercePage() {
  return (
    <div className="w-full min-h-screen bg-white flex">
      {/* Barra lateral izquierda con AdminMenu */}
      <div className="w-1/4 bg-white p-4">
        <AdminMenu />
      </div>

      {/* Contenido principal */}
      <div className="w-full max-w-xl mx-40 my-10 ">
        <Get_comerce role={true} />
      </div>
    </div>
  );
}
