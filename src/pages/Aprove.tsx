import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Aprove() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("perfil");
    localStorage.removeItem("nome");
    navigate("/");
  }

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8080/eventos/status/EM_ANALISE",
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
              "Content-Type": "application/json",
            },
          }
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

  async function handleDelete(id: string) {
    if (!window.confirm("Tem certeza que deseja excluir este evento?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/eventos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Erro ao excluir evento");
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err: any) {
      alert(err.message || "Erro ao excluir evento");
    }
  }

  async function handleApprove(id: string) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/eventos/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "APROVADO" }),
      });
      if (!response.ok) throw new Error("Erro ao aprovar evento");
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err: any) {
      alert(err.message || "Erro ao aprovar evento");
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-10">
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">
          Eventos para Aprovação
        </h1>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="text-red-600 border-red-200 hover:bg-red-50"
        >
          Sair
        </Button>
      </div>
      {loading && <p className="text-gray-500">Carregando eventos...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {events.map((event) => (
          <Card key={event.id} className="bg-white/90 shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-xl text-indigo-700">
                {event.titulo}
              </CardTitle>
              <CardDescription className="text-gray-500 mb-2">
                {event.categoria.replace(/_/g, " ")} | Status:{" "}
                <span className="font-semibold">
                  {event.status.replace(/_/g, " ")}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
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
                      <span>Início: {cal.horaInicio}h</span>
                      <span>Fim: {cal.horaFim}h</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-2 text-xs text-gray-400">
                Criado por: {event.usuario?.nome} ({event.usuario?.perfil})
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="destructive"
                  className="w-1/2"
                  onClick={() => handleDelete(event.id)}
                >
                  Excluir
                </Button>
                <Button
                  variant="default"
                  className="w-1/2 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleApprove(event.id)}
                >
                  Aprovar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {!loading && events.length === 0 && !error && (
        <div className="text-gray-500 mt-10">
          Nenhum evento aguardando aprovação.
        </div>
      )}
    </div>
  );
}
