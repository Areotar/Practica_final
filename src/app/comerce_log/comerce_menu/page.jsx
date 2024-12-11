"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ComerceMenu() {
  // Estado para la búsqueda
  const [search, setSearch] = useState("");

  // Opciones del menú
  const menuOptions = [
    {
      name: "Crear Web",
      href: "comerce_menu/create_web",
    },
    {
      name: "Eliminar Web",
      href: "comerce_menu/delete_web",
    },
    {
      name: "Modifcar Web",
      href: "comerce_menu/modify_web",
    },
    {
      name: "Obtener Usuarios Interesados",
      href: "comerce_menu/get_users",
    },
    {
      name: "Enviar emails",
      href: "comerce_menu/mail",
    },
  ];

  // Filtrar las opciones según la búsqueda
  const filteredOptions = menuOptions.filter(option =>
    option.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Menú de Comercio</h1>

      {/* Campo de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar funcion"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => (
            <Link
              key={index}
              href={option.href}
              className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:bg-gray-200"
            >
              <h2 className="text-xl font-semibold text-blue-400">{option.name}</h2>
              <div className="w-full max-w-xs">{option.component}</div>
            </Link>
          ))
        ) : (
          <p className="text-center text-black col-span-1 md:col-span-2">No se encontraron coincidencias.</p>
        )}
      </div>
    </div>
  );
}
