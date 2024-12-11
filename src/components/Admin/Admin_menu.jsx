"use client";

import Link from "next/link";

export default function AdminMenu() {
  return (
    <nav className="h-full rounded-xl bg-gray-100 flex flex-col p-4 space-y-3 shadow-lg w-48">
      {/* Encabezado */}
      <h2 className="text-lg font-bold text-blue-400 mb-3">Menú Admin</h2>

      {/* Enlaces */} 
      <Link
        href="/user_log/admin_menu/create_comerce"
        className="py-2 px-3 rounded bg-gray-200 text-blue-400 hover:bg-gray-300 transition duration-300 text-sm"
      >
        Crear Comercio
      </Link>
      <Link
        href="/user_log/admin_menu/delete_comerce"
        className="py-2 px-3 rounded bg-gray-200 text-blue-400 hover:bg-gray-300 transition duration-300 text-sm"
      >
        Eliminar Comercio
      </Link>
      <Link
        href="/user_log/admin_menu/get_comerce"
        className="py-2 px-3 rounded bg-gray-200 text-blue-400 hover:bg-gray-300 transition duration-300 text-sm"
      >
        Obtener Comercio
      </Link>
      <Link
        href="/user_log/admin_menu/modify_comerce"
        className="py-2 px-3 rounded bg-gray-200 text-blue-400 hover:bg-gray-300 transition duration-300 text-sm"
      >
        Modificar Comercio
      </Link>
    </nav>
  );
}
