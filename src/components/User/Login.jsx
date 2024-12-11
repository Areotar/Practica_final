"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login({}) {

    const [mensaje, setMensaje] = useState("")
    const router = useRouter()

    const [log, setLog] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event, field) => {
        setLog({
            ...log,
            [field]: event.target.value
        });
    };

    const handleLogin = () => {
        fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(log)
        })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData)
                if (responseData.token) {
                    localStorage.setItem('response.token', responseData.token);
                    localStorage.setItem("response.id", responseData.user._id)
                    setMensaje(`¡Inicio de sesión exitoso! Bienvenido.`);
                }

                if (responseData.user.role === 'admin') {
                    router.push("http://localhost:3001/user_log/admin_menu")
                }else{router.push("http://localhost:3001")}
            })
            .catch(error => {
                setMensaje("Error: usuario o contraseña incorrectos.");
                console.log(error)
            });
    };

    const handleDelete = () => {
    const userToken = localStorage.getItem("response.token");
    const userId = localStorage.getItem("response.id");

    fetch(`http://localhost:3000/api/auth/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al eliminar el usuario");
            }
            return response.text();
        })
        .then(responseData => {
            console.log(responseData);
            setMensaje("Usuario eliminado con éxito");

            localStorage.removeItem("response.token");
            localStorage.removeItem("response.id");
        })
        .catch(error => {
            setMensaje("Error al eliminar al usuario");
            console.error(error);
        });
};


    return (
        <>
            <div className="p-6 bg-gray-100 text-black rounded-lg shadow-lg space-y-6">
                <h3 className="text-2xl font-bold text-center text-blue-400">Inicio de Sesión</h3>

                <div className="space-y-4">
                    <div>
                        <label className="font-medium">Correo: </label>
                        <input
                            type="text"
                            value={log.email}
                            onChange={(event) => handleChange(event, "email")}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
                        />
                    </div>
                    <div>
                        <label className="font-medium">Contraseña: </label>
                        <input
                            type="password"
                            value={log.password}
                            onChange={(event) => handleChange(event, "password")}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
                        />
                    </div>
                </div>

                <div className="flex justify-between space-x-4">
                    <button
                        onClick={handleLogin}
                        className="w-full px-3 py-1 text-sm bg-blue-400 text-white font-semibold rounded-md shadow hover:bg-blue-500 transition"
                    >
                        Iniciar Sesión
                    </button>

                    <button
                        onClick={handleDelete}
                        className="w-full px-3 py-1 text-sm bg-red-600 text-white  font-semibold rounded-md shadow hover:bg-red-700 transition"
                    >
                        Eliminar Sesión
                    </button>

                </div>
                <p className="text-center text-blue-400">{mensaje}</p>
            </div>
        </>
    )
}
