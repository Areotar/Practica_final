"use client"

import { useState } from "react";

import Create_user from "@/User/Create_user";
import Login from "@/User/Login";

export default function Page() {
    const [message, setMessage] = useState("");

    return (
        <div className="min-h-screen bg-white p-6">
            
            {/* Contenedor Flex para que los dos componentes estén lado a lado */}
            <div className="flex justify-center space-x-12">
                {/* Componente de Creación de Usuario */}
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <Create_user />
                </div>
                
                {/* Componente de Login */}
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <Login setMessage={setMessage} />
                </div>
            </div>

            {/* Mensaje global de error o éxito */}
            {message && <p className="text-center text-blue-500 mt-6">{message}</p>}
        </div>
    );
}
