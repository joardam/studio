'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Search, FileText, Clock } from 'lucide-react';

// Mock data
const relatoriosPendentesMock = [
  {
    id: 1,
    aluno: 'Vinícius de Moura',
    avatarFallback: 'VM',
    processo: 'TCC',
    documento: 'Artigo_v2.pdf',
    dataEnvio: '25/05/2025',
  },
  {
    id: 2,
    aluno: 'Maria Clara',
    avatarFallback: 'MC',
    processo: 'Estágio',
    documento: 'Relatorio_Parcial_2.pdf',
    dataEnvio: '30/05/2025',
  },
  {
    id: 3,
    aluno: 'Ana Beatriz',
    avatarFallback: 'AB',
    processo: 'TCC',
    documento: 'Capitulo_1.pdf',
    dataEnvio: '26/06/2025',
  },
];

export default function AvaliarRelatoriosPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRelatorios = relatoriosPendentesMock.filter(
    (r) =>
      r.aluno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.processo.toLowerCase().includes(searchTerm.toLowerCase())
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
            <CardTitle>Avaliar Relatórios Pendentes</CardTitle>
            <CardDescription>
              Revise os documentos enviados pelos seus orientandos.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Filtrar por aluno ou processo..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {filteredRelatorios.length > 0 ? (
            <div className="grid gap-4">
              {filteredRelatorios.map((relatorio) => (
                <Link key={relatorio.id} href={`/dashboard/relatorios/${relatorio.id}`} className="block">
                  <Card className="hover:bg-accent/50 transition-colors">
                    <CardContent className="p-4 grid md:grid-cols-[auto_1fr_auto] items-center gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage
                                src={`https://placehold.co/48x48.png`}
                                alt={relatorio.aluno}
                                data-ai-hint="person"
                                />
                                <AvatarFallback>{relatorio.avatarFallback}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="font-semibold">{relatorio.aluno}</p>
                                <p className="text-sm text-muted-foreground">{relatorio.processo}</p>
                            </div>
                        </div>
                        <div className="grid gap-1 text-sm">
                            <div className="flex items-center gap-2 font-medium">
                                <FileText className="h-4 w-4" />
                                <span>{relatorio.documento}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>Enviado em: {relatorio.dataEnvio}</span>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full justify-center md:w-auto">
                            Analisar Relatório
                        </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-10">
              <p>Nenhum relatório pendente de avaliação.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
