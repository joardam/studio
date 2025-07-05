'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FilePlus2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for applications
const candidaturasMock = [
  {
    id: 1,
    tipo: 'Monitoria',
    titulo: 'Monitoria de Engenharia de Software I',
    status: 'Aprovada',
  },
  {
    id: 2,
    tipo: 'Estágio',
    titulo: 'Orientação de Estágio com Prof. Dr. Maria Clara',
    status: 'Pendente',
  },
  {
    id: 3,
    tipo: 'TCC',
    titulo: 'Orientação de TCC com Prof. Dr. Pedro Henrique',
    status: 'Rejeitada',
  },
  {
    id: 4,
    tipo: 'Monitoria',
    titulo: 'Monitoria de Redes de Computadores',
    status: 'Cancelada pelo Aluno',
  },
];

type Status = 'Pendente' | 'Aprovada' | 'Rejeitada' | 'Cancelada pelo Aluno';

const statusColors: Record<Status, string> = {
  Pendente: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-300',
  Aprovada: 'bg-green-100 text-green-800 hover:bg-green-200 border-green-300',
  Rejeitada: 'bg-red-100 text-red-800 hover:bg-red-200 border-red-300',
  'Cancelada pelo Aluno': 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300',
};

export default function MinhasCandidaturasPage() {
  const [activeTab, setActiveTab] = useState('todas');

  const filteredCandidaturas = candidaturasMock.filter((c) => {
    if (activeTab === 'todas') return true;
    const statusTabMap: Record<string, Status | undefined> = {
        pendentes: 'Pendente',
        aprovadas: 'Aprovada',
        rejeitadas: 'Rejeitada',
    };
    const targetStatus = statusTabMap[activeTab];
    return c.status === targetStatus;
  });

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon" className="shrink-0">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">Minhas Candidaturas</h1>
          <p className="text-sm text-muted-foreground">Acompanhe o status de todas as suas solicitações.</p>
        </div>
      </div>

      {candidaturasMock.length === 0 ? (
        <Card className="flex flex-col items-center justify-center text-center p-10">
          <CardHeader>
            <CardTitle>Nenhuma candidatura encontrada</CardTitle>
            <CardDescription>Você ainda não possui nenhuma candidatura. Que tal começar?</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard/candidaturas/nova">
                <FilePlus2 className="mr-2 h-4 w-4" />
                Submeter Nova Candidatura
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-4">
            <TabsTrigger value="todas">Todas</TabsTrigger>
            <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
            <TabsTrigger value="aprovadas">Aprovadas</TabsTrigger>
            <TabsTrigger value="rejeitadas">Rejeitadas</TabsTrigger>
          </TabsList>
            <div className="mt-4 grid gap-4">
              {filteredCandidaturas.map((c) => (
                <Card key={c.id}>
                  <CardContent className="p-6 grid md:grid-cols-[1fr_auto] items-center gap-4">
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                         <span className="font-semibold text-sm capitalize">{c.tipo}</span>
                         <Badge variant="outline" className={cn('whitespace-nowrap', statusColors[c.status as Status])}>{c.status}</Badge>
                      </div>
                      <p className="font-semibold text-lg">{c.titulo}</p>
                    </div>
                    <Button asChild className="mt-4 md:mt-0">
                      <Link href={`/dashboard/candidaturas/${c.id}`}>Ver Detalhes</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
               {filteredCandidaturas.length === 0 && (
                <div className="text-center text-muted-foreground py-10">
                    Nenhuma candidatura encontrada para este status.
                </div>
               )}
            </div>
        </Tabs>
      )}
    </div>
  );
}