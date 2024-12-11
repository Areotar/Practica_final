import { useState } from "react";
import React from "react";

export default function Get_comerce({ role }) {
  const [mensaje, setMensaje] = useState("");
  const [cifGet, setCifGet] = useState("");
  const [getComerce, setGetComerce] = useState("");

  const handleGet = () => {
    fetch(`http://localhost:3000/api/comerce/${cifGet}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("response.token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGetComerce(data);
        // setMensaje("Comercio encontrado:");
        console.log("Comercio encontrado:", data);
      })
      .catch((error) => {
        console.error("Error al obtener el comercio:", error);
        setGetComerce(null);
        setMensaje("No se pudo encontrar el comercio.");
      });
  };

  if (!role) return null;
  return (
    <div className="p-6 bg-gray-100 shadow-lg rounded-lg max-w-2xl mx-auto my-8">
      <h3 className="text-2xl font-semibold text-blue-400 mb-4">Obtener Comercio</h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="cifGet" className="block text-sm font-medium text-black">CIF del Comercio:</label>
          <input
            type="text"
            id="cifGet"
            value={cifGet}
            onChange={(e) => setCifGet(e.target.value)}
            className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={handleGet}
          className="w-full py-2 bg-blue-400 text-black rounded-md hover:bg-blue-500 transition duration-200"
        >
          Buscar Comercio
        </button>

        <p className="mt-4 text-lg text-black">{mensaje}</p>

        {getComerce && (
          <div className="mt-6 p-4 text-black bg-gray-50 border border-gray-200 rounded-md">
            <h4 className="text-xl font-semibold text-blue-400 mb-2">Detalles del Comercio:</h4>
            <p><strong>Nombre:</strong> {getComerce.name}</p>
            <p><strong>Dirección:</strong> {getComerce.direccion}</p>
            <p><strong>Email:</strong> {getComerce.email}</p>
            <p><strong>Teléfono:</strong> {getComerce.telefono}</p>
            <p><strong>ID Web:</strong> {getComerce.id_web}</p>
          </div>
        )}
      </div>
    </div>
  );
}
