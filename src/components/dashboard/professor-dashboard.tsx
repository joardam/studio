'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  BookUser,
  CalendarCheck,
  FileCheck2,
  ChevronDown
} from "lucide-react";
import type { ReactNode } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const QuickLink = ({ href, icon: Icon, children }: { href: string, icon: React.ElementType, children: ReactNode }) => {
  return (
    <Button asChild variant="outline" className="justify-start gap-2 text-left">
      <Link href={href}>
        <Icon className="h-4 w-4 shrink-0" />
        <span>{children}</span>
      </Link>
    </Button>
  );
};

const solicitacoesPendentesMock = [
  { id: 1, aluno: "Ana Beatriz", tipo: "TCC", avatarFallback: 'AB' },
  { id: 2, aluno: "Carlos Eduardo", tipo: "Estágio", avatarFallback: 'CE' },
  { id: 3, aluno: "Daniela Faria", tipo: "TCC", avatarFallback: 'DF' },
];

export const ProfessorDashboard = ({ profile }: { profile: string }) => {
  const [isRequestsVisible, setIsRequestsVisible] = useState(false);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral do Professor</CardTitle>
          <CardDescription>Solicitações de orientação pendentes.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Você tem <strong className="text-lg">{solicitacoesPendentesMock.length}</strong> novas solicitações de orientação.</p>

           <Collapsible
            open={isRequestsVisible}
            onOpenChange={setIsRequestsVisible}
            className="mt-4"
          >
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="group">
                <ChevronDown className="mr-2 h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                {isRequestsVisible ? "Ocultar Solicitações" : "Visualizar Solicitações"}
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-4 space-y-4">
              {solicitacoesPendentesMock.map((solicitacao) => (
                <div key={solicitacao.id} className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent/50">
                    <Link href={`/dashboard/solicitacoes/${solicitacao.id}`} className="flex items-center gap-4 flex-1 group cursor-pointer">
                        <Avatar>
                        <AvatarImage 
                            src={`https://placehold.co/40x40.png`} 
                            alt={solicitacao.aluno} 
                            data-ai-hint="person"
                        />
                        <AvatarFallback>{solicitacao.avatarFallback}</AvatarFallback>
                        </Avatar>
                        <div>
                        <p className="font-semibold group-hover:underline">{solicitacao.aluno}</p>
                        <p className="text-sm text-muted-foreground">Solicitação de Orientação de {solicitacao.tipo}</p>
                        </div>
                    </Link>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Atalhos Rápidos</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <QuickLink href="/dashboard/orientandos" icon={BookUser}>Visualizar Orientandos</QuickLink>
          <QuickLink href={`/dashboard/cronogramas?profile=${profile}`} icon={CalendarCheck}>Acompanhar Cronogramas</QuickLink>
          <QuickLink href="/dashboard/relatorios?profile=professor" icon={FileCheck2}>Aprovar/Rejeitar Relatórios</QuickLink>
        </CardContent>
      </Card>
    </div>
  );
};
