"use client";

import { useState } from "react";
import React from "react";

export default function Modify_comerce({ role }) {
  const [mensaje, setMensaje] = useState("");
  const [cif, setCif] = useState("");
  const [update, setUpdate] = useState({
    name: "",
    direccion: "",
    email: "",
    telefono: "",
    id_web: "",
  });

  const handleChangeUpdate = (event, field) => {
    setUpdate({
      ...update,
      [field]: event.target.value,
    });
  };

  const handleUpdate = () => {
    fetch(`http://localhost:3000/api/comerce/${cif}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("response.token")}`,
      },
      body: JSON.stringify(update),
    })
      .then((data) => {
        console.log("Comercio actualizado:", data);
        setMensaje("Comercio actualizado exitosamente.");
      })
      .catch((error) => {
        console.error("Error al actualizar el comercio:", error);
        setMensaje("Error al actualizar el comercio.");
      });
  };

  if (!role) return null;

  return (
    <div className="w-full max-w-xl mx-auto my-8">
      <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold text-blue-400 mb-4">Modificar Comercio</h3>

        <div className="space-y-4">
          {/* Input para el CIF */}
          <div>
            <label className="block text-sm font-medium text-black">CIF del Comercio:</label>
            <input
              type="text"
              value={cif}
              onChange={(e) => setCif(e.target.value)}
              className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Input para el Nombre */}
          <div>
            <label className="block text-sm font-medium text-black">Nombre:</label>
            <input
              type="text"
              value={update.name}
              onChange={(e) => handleChangeUpdate(e, "name")}
              className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Input para la Dirección */}
          <div>
            <label className="block text-sm font-medium text-black">Dirección:</label>
            <input
              type="text"
              value={update.direccion}
              onChange={(e) => handleChangeUpdate(e, "direccion")}
              className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Input para el Email */}
          <div>
            <label className="block text-sm font-medium text-black">Email:</label>
            <input
              type="email"
              value={update.email}
              onChange={(e) => handleChangeUpdate(e, "email")}
              className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Input para el Teléfono */}
          <div>
            <label className="block text-sm font-medium text-black">Teléfono:</label>
            <input
              type="text"
              value={update.telefono}
              onChange={(e) => handleChangeUpdate(e, "telefono")}
              className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Input para el ID Web */}
          <div>
            <label className="block text-sm font-medium text-black">ID Web:</label>
            <input
              type="text"
              value={update.id_web}
              onChange={(e) => handleChangeUpdate(e, "id_web")}
              className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Botón para actualizar comercio */}
          <button
            onClick={handleUpdate}
            className="w-full py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition duration-300"
          >
            Modificar Comercio
          </button>

          {/* Mensaje de confirmación o error */}
          {mensaje && (
            <p className="mt-4 text-blue-400 text-center text-lg font-semibold">{mensaje}</p>
          )}
        </div>
      </div>
    </div>
  );
}
