
'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Briefcase, FileText, Star, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, parseISO, isAfter, differenceInDays, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState, useEffect } from 'react';

const addDays = (date: Date, days: number): string => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0];
};

const hoje = new Date();

const cronogramaMockData = [
  {
    id: 1,
    processo: 'Monitoria',
    titulo: 'Monitoria de Engenharia de Software I',
    pendencia: 'Enviar plano de atividades mensal',
    vencimento: addDays(hoje, 15),
    link: '/dashboard/candidaturas/1'
  },
  {
    id: 2,
    processo: 'TCC',
    titulo: 'Orientação de TCC com Prof. Dr. Vinícius Moura',
    pendencia: 'Entrega da primeira versão do Artigo',
    vencimento: addDays(hoje, 5),
    link: '/dashboard/candidaturas/5'
  },
  {
    id: 3,
    processo: 'Estágio',
    titulo: 'Estágio Supervisionado com Prof. Dr. João Silva',
    pendencia: 'Submissão do primeiro relatório de atividades',
    vencimento: addDays(hoje, 25),
    link: '/dashboard/candidaturas/6'
  },
  {
    id: 4,
    processo: 'Monitoria',
    titulo: 'Monitoria de Engenharia de Software I',
    pendencia: 'Relatório parcial de frequência',
    vencimento: addDays(hoje, -3),
    link: '/dashboard/candidaturas/1'
  },
];


const getStatus = (vencimento: string) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataVencimento = parseISO(vencimento);

    if (isBefore(dataVencimento, hoje)) {
        return { label: 'Vencido', color: 'bg-red-100 text-red-800 border-red-300', icon: AlertCircle };
    }
    if (differenceInDays(dataVencimento, hoje) <= 7) {
        return { label: 'Próximo do Vencimento', color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: Clock };
    }
    return { label: 'A Vencer', color: 'bg-blue-100 text-blue-800 border-blue-300', icon: CheckCircle };
};

const getProcessoIcon = (processo: string) => {
    switch (processo.toLowerCase()) {
        case 'monitoria':
            return <Star className="h-5 w-5 text-primary" />;
        case 'estágio':
            return <Briefcase className="h-5 w-5 text-primary" />;
        case 'tcc':
            return <FileText className="h-5 w-5 text-primary" />;
        default:
            return <Calendar className="h-5 w-5 text-primary" />;
    }
}

export default function MeuCronogramaPage() {
    const [cronograma, setCronograma] = useState<typeof cronogramaMockData>([]);

    useEffect(() => {
        const sortedData = [...cronogramaMockData].sort((a, b) => new Date(a.vencimento).getTime() - new Date(b.vencimento).getTime());
        setCronograma(sortedData);
    }, []);

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
                    <h1 className="text-2xl font-semibold leading-none tracking-tight">Meu Cronograma</h1>
                    <p className="text-sm text-muted-foreground">Acompanhe todos os prazos e pendências de suas atividades acadêmicas.</p>
                </div>
            </div>

            {cronograma.length === 0 ? (
                <Card className="flex flex-col items-center justify-center text-center p-10 mt-10">
                    <CardContent className="grid gap-2">
                        <Calendar className="h-16 w-16 mx-auto text-muted-foreground" />
                        <h2 className="text-xl font-semibold mt-4">Nenhum prazo no momento</h2>
                        <p className="text-muted-foreground">Você não possui processos ativos com prazos definidos.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {cronograma.map((item) => {
                        const status = getStatus(item.vencimento);
                        return (
                           <Link key={item.id} href={item.link} className="block">
                             <Card className="hover:bg-accent/50 transition-colors">
                                <CardContent className="p-4 grid grid-cols-[auto_1fr_auto] items-center gap-4">
                                     <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                                        {getProcessoIcon(item.processo)}
                                    </div>
                                    <div className="grid gap-1">
                                        <p className="font-semibold">{item.pendencia}</p>
                                        <p className="text-sm text-muted-foreground">{item.titulo}</p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span>Vence em: {format(parseISO(item.vencimento), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className={cn('flex items-center gap-1.5 whitespace-nowrap', status.color)}>
                                        <status.icon className="h-3.5 w-3.5" />
                                        {status.label}
                                    </Badge>
                                </CardContent>
                            </Card>
                           </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
