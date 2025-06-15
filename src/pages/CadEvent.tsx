import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function formatDateToDDMMYYYY(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function CadEvent() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [categoria, setCategoria] = useState("MUSICA");
  const [dataInicio, setDataInicio] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    // Validação dos campos obrigatórios
    if (
      !titulo ||
      !descricao ||
      !local ||
      !categoria ||
      !dataInicio ||
      !horaInicio ||
      !horaFim ||
      !imagemUrl
    ) {
      setError("Preencha todos os campos obrigatórios.");
      setLoading(false);
      return;
    }
    // Monta o calendário no formato correto
    const calendario = {
      data: formatDateToDDMMYYYY(dataInicio),
      "hora-inicio": Number(horaInicio),
      "hora-fim": Number(horaFim),
    };
    const data = {
      titulo,
      descricao,
      local,
      categoria,
      "imagem-url": imagemUrl,
      calendarios: [calendario],
    };
    console.log("Conteúdo da variável data:", data);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/eventos", {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let errorMsg = "Erro ao criar evento";
      if (!response.ok) {
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || JSON.stringify(errorData);
        } catch {}
        throw new Error(errorMsg);
      }
      setSuccess("Evento criado com sucesso!");
      window.location.href = "/my-events";
    } catch (err: any) {
      setError(err.message || "Erro ao criar evento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 overflow-x-hidden">
      <button
        onClick={handleLogout}
        className="absolute top-6 right-8 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md z-10"
      >
        Sair
      </button>
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-8 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg shadow-md z-10"
      >
        Voltar
      </button>
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl border-0 bg-white/90 flex-1 flex flex-col justify-center min-h-[80vh] max-h-[90vh] overflow-y-auto">
        <CardHeader className="mb-2 text-center">
          <CardTitle className="text-2xl font-bold text-indigo-700 gap-4 flex flex-col items-center">
            <h1>Cadastro de Evento</h1>
          </CardTitle>
          <CardDescription className="text-gray-500">
            Preencha os dados do evento cultural.
          </CardDescription>
        </CardHeader>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center h-full"
        >
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pb-2">
            <div className="flex flex-col gap-2">
              <Label className="mb-1 text-sm text-gray-700" htmlFor="titulo">
                Título do Evento
              </Label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
                placeholder="Show de Rock"
                className="rounded-lg border-gray-300 focus:border-indigo-400 focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="mb-1 text-sm text-gray-700" htmlFor="descricao">
                Descrição
              </Label>
              <Input
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
                placeholder="Evento musical com bandas locais"
                className="rounded-lg border-gray-300 focus:border-indigo-400 focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="mb-1 text-sm text-gray-700" htmlFor="local">
                Local
              </Label>
              <Input
                id="local"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                required
                placeholder="Praça Central"
                className="rounded-lg border-gray-300 focus:border-indigo-400 focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="mb-1 text-sm text-gray-700" htmlFor="categoria">
                Categoria
              </Label>
              <select
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="rounded-lg border-gray-300 border-1 focus:border-indigo-400 focus:ring-indigo-200 p-2"
              >
                <option value="TEATRO">Teatro</option>
                <option value="CURSO">Curso</option>
                <option value="TURISMO">Turismo</option>
                <option value="HISTORIA_E_CULTURA">História e Cultura</option>
                <option value="CINEMA">Cinema</option>
                <option value="ESPORTES">Esportes</option>
                <option value="GASTRONOMIA">Gastronomia</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <Label
                className="mb-1 text-sm text-gray-700"
                htmlFor="horaInicio"
              >
                Hora de Início
              </Label>
              <Input
                id="horaInicio"
                type="number"
                min="0"
                max="23"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                required
                placeholder="Ex: 13"
                className="rounded-lg border-gray-300 focus:border-indigo-400 focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="mb-1 text-sm text-gray-700" htmlFor="horaFim">
                Hora de Fim
              </Label>
              <Input
                id="horaFim"
                type="number"
                min="0"
                max="23"
                value={horaFim}
                onChange={(e) => setHoraFim(e.target.value)}
                required
                placeholder="Ex: 16"
                className="rounded-lg border-gray-300 focus:border-indigo-400 focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                className="mb-1 text-sm text-gray-700"
                htmlFor="dataInicio"
              >
                Data do Evento
              </Label>
              <Input
                id="dataInicio"
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                required
                className="rounded-lg border-gray-300 focus:border-indigo-400 focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <Label className="mb-1 text-sm text-gray-700" htmlFor="imagemUrl">
                URL da Imagem
              </Label>
              <Input
                id="imagemUrl"
                value={imagemUrl}
                onChange={(e) => setImagemUrl(e.target.value)}
                required
                placeholder="https://exemplo.com/imagem.jpg"
                className="rounded-lg border-gray-300 focus:border-indigo-400 focus:ring-indigo-200"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 px-6 pb-6">
            <Button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors duration-200 shadow-md mt-8"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Criar Evento"}
            </Button>
            {success && (
              <span className="text-green-600 text-sm mt-2">{success}</span>
            )}
            {error && (
              <span className="text-red-600 text-sm mt-2">{error}</span>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
