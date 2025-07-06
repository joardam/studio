
'use client';

import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, FileText, Calendar, MessageSquare, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data
const orientandosDetalhesMock = [
  {
    id: 1,
    aluno: 'Vinícius de Moura',
    avatarFallback: 'VM',
    processo: 'TCC',
    titulo: 'Análise de Algoritmos de IA para Detecção de Fraudes',
    status: 'Em Andamento',
    documentos: [
      { nome: 'Pre_projeto_TCC.pdf', data: '10/03/2025', url: '#' },
      { nome: 'Artigo_v1.pdf', data: '15/05/2025', url: '#' },
    ],
    cronograma: [
      { id: 1, pendencia: 'Entrega da versão final do Artigo', vencimento: '20/07/2025' },
      { id: 2, pendencia: 'Apresentação para a banca', vencimento: '10/08/2025' },
    ],
    feedback: [
        { autor: 'Professor Teste', data: '16/05/2025', mensagem: 'Bom começo, Vinícius. A introdução está sólida, mas a seção de metodologia precisa de mais detalhes sobre o dataset utilizado. Por favor, revise os pontos que anotei no documento e me envie a v2 até a próxima semana.' },
        { autor: 'Vinícius de Moura', data: '17/05/2025', mensagem: 'Obrigado pelo feedback, professor! Farei os ajustes e enviarei a nova versão em breve.' }
    ]
  },
  {
    id: 2,
    aluno: 'Maria Clara',
    avatarFallback: 'MC',
    processo: 'Estágio',
    titulo: 'Desenvolvimento de API REST para E-commerce',
    status: 'Em Andamento',
    documentos: [
      { nome: 'Plano_de_Estagio.pdf', data: '01/04/2025', url: '#' },
      { nome: 'Relatorio_Parcial_1.pdf', data: '30/04/2025', url: '#' },
    ],
    cronograma: [
      { id: 1, pendencia: 'Entrega do relatório parcial 2', vencimento: '30/05/2025'},
      { id: 2, pendencia: 'Entrega do relatório final', vencimento: '30/06/2025'},
    ],
    feedback: [
        { autor: 'Professor Teste', data: '01/05/2025', mensagem: 'Relatório recebido, Maria. Bom trabalho na documentação dos endpoints. Continue assim.' },
    ]
  },
  {
    id: 3,
    aluno: 'João Silva',
    avatarFallback: 'JS',
    processo: 'Monitoria',
    titulo: 'Monitoria de Redes de Computadores',
    status: 'Concluído',
    documentos: [
      { nome: 'Plano_de_Atividades.pdf', data: '05/03/2025', url: '#' },
      { nome: 'Relatorio_Final_Monitoria.pdf', data: '10/07/2025', url: '#' },
    ],
    cronograma: [],
    feedback: [
        { autor: 'Professor Teste', data: '11/07/2025', mensagem: 'Parabéns pela conclusão da monitoria, João. Excelente trabalho!' },
    ]
  },
    {
    id: 4,
    aluno: 'Ana Beatriz',
    avatarFallback: 'AB',
    processo: 'TCC',
    titulo: 'Estudo sobre a Usabilidade de Interfaces em Sistemas Web',
    status: 'Em Andamento',
    documentos: [
      { nome: 'Pre_projeto_TCC_Ana.pdf', data: '12/04/2025', url: '#' },
    ],
    cronograma: [
      { id: 1, pendencia: 'Entrega do capítulo 1', vencimento: '25/06/2025' },
      { id: 2, pendencia: 'Entrega do capítulo 2', vencimento: '25/07/2025' },
    ],
    feedback: [
        { autor: 'Professor Teste', data: '13/04/2025', mensagem: 'Pré-projeto aprovado. Podemos começar. Agende uma reunião para definirmos o cronograma detalhado.' },
        { autor: 'Ana Beatriz', data: '13/04/2025', mensagem: 'Ótimo! Agendarei para a próxima semana. Obrigada, professor.' },
    ]
  },
];

const statusColors = {
  'Em Andamento': 'bg-blue-100 text-blue-800 border-blue-300',
  'Concluído': 'bg-green-100 text-green-800 border-green-300',
};
type Status = keyof typeof statusColors;

export default function DetalhesOrientandoPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const orientando = orientandosDetalhesMock.find((o) => o.id === parseInt(params.id, 10));

    if (!orientando) {
        notFound();
    }
    
    return (
        <div className="grid gap-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="shrink-0" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Voltar</span>
                </Button>
                <div>
                    <h1 className="text-2xl font-semibold">Acompanhamento do Orientando</h1>
                    <p className="text-sm text-muted-foreground">Detalhes do processo de {orientando.processo}.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 grid gap-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className='flex items-center gap-4'>
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={`https://placehold.co/64x64.png`} alt={orientando.aluno} data-ai-hint="person" />
                                        <AvatarFallback>{orientando.avatarFallback}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-xl">{orientando.aluno}</CardTitle>
                                        <CardDescription>{orientando.processo} - {orientando.titulo}</CardDescription>
                                    </div>
                                </div>
                                <Badge variant="outline" className={cn(statusColors[orientando.status as Status])}>
                                    {orientando.status}
                                </Badge>
                            </div>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5" />
                                Histórico de Feedback
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4 max-h-72 overflow-y-auto pr-4">
                                {orientando.feedback.map((msg, index) => (
                                    <div key={index} className="flex gap-3">
                                        <Avatar>
                                            <AvatarImage src={`https://placehold.co/40x40.png`} alt={msg.autor} data-ai-hint="person professional" />
                                            <AvatarFallback>{msg.autor.split(' ').map(n => n[0]).slice(0,2).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 rounded-lg border p-3 text-sm">
                                            <div className="flex justify-between items-center">
                                                <p className="font-semibold">{msg.autor}</p>
                                                <p className="text-xs text-muted-foreground">{msg.data}</p>
                                            </div>
                                            <p className="mt-1 text-muted-foreground">{msg.mensagem}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-start gap-3 pt-4 border-t">
                                 <Avatar>
                                    <AvatarImage src={`https://placehold.co/40x40.png`} alt="Professor Teste" data-ai-hint="person professional" />
                                    <AvatarFallback>PT</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 relative">
                                    <Textarea placeholder="Escreva um novo feedback para o aluno..." rows={3} />
                                    <Button size="icon" className="absolute bottom-2 right-2 h-8 w-8">
                                        <Send className="h-4 w-4" />
                                        <span className="sr-only">Enviar</span>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Entregas e Documentos</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            {orientando.documentos.map((doc, index) => (
                                <Button key={index} variant="outline" className="justify-start h-auto" asChild>
                                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2">
                                        <FileText className="h-5 w-5 shrink-0" />
                                        <div className="grid gap-0.5 text-left">
                                            <span className="font-medium">{doc.nome}</span>
                                            <span className="text-xs text-muted-foreground">Enviado em: {doc.data}</span>
                                        </div>
                                    </a>
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Próximas Entregas</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {orientando.cronograma.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                                        <Calendar className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{item.pendencia}</p>
                                        <p className="text-sm text-muted-foreground">Vencimento: {item.vencimento}</p>
                                    </div>
                                </div>
                            ))}
                            {orientando.cronograma.length === 0 && <p className="text-sm text-muted-foreground text-center">Nenhuma entrega futura.</p>}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
