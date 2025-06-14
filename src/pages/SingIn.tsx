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

export function SignIn() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function fetchData(_event: React.MouseEvent<HTMLButtonElement>) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      if (!response.ok) throw new Error("Usuário ou senha inválidos");
      const result = await response.json();
      console.log("API response:", result);
      if (result.token) {
        localStorage.setItem("token", result.token);
        if (result.perfil) {
          localStorage.setItem("perfil", result.perfil);
        }
        if (result.nome) {
          localStorage.setItem("nome", result.nome);
        }
        const perfil = result.perfil;
        if (perfil === "ADMIN") {
          navigate("/aprove");
        } else {
          navigate("/my-events");
        }
      } else {
        throw new Error("Token não recebido");
      }
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border-0 bg-white/90">
        <CardHeader className="mb-2 text-center">
          <CardTitle className="text-2xl font-bold text-indigo-700 gap-4 flex flex-col items-center">
            <h1>Prefeitura</h1>
            <p>Faça Seu Login</p>
          </CardTitle>
          <CardDescription className="text-gray-500">
            Utilize seu e-mail e senha para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 px-6 pb-2">
          <Label className="mb-1 text-sm text-gray-700" htmlFor="email">
            Email
          </Label>
          <Input
            placeholder="exemplo@email.com"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border-gray-300 focus:border-indigo-400 focus:ring-indigo-200"
          />
          <Label className="mb-1 mt-2 text-sm text-gray-700" htmlFor="password">
            Senha
          </Label>
          <Input
            placeholder="Sua senha"
            id="password"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="rounded-lg border-gray-300 focus:border-indigo-400 focus:ring-indigo-200"
          />
          <a
            href="#"
            className="text-xs text-indigo-500 hover:underline mt-1 self-end"
          >
            Esqueceu sua senha?
          </a>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 px-6 pb-6">
          <Button
            className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors duration-200 shadow-md"
            variant="default"
            onClick={fetchData}
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
          {error && <span className="text-red-600 text-sm mt-2">{error}</span>}
          <Button
            className="w-full rounded-lg border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold transition-colors duration-200"
            variant="outline"
          >
            Solicite Acesso
          </Button>
          <Button
            className="w-full rounded-lg border-gray-400 text-gray-600 hover:bg-gray-100 font-semibold transition-colors duration-200 mt-2"
            variant="outline"
            type="button"
            onClick={() => navigate("/")}
          >
            Voltar para página inicial
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
