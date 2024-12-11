import { useState, useEffect } from "react";

export default function Create_user() {
    const [mensaje, setMensaje] = useState("");
    const [reg, setReg] = useState({
        nombre: "",
        email: "",
        password: "",
        edad: 0,
        ciudad: "",
        intereses: [],
        ofertas: false,
    });

    const handleReg = (event, field) => {
        const { type, value, checked } = event.target;
        setReg(prev => ({
            ...prev,
            [field]: type === "checkbox" ? checked : value,
        }));
    };

    const handleIntereses = (event, field) => {
        const value = event.target.value.trim();
        if (value === "") return;

        if (event.key === "Enter") {
            setReg(prev => ({
                ...prev,
                [field]: [...prev[field], value],
            }));

            event.target.value = "";
        }
    };

    const handleRemoveIntereses = (field, index) => {
        setReg(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    const handleRegister = () => {
        if (!reg.nombre || !reg.email || !reg.password) {
            setMensaje("Por favor completa los campos obligatorios.");
            return;
        }

        fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reg)
        })
            .then(response => response.json())
            .then(responseData => {
                if (responseData.token) {
                    localStorage.setItem('response.token', responseData.token);
                    localStorage.setItem('response.id', responseData.user._id); // Guardamos el ID para usarlo en la modificación
                    setMensaje(`¡Creación de usuario exitosa! Bienvenido.`);
                }
            })
            .catch(error => {
                setMensaje("Error, datos incorrectos.");
                console.log(error);
            });
    };

    const handlePatch = () => {
        const userToken = localStorage.getItem("response.token");
        const userId = localStorage.getItem("response.id");

        const filteredPatch = Object.entries(reg).reduce((acc, [key, value]) => {
            if (value !== "" && value !== null && value !== undefined) {
                acc[key] = value;
            }
            return acc;
        }, {});

        fetch(`http://localhost:3000/api/auth/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`,
            },
            body: JSON.stringify(filteredPatch),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error en la modificación del usuario");
                }
                return response.json();
            })
            .then(responseData => {
                setMensaje("¡Modificación de usuario exitosa!");
            })
            .catch(error => {
                setMensaje("Error, datos incorrectos.");
                console.log(error);
            });
    };

    useEffect(() => {
        const userToken = localStorage.getItem("response.token");
        const userId = localStorage.getItem("response.id");

        if (userToken && userId) {
            fetch(`http://localhost:3000/api/auth/${userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                },
            })
                .then(response => response.json())
                .then(userData => {
                    if (userData) {
                        setReg({
                            nombre: userData.nombre,
                            email: userData.email,
                            edad: userData.edad,
                            ciudad: userData.ciudad,
                            intereses: userData.intereses || [],
                            ofertas: userData.ofertas || false,
                        });
                    }
                })
                .catch(error => {
                    console.log("Error al obtener los datos del usuario", error);
                });
        }
    }, []);

    return (
        <>
            <div className="p-6 bg-gray-100 text-black rounded-lg shadow-lg space-y-6">
                <h3 className="text-2xl font-bold text-center text-blue-400">Usuario</h3>

                <div className="space-y-4">
                    <div>
                        <label className="font-medium">Nombre: </label>
                        <input
                            type="text"
                            value={reg.nombre}
                            onChange={(event) => handleReg(event, "nombre")}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Correo: </label>
                        <input
                            type="email"
                            value={reg.email}
                            onChange={(event) => handleReg(event, "email")}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Contraseña: </label>
                        <input
                            type="password"
                            value={reg.password}
                            onChange={(event) => handleReg(event, "password")}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Edad: </label>
                        <input
                            type="number"
                            value={reg.edad}
                            onChange={(event) => handleReg(event, "edad")}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Ciudad: </label>
                        <input
                            type="text"
                            value={reg.ciudad}
                            onChange={(event) => handleReg(event, "ciudad")}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Intereses: </label>
                        <input
                            type="text"
                            placeholder="Añadir interés (presiona Enter)"
                            onKeyDown={event => handleIntereses(event, "intereses")}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
                        />
                        <ul className="space-y-2">
                            {reg.intereses.map((interes, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <span className="text-black">{interes}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveIntereses("intereses", index)}
                                        className="ml-4 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition mt-2"
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex items-center">
                        <label className="font-medium mr-2">¿Te gustaría recibir ofertas?: </label>
                        <input
                            type="checkbox"
                            checked={reg.ofertas}
                            onChange={(event) => handleReg(event, "ofertas")}
                            className="focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleRegister}
                        className="w-full px-3 py-1 text-sm bg-blue-400 text-white font-semibold rounded-md shadow hover:bg-blue-500 transition"
                    >
                        Crear usuario
                    </button>

                    <button
                        onClick={handlePatch}
                        className="w-full px-3 py-1 text-sm bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600 transition"
                    >
                        Modificar usuario
                    </button>
                    
                    {mensaje && <p className="text-center text-blue-400">{mensaje}</p>}
                </div>
            </div>
        </>
    );
}
