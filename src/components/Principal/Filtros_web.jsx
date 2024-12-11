import { useEffect, useState } from "react";
import Detalles_web from "./Detalles_web";

export default function Filtros_web() {
  const [web, setWeb] = useState([]);
  const [filteredWeb, setFilteredWeb] = useState([]);
  const [urlSelected, setUrlSelected] = useState("");
  const [error, setError] = useState(false);
  const [cityFilter, setCityFilter] = useState("");
  const [activityFilter, setActivityFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/web/buscador")
      .then(response => response.json())
      .then(data => {
        setWeb(data);
        setFilteredWeb(data);
      })
      .catch(error => {
        console.error("Error fetching data", error);
        setError(true);
      });
  }, []);

  useEffect(() => {
    const filtrado = web.filter(web => {
      return (
        (cityFilter === "" || web.ciudad.toLowerCase().includes(cityFilter.toLowerCase())) &&
        (activityFilter === "" || web.actividad.toLowerCase().includes(activityFilter.toLowerCase()))
      );
    });
    setFilteredWeb(filtrado);
  }, [cityFilter, activityFilter, web]);

  const sortWeb = () => {
    fetch("http://localhost:3000/api/web/buscador?ordenar=desc")
      .then(response => response.json())
      .then(data => {
        setWeb(data);
        setFilteredWeb(data);
      })
      .catch(error => {
        console.error("Error fetching sorted data", error);
        setError(true);
      });
  };

  let listPeople;
  if (error) {
    listPeople = <p className="text-center text-red-500 font-semibold">Ha ocurrido un error</p>;
  } else if (filteredWeb.length === 0) {
    listPeople = <p className="text- text-black  font-semibold">Web no encontrada</p>;
  } else {
    listPeople = filteredWeb.map(web => (
      <div
        key={web._id}
        className="p-4 border rounded-md shadow-md bg-gray-100 hover:bg-gray-200 transition"
      >
        <h3
          className="text-lg font-bold text-blue-400 cursor-pointer"
          onClick={() => setUrlSelected(`http://localhost:3000/api/web/${web._id}`)}
        >
          {web.titulo}
        </h3>
        <p className="text-black">Actividad: {web.actividad}</p>
        <p className="text-black">Ciudad: {web.ciudad}</p>
        <p className="text-black">Scoring: {web.reseñas.scoring}</p>
      </div>
    ));
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-blue-400 text-center">Lista de Webs</h1>
        <div className="flex justify-center space-x-4">
          <button
            onClick={sortWeb}
            className="bg-blue-400 text-white px-4 py-2 rounded-md shadow hover:bg-blue-500 transition"
          >
            Ordenar por Scoring
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Filtrar por ciudad"
            value={cityFilter}
            onChange={e => setCityFilter(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          <input
            type="text"
            placeholder="Filtrar por actividad"
            value={activityFilter}
            onChange={e => setActivityFilter(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{listPeople}</div>
        <div>
          <Detalles_web url={urlSelected} />
        </div>
      </div>
    </div>
  );
}
