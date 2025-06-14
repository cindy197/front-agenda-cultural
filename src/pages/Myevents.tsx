import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export function MyEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/eventos/meus", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        });
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

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  function askDelete(id: string) {
    setEventToDelete(id);
    setConfirmOpen(true);
  }

  async function handleDeleteConfirmed() {
    if (!eventToDelete) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/eventos/${eventToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Erro ao excluir evento");
      setEvents((prev) => prev.filter((e) => e.id !== eventToDelete));
    } catch (err: any) {
      alert(err.message || "Erro ao excluir evento");
    } finally {
      setConfirmOpen(false);
      setEventToDelete(null);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-10">
      <button
        onClick={handleLogout}
        className="absolute top-6 right-8 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md z-10"
      >
        Sair
      </button>
      <div className="flex justify-between items-center w-full max-w-6xl mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">Meus Eventos</h1>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-6 py-2 shadow-md"
          onClick={() => navigate("/cad-event")}
        >
          Cadastrar Evento
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
              <Button
                variant="destructive"
                className="mt-4 w-full"
                onClick={() => askDelete(event.id)}
              >
                Excluir Evento
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {!loading && events.length === 0 && !error && (
        <div className="text-gray-500 mt-10">
          Nenhum evento cadastrado ainda.
        </div>
      )}
      <ConfirmDialog
        open={confirmOpen}
        title="Excluir evento?"
        description="Esta ação não poderá ser desfeita. Deseja realmente excluir este evento?"
        onConfirm={handleDeleteConfirmed}
        onCancel={() => {
          setConfirmOpen(false);
          setEventToDelete(null);
        }}
      />
    </div>
  );
}
