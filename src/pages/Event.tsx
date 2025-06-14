import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const categorias = [
  { value: "TEATRO", label: "Teatro" },
  { value: "CURSO", label: "Curso" },
  { value: "TURISMO", label: "Turismo" },
  { value: "HISTORIA_E_CULTURA", label: "História e Cultura" },
  { value: "CINEMA", label: "Cinema" },
  { value: "ESPORTES", label: "Esportes" },
  { value: "GASTRONOMIA", label: "Gastronomia" },
];

export function Event() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("");
  const [dataFiltro, setDataFiltro] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          "http://localhost:8080/eventos/publicos/aprovados"
        );
        if (!response.ok) throw new Error("Erro ao buscar eventos");
        const data = await response.json();
        setEvents(Array.isArray(data) ? data : [data]);
      } catch (err: any) {
        setError(err.message || "Erro ao buscar eventos");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchSearch = event.titulo
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchCategoria = categoria ? event.categoria === categoria : true;
    const matchData = dataFiltro
      ? event.calendarios?.some((cal: any) => cal.data === dataFiltro)
      : true;
    return matchSearch && matchCategoria && matchData;
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-10">
      <header className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center mb-8 px-4 gap-4">
        <span className="text-3xl font-bold text-indigo-700">
          FEIRA CULTURE
        </span>
        <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar por nome do evento..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-400 focus:ring-indigo-200 shadow-sm"
          />
          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-6 py-2 shadow-md w-full md:w-auto"
          >
            Entrar / Registrar
          </button>
        </div>
      </header>
      <section className="w-full max-w-6xl mb-8 px-4">
        <h1 className="text-2xl font-bold text-indigo-700 mb-4">
          Descubra os melhores eventos em Feira de Santana
        </h1>
        <p className="text-gray-600 mb-4">
          Encontre eventos culturais, cursos, gastronomia, esportes, turismo e
          muito mais. Use a busca ou filtre por categoria para encontrar o
          evento ideal para você!
        </p>
      </section>
      <section className="w-full max-w-6xl mb-8 px-4">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-semibold text-gray-700 mr-2">
            Filtrar por categoria:
          </span>
          <button
            className={`px-3 py-1 rounded-lg border text-sm ${
              categoria === ""
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-700 border-indigo-200"
            }`}
            onClick={() => setCategoria("")}
          >
            Todas
          </button>
          {categorias.map((cat) => (
            <button
              key={cat.value}
              className={`px-3 py-1 rounded-lg border text-sm ${
                categoria === cat.value
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-indigo-700 border-indigo-200"
              }`}
              onClick={() => setCategoria(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center mt-3">
          <span className="font-semibold text-gray-700">Filtrar por data:</span>
          <input
            type="date"
            value={dataFiltro}
            onChange={(e) => setDataFiltro(e.target.value)}
            className="px-3 py-1 rounded-lg border border-gray-300 focus:border-indigo-400 focus:ring-indigo-200 text-sm"
          />
        </div>
      </section>
      {loading && <p className="text-gray-500">Carregando eventos...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {filteredEvents.map((event) => (
          <Card
            key={event.id}
            className="bg-white/90 shadow-xl border-0 flex flex-col"
          >
            <CardHeader>
              <CardTitle className="text-xl text-indigo-700">
                {event.titulo}
              </CardTitle>
              <CardDescription className="text-gray-500 mb-2">
                {event.categoria?.replace(/_/g, " ")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 flex-1">
              <div className="text-gray-700 font-medium">{event.descricao}</div>
              <div className="text-sm text-gray-500">Local: {event.local}</div>
              {event.calendarios && event.calendarios.length > 0 && (
                <div className="mt-2">
                  <div className="font-semibold text-gray-700 mb-1">Datas:</div>
                  {event.calendarios.map((cal: any) => (
                    <div
                      key={cal.id}
                      className="flex gap-4 text-sm text-gray-600 mb-1"
                    >
                      <span>Data: {cal.data}</span>
                      <span>
                        Início: {cal["hora-inicio"] || cal.horaInicio}h
                      </span>
                      <span>Fim: {cal["hora-fim"] || cal.horaFim}h</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {!loading && filteredEvents.length === 0 && !error && (
        <div className="text-gray-500 mt-10">
          Nenhum evento público encontrado.
        </div>
      )}
    </div>
  );
}
