"use client";

import Link from "next/link";

export default function Comerce_menu() {
  return (
    <nav className="h-full rounded-xl bg-gray-100 flex flex-col p-4 space-y-3 shadow-lg w-48">
      {/* Encabezado */}
      <h2 className="text-lg font-bold text-blue-400 mb-3">Menú Comercio</h2>

      {/* Enlaces */} 
      <Link
        href="/comerce_log/comerce_menu/create_web"
        className="py-2 px-3 rounded bg-gray-200 text-blue-400 hover:bg-gray-300 transition duration-300 text-sm"
      >
        Crear Web
      </Link>
      <Link
        href="/comerce_log/comerce_menu/delete_web"
        className="py-2 px-3 rounded bg-gray-200 text-blue-400 hover:bg-gray-300 transition duration-300 text-sm"
      >
        Eliminar Web
      </Link>
      <Link
        href="/comerce_log/comerce_menu/modify_web"
        className="py-2 px-3 rounded bg-gray-200 text-blue-400 hover:bg-gray-300 transition duration-300 text-sm"
      >
        Modificar Web
      </Link>
      <Link
        href="/comerce_log/comerce_menu/get_users"
        className="py-2 px-3 rounded bg-gray-200 text-blue-400 hover:bg-gray-300 transition duration-300 text-sm"
      >
        Obtener Usuarios
      </Link>
      <Link
        href="/comerce_log/comerce_menu/mail"
        className="py-2 px-3 rounded bg-gray-200 text-blue-400 hover:bg-gray-300 transition duration-300 text-sm"
      >
        Enviar emails
      </Link>
    </nav>
  );
}
