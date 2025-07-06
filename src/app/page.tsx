'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { HelpCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const profileToEmailMap: { [key: string]: string } = {
    professor: "professor@upe.br",
    coordenador: "coordenador@upe.br",
    administrativo: "admin@upe.br",
    aluno: "aluno@upe.br",
  };

  useEffect(() => {
    const profileParam = searchParams.get('profile');
    if (profileParam && profileToEmailMap[profileParam]) {
        setEmail(profileToEmailMap[profileParam]);
    }
  }, [searchParams, profileToEmailMap]);


  const getProfileFromEmail = () => {
    if (email === "professor@upe.br") return "professor";
    if (email === "coordenador@upe.br") return "coordenador";
    if (email === "admin@upe.br") return "administrativo";
    return "aluno";
  };
  
  const handleLoginClick = () => {
    sessionStorage.setItem('userProfile', getProfileFromEmail());
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: "Sucesso!",
        description: "Solicitação de cadastro enviada para a administração.",
    });
    setIsRegistering(false);
  };

  const dashboardUrl = `/dashboard?profile=${getProfileFromEmail()}`;

  if (isRegistering) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="mx-auto w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Criar Conta</CardTitle>
                    <CardDescription>
                        Preencha seus dados para solicitar o acesso.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="full-name">Nome Completo</Label>
                                <Input id="full-name" placeholder="Seu nome completo" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email-register">E-mail Institucional</Label>
                                <Input id="email-register" type="email" placeholder="seu.email@upe.br" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password-register">Senha</Label>
                                <Input id="password-register" type="password" required />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="password-confirm">Confirmar Senha</Label>
                                <Input id="password-confirm" type="password" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="profile-type">Vínculo</Label>
                                <Select required>
                                    <SelectTrigger id="profile-type">
                                        <SelectValue placeholder="Selecione seu vínculo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="aluno">Aluno</SelectItem>
                                        <SelectItem value="professor">Professor</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="w-full">
                                Solicitar Cadastro
                            </Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Já tem uma conta?{" "}
                        <button onClick={() => setIsRegistering(false)} className="underline">
                            Entrar
                        </button>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">
            Sistema de Gerenciamento Acadêmico
          </CardTitle>
          <CardDescription>
            Insira seu e-mail institucional para acessar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="email">E-mail Institucional</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button type="button" aria-label="Ajuda">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                          Emails de Acesso (Protótipo)
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Use os emails abaixo para acessar os diferentes
                          perfis. A senha não é necessária.
                        </p>
                      </div>
                      <div className="grid gap-2 text-sm">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <span className="font-semibold">Aluno:</span>
                          <span className="col-span-2 font-mono">aluno@upe.br</span>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <span className="font-semibold">Professor:</span>
                          <span className="col-span-2 font-mono">
                            professor@upe.br
                          </span>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <span className="font-semibold">Coordenador:</span>
                          <span className="col-span-2 font-mono">
                            coordenador@upe.br
                          </span>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <span className="font-semibold">Admin:</span>
                          <span className="col-span-2 font-mono">admin@upe.br</span>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="seu.email@upe.br"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <Input id="password" type="password" />
            </div>
            <Button asChild className="w-full" onClick={handleLoginClick}>
              <Link href={dashboardUrl}>Entrar</Link>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Não tem uma conta?{" "}
            <button onClick={() => setIsRegistering(true)} className="underline">
              Criar Conta
            </button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
