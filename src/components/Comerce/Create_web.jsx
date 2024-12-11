import { useState } from "react";
import React from "react";

export default function Create_web() {
    const [mensaje, setMensaje] = useState("");

    const [create, setCreate] = useState({
        cif: "",
        ciudad: "",
        actividad: "",
        titulo: "",
        resumen: "",
        textos: [],
        imagenes: [],
    });

    const handleChangeCreate = (event, field) => {
        setCreate({
            ...create,
            [field]: event.target.value,
        });
    };

    const validateCreateData = () => {
        if (!create.cif || !create.ciudad || !create.actividad || !create.titulo || !create.resumen) {
            setMensaje("Por favor, completa todos los campos requeridos.");
            return false;
        }
        return true;
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

    const handleRemoveFromArray = (index, field, isCreate) => {
        const currentState = isCreate ? create : update;
        const updatedArray = currentState[field].filter((_, i) => i !== index);

        if (isCreate) {
            setCreate({ ...currentState, [field]: updatedArray });
        } else {
            setUpdate({ ...currentState, [field]: updatedArray });
        }
    };

    const handleCreateWeb = () => {
        if (!validateCreateData()) {
            setMensaje("Completa todos los campos");
            return;
        }

        fetch("http://localhost:3000/api/web", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("comerceToken")}`,
            },
            body: JSON.stringify(create),
        })
            .then((response) => response.text().then((text) => ({ status: response.status, text })))
            .then(({ status, text }) => {
                if (status === 200) {
                    console.log("Web creada:", text);
                    setMensaje("Página web creada exitosamente.");
                } else if (text === "No puedes crear una web con el cif de otro usuario") {
                    setMensaje("No puedes crear una web con el cif de otro usuario");
                } else {
                    setMensaje("Error al crear la página web");
                }
            })
            .catch((error) => {
                console.error("Error al crear la página web:", error);
                setMensaje("Error al crear la página web.");
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white text-black rounded-lg space-y-6">
            <div className="bg-gray-100 p-6 rounded-md shadow-lg space-y-6">
                <h4 className="text-2xl font-semibold text-blue-400">Crear Página Web</h4>
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium">CIF:</label>
                        <input
                            type="text"
                            value={create.cif}
                            onChange={(e) => handleChangeCreate(e, "cif")}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Ciudad:</label>
                        <input
                            type="text"
                            value={create.ciudad}
                            onChange={(e) => handleChangeCreate(e, "ciudad")}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Actividad:</label>
                        <input
                            type="text"
                            value={create.actividad}
                            onChange={(e) => handleChangeCreate(e, "actividad")}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Título:</label>
                        <input
                            type="text"
                            value={create.titulo}
                            onChange={(e) => handleChangeCreate(e, "titulo")}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Resumen:</label>
                        <textarea
                            value={create.resumen}
                            onChange={(e) => handleChangeCreate(e, "resumen")}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="block font-medium">Textos:</label>
                    <input
                        type="text"
                        placeholder="Pulsa Enter para añadir texto"
                        onKeyDown={(e) => handleArrayChange(e, "textos", true)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <ul className="space-y-2">
                        {create.textos.map((texto, index) => (
                            <li key={index} className="flex justify-between items-center text-black">
                                {texto}
                                <button
                                    onClick={() => handleRemoveFromArray(index, "textos", true)}
                                    // className="ml-4 px-2 py-1 text-red-500w rounded-md"
                                    className="ml-4 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-4">
                    <label className="block font-medium">Imágenes:</label>
                    <input
                        type="text"
                        placeholder="Pulsa Enter para añadir una URL de imagen"
                        onKeyDown={(e) => handleArrayChange(e, "imagenes", true)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <ul className="space-y-2">
                        {create.imagenes.map((imagen, index) => (
                            <li key={index} className="flex justify-between items-center text-black">
                                {imagen}
                                <button
                                    onClick={() => handleRemoveFromArray(index, "imagenes", true)}
                                    className="ml-4 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    onClick={handleCreateWeb}
                    className="w-full py-3 bg-blue-400 text-white rounded-md hover:bg-blue-500 focus:outline-none transition"
                >
                    Crear Web
                </button>
                {mensaje && (
                    <p className={`mt-2 ${mensaje.includes("exitosamente") ? 'text-green-500' : 'text-red-500'} text-center`}>
                        {mensaje}
                    </p>
                )}
            </div>
        </div>
    );
}
