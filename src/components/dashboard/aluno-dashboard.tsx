'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  FilePlus2,
  ListTodo,
  Calendar,
  Star,
  Briefcase,
  FileText,
} from "lucide-react";
import type { ReactNode } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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

export const AlunoDashboard = () => {
  const [monitoriaAprovada, setMonitoriaAprovada] = useState(false);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral do Aluno</CardTitle>
          <CardDescription>Seus processos ativos e seus status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Monitoria</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {monitoriaAprovada ? (
                    <>
                        <div className="text-2xl font-bold text-green-600">Aprovada</div>
                        <p className="text-xs text-muted-foreground">Parabéns!</p>
                    </>
                ) : (
                    <>
                        <div className="text-2xl font-bold">Nenhuma</div>
                        <p className="text-xs text-muted-foreground">Nenhuma monitoria ativa.</p>
                    </>
                )}
              </CardContent>
              <CardFooter>
                 <div className="flex items-center space-x-2">
                    <Switch
                        id="monitoria-status"
                        checked={monitoriaAprovada}
                        onCheckedChange={setMonitoriaAprovada}
                    />
                    <Label htmlFor="monitoria-status">Simular Aprovação</Label>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Estágio</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">Pendente</div>
                <p className="text-xs text-muted-foreground">
                  Aguardando aprovação
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">TCC</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Em andamento</div>
                <p className="text-xs text-muted-foreground">
                  Próxima entrega: 25/12
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Atalhos Rápidos</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <QuickLink href={`/dashboard/candidaturas/nova?monitoriaAprovada=${monitoriaAprovada}`} icon={FilePlus2}>Submeter Candidatura</QuickLink>
          <QuickLink href="/dashboard/candidaturas" icon={ListTodo}>Acompanhar Candidaturas</QuickLink>
          <QuickLink href="/dashboard/cronograma" icon={Calendar}>Meu Cronograma</QuickLink>
        </CardContent>
      </Card>
    </div>
  );
};
