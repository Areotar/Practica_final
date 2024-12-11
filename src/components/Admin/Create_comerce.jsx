"use client";

import { useState } from "react";
import React from "react";

export default function CreateComerce({ role }) {
  const [mensajeCreate, setMensajeCreate] = useState("");

  const [create, setCreate] = useState({
    name: "",
    cif: "",
    direccion: "",
    email: "",
    telefono: "",
    id_web: "",
  });

  const handleChangeCreate = (event, field) => {
    setCreate({
      ...create,
      [field]: event.target.value,
    });
  };

  const handleCreate = () => {
    fetch("http://localhost:3000/api/comerce", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("response.token")}`,
      },
      body: JSON.stringify(create),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al crear el comercio");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Comercio creado:", data);
        if (data.token) {
          console.log("Token del comercio:", data.token);
        }
        setMensajeCreate("¡Creación de comercio exitosa!");
      })
      .catch((error) => {
        console.error("Error al crear el comercio:", error);
        setMensajeCreate("Error al crear el comercio.");
      });
  };

  if (!role) return null;

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Crear Comercio</h1>

      <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full">
        <div className="space-y-4">
          <div>
            <label className="font-medium block mb-2 text-black">Nombre:</label>
            <input
              type="text"
              value={create.name}
              onChange={(e) => handleChangeCreate(e, "name")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
            />
          </div>
          <div>
            <label className="font-medium block mb-2 text-black">CIF:</label>
            <input
              type="text"
              value={create.cif}
              onChange={(e) => handleChangeCreate(e, "cif")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
            />
          </div>
          <div>
            <label className="font-medium block mb-2 text-black">Dirección:</label>
            <input
              type="text"
              value={create.direccion}
              onChange={(e) => handleChangeCreate(e, "direccion")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
            />
          </div>
          <div>
            <label className="font-medium block mb-2 text-black">Email:</label>
            <input
              type="email"
              value={create.email}
              onChange={(e) => handleChangeCreate(e, "email")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
            />
          </div>
          <div>
            <label className="font-medium block mb-2 text-black">Teléfono:</label>
            <input
              type="text"
              value={create.telefono}
              onChange={(e) => handleChangeCreate(e, "telefono")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
            />
          </div>
          <div>
            <label className="font-medium block mb-2 text-black">ID Web:</label>
            <input
              type="text"
              value={create.id_web}
              onChange={(e) => handleChangeCreate(e, "id_web")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
            />
          </div>
        </div>

        <button
          onClick={handleCreate}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Crear Comercio
        </button>

        {mensajeCreate && (
          <p className="text-center mt-4 text-blue-500 font-semibold">
            {mensajeCreate}
          </p>
        )}
      </div>
    </div>
  );
}
