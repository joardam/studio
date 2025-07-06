'use client';

import { Button } from "@/components/ui/button";
import { CircleUser, GanttChartSquare, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileDataMap = {
  aluno: { name: 'Aluno Teste', email: 'aluno@upe.br', fallback: 'AT' },
  professor: { name: 'Professor Teste', email: 'professor@upe.br', fallback: 'PT' },
  coordenador: { name: 'Coordenador Teste', email: 'coordenador@upe.br', fallback: 'CT' },
  administrativo: { name: 'Admin Teste', email: 'admin@upe.br', fallback: 'AD' },
};


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState('aluno');

  useEffect(() => {
    const storedProfile = sessionStorage.getItem('userProfile');
    if (storedProfile && profileDataMap[storedProfile as keyof typeof profileDataMap]) {
      setProfile(storedProfile);
    }
  }, []);

  const homeUrl = `/dashboard?profile=${profile}`;
  const logoutUrl = `/?profile=${profile}`;
  const currentUser = profileDataMap[profile as keyof typeof profileDataMap] || profileDataMap.aluno;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href={homeUrl}
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <GanttChartSquare className="h-6 w-6 text-primary" />
            <span className="sr-only">SGA</span>
          </Link>
          <h1 className="text-lg font-semibold whitespace-nowrap">
            Sistema de Gerenciamento Acadêmico
          </h1>
        </nav>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial" />
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex items-center gap-3 p-2">
                    <Avatar>
                         <AvatarImage 
                            src={`https://placehold.co/40x40.png`} 
                            alt={currentUser.name}
                            data-ai-hint="person"
                            />
                        <AvatarFallback>{currentUser.fallback}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5">
                        <p className="font-medium">{currentUser.name}</p>
                        <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/perfil">
                        <User className="mr-2 h-4 w-4" />
                        <span>Atualizar Cadastro</span>
                    </Link>
                </DropdownMenuItem>
                 <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                   <Link href={logoutUrl}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
