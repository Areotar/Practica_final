"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Log_comerce() {
  const [mensaje, setMensaje] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  const handleSaveToken = () => {
    if (token) {
      localStorage.setItem("comerceToken", token);
      console.log("Token del comercio almacenado:", token);

      // Redirige inmediatamente después de guardar
      router.push("/comerce_log/comerce_menu");
    } else {
      setMensaje("Por favor, ingresa un token válido.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-gray-100 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-400 mb-4 text-center">
          Log Comercio
        </h1>
        <p className="text-gray-700 mb-6 text-center">
          Ingresa el token asociado a tu comercio para continuar.
        </p>
        <div className="space-y-4">
          <label htmlFor="token" className="block text-black font-medium">
            Token:
          </label>
          <input
            id="token"
            type="text"
            value={token}
            onChange={handleTokenChange}
            placeholder="Introduce el token"
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            onClick={handleSaveToken}
            className="w-full px-4 py-2 bg-blue-400 text-white font-semibold rounded-md hover:bg-blue-500 transition"
          >
            Guardar Token
          </button>
        </div>
        {mensaje && (
          <p
            className={`mt-4 text-center ${
              mensaje.includes("exitosamente")
                ? "text-blue-400"
                : "text-red-500"
            }`}
          >
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
}
