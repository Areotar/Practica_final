import { useState } from "react";
import React from "react";

export default function Delete_web() {
  const [mensaje, setMensaje] = useState("");
  const [deleteCif, setDeleteCif] = useState("");
  const [tipoDelete, setTipoDelete] = useState(true);

  const handleDelete = async () => {
    if (!deleteCif) {
      setMensaje("Por favor, ingrese un CIF válido.");
      return;
    }

    try {
      // Construye la URL de la API con el parámetro de eliminación lógica
      const url = `http://localhost:3000/api/web/${deleteCif}?logic=${tipoDelete}`;

      const token = localStorage.getItem("comerceToken");

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Autenticación con token
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la página web.");
      }

      // Maneja la respuesta según el tipo de borrado
      const data = await response.text();
      if (tipoDelete) {
        setMensaje("Página web eliminada lógicamente.");
        console.log(data);
      } else {
        setMensaje("Página web eliminada físicamente.");
        console.log(data);
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Hubo un problema al intentar eliminar la web.");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto my-8">
      <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold text-blue-400 mb-4 text-center">
          Eliminar Página Web
        </h3>

        <div className="space-y-4">
          {/* Input para el CIF */}
          <div>
            <label className="block text-sm font-medium text-black">
              CIF de la web:
            </label>
            <input
              type="text"
              value={deleteCif}
              onChange={(e) => setDeleteCif(e.target.value)}
              className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Introduce el CIF de la web"
            />
          </div>

          {/* Checkbox para borrado lógico */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={tipoDelete}
              onChange={(event) => setTipoDelete(event.target.checked)}
              className="h-4 w-4 text-blue-400"
            />
            <label className="ml-2 text-sm font-medium text-black">
              Borrado lógico:
            </label>
          </div>

          {/* Botón para eliminar la página web */}
          <button
            onClick={handleDelete}
            className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
          >
            Eliminar Web
          </button>

          {/* Mensaje de confirmación o error */}
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
    </div>
  );
}
