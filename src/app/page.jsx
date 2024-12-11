"use client";

import Filtros_web from "@/Principal/Filtros_web";

export default function Page() {
    const redirectToUserLog = () => {
        window.location.href = "http://localhost:3001/user_log"; // Redirige a la URL de user_log
    };

    const redirectToComerceLog = () => {
        window.location.href = "http://localhost:3001/comerce_log"; // Redirige a la URL de comerce_log
    };

    return (
        <div className="bg-gray-200 min-h-screen">
            {/* Contenedor de los botones con disposición flex */}
            <div className="flex justify-between p-4">
                <button
                    onClick={redirectToUserLog}
                    className="bg-blue-400 text-white px-3 py-1 text-sm rounded-md shadow hover:bg-blue-500 transition"
                >
                    Log Usuario
                </button>

                <button
                    onClick={redirectToComerceLog}
                    className="bg-blue-400 text-white px-3 py-1 text-sm rounded-md shadow hover:bg-blue-500 transition"
                >
                   Log Comercio
                </button>
            </div>

            <Filtros_web />
        </div>
    );
}
