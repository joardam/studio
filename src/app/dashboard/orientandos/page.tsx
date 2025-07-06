
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for orientandos
const orientandosMock = [
  {
    id: 1,
    aluno: 'Vinícius de Moura',
    avatarFallback: 'VM',
    processo: 'TCC',
    titulo: 'Análise de Algoritmos de IA para Detecção de Fraudes',
    status: 'Em Andamento',
  },
  {
    id: 2,
    aluno: 'Maria Clara',
    avatarFallback: 'MC',
    processo: 'Estágio',
    titulo: 'Desenvolvimento de API REST para E-commerce',
    status: 'Em Andamento',
  },
  {
    id: 3,
    aluno: 'João Silva',
    avatarFallback: 'JS',
    processo: 'Monitoria',
    titulo: 'Monitoria de Redes de Computadores',
    status: 'Concluído',
  },
   {
    id: 4,
    aluno: 'Ana Beatriz',
    avatarFallback: 'AB',
    processo: 'TCC',
    titulo: 'Estudo sobre a Usabilidade de Interfaces em Sistemas Web',
    status: 'Em Andamento',
  },
];

const statusColors = {
  'Em Andamento': 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300',
  'Concluído': 'bg-green-100 text-green-800 hover:bg-green-200 border-green-300',
};

type Status = keyof typeof statusColors;

export default function MeusOrientandosPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrientandos = orientandosMock.filter(
    (o) =>
      o.aluno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.processo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="flex-row items-start gap-4">
          <Button asChild variant="outline" size="icon" className="shrink-0">
            <Link href="/dashboard?profile=professor">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Link>
          </Button>
          <div className="flex-1">
            <CardTitle>Meus Orientandos</CardTitle>
            <CardDescription>
              Visualize e acompanhe o progresso de seus orientandos.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Filtrar por nome ou processo..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {filteredOrientandos.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredOrientandos.map((orientando) => (
                <Card key={orientando.id}>
                  <CardContent className="p-6 grid gap-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage
                                src={`https://placehold.co/40x40.png`}
                                alt={orientando.aluno}
                                data-ai-hint="person"
                                />
                                <AvatarFallback>{orientando.avatarFallback}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{orientando.aluno}</p>
                                <p className="text-sm text-muted-foreground">{orientando.processo}</p>
                            </div>
                        </div>
                        <Badge variant="outline" className={cn(statusColors[orientando.status as Status])}>
                            {orientando.status}
                        </Badge>
                    </div>
                    <div>
                        <p className="font-semibold text-base">{orientando.titulo}</p>
                    </div>
                     <Button asChild variant="outline" size="sm" className="mt-2 w-full justify-center md:w-auto">
                        <Link href={`/dashboard/orientandos/${orientando.id}`}>Ver Detalhes</Link>
                     </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-10">
              <p>Nenhum orientando encontrado com o filtro atual.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
