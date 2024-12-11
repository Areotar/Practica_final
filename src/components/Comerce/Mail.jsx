import { useState } from "react";

export default function Mail () {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/comerce/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("comerceToken")}`,
        },
        body: JSON.stringify({
          subject,
          text,
          to,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el correo.");
      }

      setMessage("Correo enviado con éxito.");
    } catch (err) {
      console.error(err);
      setError("Hubo un problema al enviar el correo.");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto my-8">
      <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold text-blue-400 mb-4 text-center">Enviar Correo</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Asunto del correo */}
          <div>
            <label className="block text-sm font-medium text-black">Asunto:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-black mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="Introduce el asunto del correo"
              required
            />
          </div>

          {/* Texto del correo */}
          <div>
            <label className="block text-sm font-medium text-black">Texto:</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full text-black mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="Introduce el contenido del correo"
              rows="5"
              required
            />
          </div>

          {/* Destinatario del correo */}
          <div>
            <label className="block text-sm font-medium text-black">Destinatario:</label>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full text-black mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="Introduce la dirección de correo"
              required
            />
          </div>

          {/* Botón para enviar correo */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition duration-300"
          >
            Enviar Correo
          </button>

          {/* Mensaje de confirmación o error */}
          {message && (
            <p className="mt-4 text-center text-blue-400">{message}</p>
          )}
          {error && (
            <p className="mt-4 text-center text-red-500">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};
