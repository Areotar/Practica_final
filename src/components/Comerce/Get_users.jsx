"use client"

import { useState } from "react";
import React from "react";

export default function Get_users() {
    const [mensaje, setMensaje] = useState("");
    const [cif, setCif] = useState("");
    const [interesados, setInteresados] = useState([]);

    const handleGetUsers = async () => {
        if (!cif) {
            setMensaje("Por favor, ingresa un CIF válido.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/web/interes/${cif}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("comerceToken")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Error al obtener los interesados.");
            }

            const data = await response.json();
            setInteresados(data);
            setMensaje("Usuarios interesados obtenidos con éxito.");
        } catch (error) {
            console.error("Error al obtener los interesados:", error);
            setMensaje("Error al obtener los interesados.");
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto my-8">
            <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
                <h3 className="text-2xl font-semibold text-blue-400 mb-4 text-center">
                    Usuarios Interesados
                </h3>

                <div className="space-y-4">
                    {/* Input para el CIF */}
                    <div>
                        <label className="block text-sm font-medium text-black">CIF de la web:</label>
                        <input
                            type="text"
                            value={cif}
                            onChange={(e) => setCif(e.target.value)}
                            className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Introduce el CIF de la web"
                        />
                    </div>

                    {/* Botón para obtener los interesados */}
                    <button
                        onClick={handleGetUsers}
                        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Obtener Interesados
                    </button>

                    {/* Mensaje de confirmación o error */}
                    {mensaje && (
                        <p
                            className={`mt-4 text-center ${
                                mensaje.includes("éxito") ? "text-green-500" : "text-red-500"
                            }`}
                        >
                            {mensaje}
                        </p>
                    )}

                    {/* Lista de interesados */}
                    {interesados.length > 0 && (
                        <div className="mt-6">
                            <h5 className="text-xl font-semibold text-blue-400 mb-3">Lista de Interesados:</h5>
                            <ul className="space-y-2">
                                {interesados.map((usuario, index) => (
                                    <li key={index} className="text-black">{usuario.email}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
