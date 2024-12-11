import { useState } from "react";
import React from "react";

export default function Modify_web() {

    const [mensajeUpdate, setMensajeUpdate] = useState("");
    const [mensajeImagen, setMensajeImagen] = useState("");

    const [updateCif, setUpdateCif] = useState("");
    const [imageCif, setimageCif] = useState("");

    const [imagen, setImagen] = useState(null);
    var token = localStorage.getItem("comerceToken")

    const [update, setUpdate] = useState({
        ciudad: "",
        actividad: "",
        titulo: "",
        resumen: "",
        textos: [],
        imagenes: [],
    });
    
    const handleChangeUpdate = (event, field) => {
        setUpdate({
            ...update,
            [field]: event.target.value,
        });
    };

    const handleArrayChange = (event, field, isCreate) => {
        const value = event.target.value.trim();
        if (value === "") return;
        if (event.key === "Enter") {
            const currentState = isCreate ? create : update;
            const updatedArray = [...currentState[field], value];
            if (isCreate) {
                setCreate({ ...currentState, [field]: updatedArray });
            } else {
                setUpdate({ ...currentState, [field]: updatedArray });
            }
            event.target.value = "";
        }
    };

    const handleUpdateWeb = () => {
        if (!token) {
            setMensajeUpdate("Por favor, ingresa y guarda un token para continuar.");
            return;
        }
        if (!updateCif) {
            setMensajeUpdate("Por favor, ingrese el ID de la web a actualizar.");
            return;
        }

        fetch(`http://localhost:3000/api/web/${updateCif}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("comerceToken")}`,
            },
            body: JSON.stringify(update),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al actualizar la página web.");
                }
                return response.json();
            })
            .then((data) => {
                setMensajeUpdate("Página web actualizada exitosamente.");
            })
            .catch((error) => {
                setMensajeUpdate("Error al actualizar la página web.");
            });
    };

    const handleImage = () => {
        if (!imagen || !imageCif) {
            setMensajeImagen("Selecciona una imagen y proporciona el CIF.");
            return;
        }

        const formData = new FormData();
        formData.append("image", imagen);

        fetch(`http://localhost:3000/api/web/${imageCif}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("comerceToken")}`,
            },
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    setMensajeImagen("Error al subir la imagen.");
                }
                return response.json();
            })
            .then((data) => {
                setMensajeImagen("Imagen añadida con éxito.");
            })
            .catch((error) => {
                setMensajeImagen("Error al subir la imagen.");
            });
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-gray-100 shadow-md rounded-lg">
            {/* Sección de Actualizar Página Web */}
            <div className="mb-8">
                <h4 className="text-2xl font-bold text-blue-400 mb-4">Actualizar Página Web</h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-black">CIF:</label>
                        <input
                            type="text"
                            value={updateCif}
                            onChange={(e) => setUpdateCif(e.target.value)}
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">Ciudad:</label>
                        <input
                            type="text"
                            value={update.ciudad}
                            onChange={(e) => handleChangeUpdate(e, "ciudad")}
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">Actividad:</label>
                        <input
                            type="text"
                            value={update.actividad}
                            onChange={(e) => handleChangeUpdate(e, "actividad")}
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">Título:</label>
                        <input
                            type="text"
                            value={update.titulo}
                            onChange={(e) => handleChangeUpdate(e, "titulo")}
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">Resumen:</label>
                        <textarea
                            value={update.resumen}
                            onChange={(e) => handleChangeUpdate(e, "resumen")}
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">Textos:</label>
                        <input
                            type="text"
                            placeholder="Pulsa Enter para añadir texto"
                            onKeyDown={(e) => handleArrayChange(e, "textos", false)}
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        <ul className="mt-2 list-disc pl-6">
                            {update.textos.map((texto, index) => (
                                <li key={index} className="text-black">{texto}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">Imágenes:</label>
                        <input
                            type="text"
                            placeholder="Pulsa Enter para añadir una URL de imagen"
                            onKeyDown={(e) => handleArrayChange(e, "imagenes", false)}
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        <ul className="mt-2 list-disc pl-6">
                            {update.imagenes.map((imagen, index) => (
                                <li key={index} className="text-black">{imagen}</li>
                            ))}
                        </ul>
                    </div>
                    <button
                        onClick={handleUpdateWeb}
                        className="w-full py-2 bg-blue-400 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-300"
                    >
                        Actualizar Web
                    </button>
                    <p className="mt-4 text-center text-lg font-semibold text-blue-400">{mensajeUpdate}</p>
                </div>
            </div>

            {/* Sección de Añadir Imagen a la Web */}
            <div className="mb-8">
                <h4 className="text-2xl font-bold text-blue-400 mb-4">Añadir Imagen a la Web</h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-black">CIF de la Web:</label>
                        <input
                            type="text"
                            value={imageCif}
                            onChange={(e) => setimageCif(e.target.value)}
                            placeholder="Introduce el CIF de la web"
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">Selecciona una Imagen:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImagen(e.target.files[0])}
                            className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <button
                        onClick={handleImage}
                        className="w-full py-2 bg-blue-400 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-300"
                    >
                        Añadir Imagen
                    </button>
                    <p className="mt-4 text-center text-lg font-semibold text-blue-400">{mensajeImagen}</p>
                </div>
            </div>

        </div>
    );
}
