import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "./components/ui/button";

export function App() {
  function fetchData() {
    alert("Dados enviados com sucesso!");
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <Card className="w-96 flex justify-center text-center">
        <CardHeader className="mb-4">
          <CardTitle>Faça Seu Login</CardTitle>
          <CardDescription>
            Utilize seu e-mail e senha para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-left flex flex-col gap-4">
          <Label className="block mb-2" htmlFor="email">
            Email
          </Label>
          <Input placeholder="exemplo@email.com" id="email" />
          <Label className="block mb-2" htmlFor="password">
            Senha
          </Label>
          <Input placeholder="Sua senha" id="password" type="password" />
        </CardContent>
        <div className="flex flex-col items-center">
          <Button
            className="w-[50%] mt-4 self-ce"
            variant="default"
            onClick={fetchData}
          >
            Entrar
          </Button>
          <Button className="w-[50%] mt-4 self-ce" variant="outline">
            Solicite Acesso
          </Button>
        </div>
      </Card>
    </div>
  );
}
