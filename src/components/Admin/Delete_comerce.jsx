"use client";

import { useState } from "react";
import React from "react";

export default function Delete_comerce({ role }) {
  const [mensaje, setMensaje] = useState("");
  const [cif, setCif] = useState("");

  const handleDelete = () => {
    fetch(`http://localhost:3000/api/comerce/${cif}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("response.token")}`,
      },
    })
      .then(() => {
        console.log("Comercio eliminado.");
        setMensaje("Comercio eliminado con éxito.");
      })
      .catch((error) => {
        console.error("Error al eliminar el comercio:", error);
        setMensaje("Error al eliminar el comercio.");
      });
  };

  if (!role) return null;

  return (
    <div className="w-full max-w-xl mx-auto my-8">
      <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold text-blue-400 mb-4">Eliminar Comercio</h3>

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

          {/* Botón para eliminar comercio */}
          <button
            onClick={handleDelete}
            className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
          >
            Eliminar Comercio
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
