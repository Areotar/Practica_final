import { useEffect, useState } from "react";

export default function Detalles_web({ url }) {
  const [web, setWeb] = useState(null);
  const [comentario, setComentario] = useState("");
  const [puntuacion, setPuntuacion] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [showAllComentarios, setShowAllComentarios] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setWeb(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    if (url) fetchData();
  }, [url]);

  useEffect(() => {
    const userToken = localStorage.getItem("response.token");
    setIsLoggedIn(!!userToken);
  }, []);

  const handleComentarioChange = (event) => {
    setComentario(event.target.value);
  };

  const handlePuntuacionChange = (event) => {
    setPuntuacion(Number(event.target.value));
  };

  const handleEnviarComentario = async () => {
    const userToken = localStorage.getItem("response.token");
    if (!userToken) {
      setMensaje("Por favor, inicia sesión para dejar una reseña.");
      return;
    }

    if (!comentario) {
      setMensaje("Por favor ingresa un comentario.");
      return;
    }

    if (puntuacion < 1 || puntuacion > 5) {
      setMensaje("La puntuación debe ser entre 1 y 5.");
      return;
    }

    const comentarioData = {
      comentario: comentario,
      puntuacion: puntuacion,
    };

    const comentarioId = web._id;

    try {
      const response = await fetch(`http://localhost:3000/api/web/comentarios/${comentarioId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(comentarioData),
      });
      const responseData = await response.json();
      setMensaje("¡Gracias por tu reseña!");
      setComentario("");
      setPuntuacion(1);
    } catch (error) {
      setMensaje("Hubo un error al enviar tu reseña.");
      console.error(error);
    }
  };

  const toggleComentarios = () => {
    setShowAllComentarios(!showAllComentarios);
  };

  const handleImageClick = (imageUrl) => {
    setPopupImage(imageUrl);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupImage("");
  };

  if (!web) {
    return null;
  }

  const comentariosVisibles = showAllComentarios
    ? web.reseñas.cuerpo
    : web.reseñas.cuerpo.slice(0, 3);

  return (
    <div className="p-6 bg-gray-100 text-black rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl text-blue-400 font-bold text-center">Web seleccionada:</h2>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-blue-400">{web.titulo}</h3>
        <p><span className="font-medium">Ciudad:</span> {web.ciudad}</p>
        <p><span className="font-medium">Actividad:</span> {web.actividad}</p>
        <p><span className="font-medium">Resumen:</span> {web.resumen}</p>
      </div>
      <div>
        <h4 className="text-lg font-semibold">Imágenes:</h4>
        <div className="flex gap-4 flex-wrap">
          {web.imagenes.map((imagen, index) => (
            <img
              key={index}
              src={imagen}
              alt={`Imagen ${index + 1} del comercio`}
              style={{ width: "200px", height: "200px" }}
              className="object-cover rounded-md shadow-md cursor-pointer"
              onClick={() => handleImageClick(imagen)}
            />
          ))}
        </div>
      </div>

{/* Pop-up de imagen */}
{showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
    <div className="relative bg-gray-50 bg-opacity-50 rounded-lg shadow-lg">  	
      <img
        src={popupImage}
        alt="Vista ampliada"
        className="rounded-lg max-w-full max-h-screen object-contain"
      />
      <button
        onClick={closePopup}
        className="absolute top-2 right-2 bg-blue-400 text-white font-semibold rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-500 transition"
      >
        ✕  
      </button>
    </div>
  </div>
)}


      {/* Continuación del contenido */}
      <div>
        <h4 className="text-lg font-semibold">Reseñas:</h4>
        <p><span className="font-medium">Scoring:</span> {web.reseñas.scoring}</p>
        <p><span className="font-medium">Total de reseñas:</span> {web.reseñas.total}</p>
        <div className="space-y-4">
          <h5 className="text-md font-semibold">Comentarios:</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comentariosVisibles.map((comentario, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-md shadow-md border border-gray-200"
              >
                {comentario}
              </div>
            ))}
          </div>
          {web.reseñas.cuerpo.length > 3 && (
            <button
              onClick={toggleComentarios}
              className="px-4 py-2 bg-blue-400 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              {showAllComentarios ? "Ocultar comentarios" : "Leer todos los comentarios"}
            </button>
          )}

          {/* Sección para dejar reseña */}
      <div className="bg-gray-200 p-4 rounded-md space-y-4">
        <h2 className="text-blue-400 text-xl font-semibold">Deja tu reseña</h2>
        {!isLoggedIn && (
          <p className="text-red-500">Para dejar una reseña debes estar registrado e iniciar sesión.</p>
        )}
        <div className="space-y-2">
          <label className="block font-medium">Comentario:</label>
          <input
            type="text"
            value={comentario}
            onChange={handleComentarioChange}
            placeholder="Deja aquí tu comentario"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
            disabled={!isLoggedIn} // Deshabilitar si no está logueado
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Puntuación:</label>
          <select
            value={puntuacion}
            onChange={handlePuntuacionChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
            disabled={!isLoggedIn} // Deshabilitar si no está logueado
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <button
          onClick={handleEnviarComentario}
          className="px-4 py-2 bg-blue-400 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          disabled={!isLoggedIn} // Deshabilitar si no está logueado
        >
          Enviar reseña
        </button>   
        {mensaje && <p className="text-blue-400">{mensaje}</p>}
      </div>
        </div>
      </div>
    </div>
  );
}
