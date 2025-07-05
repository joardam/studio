'use client';

import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Calendar, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data - In a real app, this would be fetched from an API
const candidaturasMock = [
  {
    id: 1,
    tipo: 'Monitoria',
    titulo: 'Monitoria de Engenharia de Software I',
    status: 'Aprovada',
    dataSubmissao: '20/08/2025',
    documentos: [{ nome: 'Historico_Escolar.pdf', url: '#' }],
    historico: [
      { data: '22/08/2025', status: 'Candidatura Aprovada' },
      { data: '20/08/2025', status: 'Candidatura Enviada' },
    ],
  },
  {
    id: 2,
    tipo: 'Estágio',
    titulo: 'Orientação de Estágio com Prof. Dr. Maria Clara',
    status: 'Pendente',
    dataSubmissao: '15/09/2025',
    documentos: [
        { nome: 'Curriculo.pdf', url: '#' },
        { nome: 'Proposta_estagio.pdf', url: '#' }
    ],
    historico: [{ data: '15/09/2025', status: 'Candidatura Enviada' }],
  },
  {
    id: 3,
    tipo: 'TCC',
    titulo: 'Orientação de TCC com Prof. Dr. Pedro Henrique',
    status: 'Rejeitada',
    dataSubmissao: '01/10/2025',
    documentos: [{ nome: 'Pre_projeto_TCC.pdf', url: '#' }],
    historico: [
      { data: '03/10/2025', status: 'Candidatura Rejeitada' },
      { data: '01/10/2025', status: 'Candidatura Enviada' },
    ],
    justificativa: 'O pré-projeto apresentado não está alinhado com as áreas de pesquisa atuais do professor. Recomenda-se revisar as linhas de pesquisa disponíveis no site do departamento e submeter uma nova proposta.',
  },
   {
    id: 4,
    tipo: 'Monitoria',
    titulo: 'Monitoria de Redes de Computadores',
    status: 'Cancelada pelo Aluno',
    dataSubmissao: '18/07/2025',
    documentos: [{ nome: 'Historico_2025_1.pdf', url: '#' }],
    historico: [
      { data: '19/07/2025', status: 'Candidatura Cancelada pelo Aluno' },
      { data: '18/07/2025', status: 'Candidatura Enviada' },
    ],
  },
  {
    id: 5,
    tipo: 'TCC',
    titulo: 'Orientação de TCC com Prof. Dr. Vinícius Moura',
    status: 'Aprovada',
    dataSubmissao: '10/06/2025',
    documentos: [{ nome: 'Projeto_TCC_Aprovado.pdf', url: '#' }],
    historico: [
        { data: '12/06/2025', status: 'Candidatura Aprovada' },
        { data: '10/06/2025', status: 'Candidatura Enviada' },
    ]
  },
];


type Status = 'Pendente' | 'Aprovada' | 'Rejeitada' | 'Cancelada pelo Aluno';

const statusColors: Record<Status, string> = {
  Pendente: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-300',
  Aprovada: 'bg-green-100 text-green-800 hover:bg-green-200 border-green-300',
  Rejeitada: 'bg-red-100 text-red-800 hover:bg-red-200 border-red-300',
  'Cancelada pelo Aluno': 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300',
};


export default function DetalhesCandidaturaPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const candidatura = candidaturasMock.find((c) => c.id === parseInt(params.id, 10));

  if (!candidatura) {
    notFound();
  }

  return (
    <div className="grid gap-6">
       <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="shrink-0" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">Detalhes da Candidatura</h1>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Resumo da Candidatura</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex justify-between items-start">
                        <span className="text-muted-foreground">Processo</span>
                        <span className="font-medium text-right">{candidatura.tipo}</span>
                    </div>
                    <div className="flex justify-between items-start">
                        <span className="text-muted-foreground">Título</span>
                         <span className="font-medium text-right">{candidatura.titulo}</span>
                    </div>
                     <div className="flex justify-between items-start">
                        <span className="text-muted-foreground">Status</span>
                        <Badge variant="outline" className={cn(statusColors[candidatura.status as Status])}>{candidatura.status}</Badge>
                    </div>
                </CardContent>
            </Card>

            {candidatura.justificativa && (
                 <Card className="border-destructive/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive">
                            <Info className="h-5 w-5" />
                            Justificativa da Rejeição
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">{candidatura.justificativa}</p>
                    </CardContent>
                </Card>
            )}
        </div>

        <div className="grid gap-6">
             <Card>
                <CardHeader>
                    <CardTitle>Documentos Enviados</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                    {candidatura.documentos.map((doc, index) => (
                        <Button key={index} variant="outline" className="justify-start" asChild>
                            <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                <FileText className="mr-2 h-4 w-4" />
                                {doc.nome}
                            </a>
                        </Button>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Histórico de Status</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {candidatura.historico.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                                <Calendar className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="font-semibold">{item.status}</p>
                                <p className="text-sm text-muted-foreground">{item.data}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
      
       {candidatura.status === 'Pendente' && (
        <div className="flex justify-end mt-4">
            <Button variant="destructive">Cancelar Candidatura</Button>
        </div>
       )}

    </div>
  );
}
