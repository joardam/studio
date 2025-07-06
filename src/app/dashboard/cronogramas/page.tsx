'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, parseISO, isBefore, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState, useEffect } from 'react';

const addDays = (date: Date, days: number): string => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0];
};

const hoje = new Date();

const cronogramasMockData = [
    { id: 1, orientandoId: 1, aluno: 'Vinícius de Moura', processo: 'TCC', pendencia: 'Entrega da versão final do Artigo', vencimento: addDays(hoje, 25) },
    { id: 2, orientandoId: 1, aluno: 'Vinícius de Moura', processo: 'TCC', pendencia: 'Apresentação para a banca', vencimento: addDays(hoje, 45) },
    { id: 3, orientandoId: 2, aluno: 'Maria Clara', processo: 'Estágio', pendencia: 'Entrega do relatório parcial 2', vencimento: addDays(hoje, -2) },
    { id: 4, orientandoId: 2, aluno: 'Maria Clara', processo: 'Estágio', pendencia: 'Entrega do relatório final', vencimento: addDays(hoje, 28) },
    { id: 5, orientandoId: 4, aluno: 'Ana Beatriz', processo: 'TCC', pendencia: 'Entrega do capítulo 1', vencimento: addDays(hoje, 5) },
    { id: 6, orientandoId: 4, aluno: 'Ana Beatriz', processo: 'TCC', pendencia: 'Entrega do capítulo 2', vencimento: addDays(hoje, 35) },
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

export default function CronogramasProfessorPage() {
    const [cronograma, setCronograma] = useState<typeof cronogramasMockData>([]);

    useEffect(() => {
        const sortedData = [...cronogramasMockData].sort((a, b) => new Date(a.vencimento).getTime() - new Date(b.vencimento).getTime());
        setCronograma(sortedData);
    }, []);

    return (
        <div className="grid gap-6">
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon" className="shrink-0">
                    <Link href="/dashboard?profile=professor">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Voltar</span>
                    </Link>
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl font-semibold leading-none tracking-tight">Cronograma dos Orientandos</h1>
                    <p className="text-sm text-muted-foreground">Acompanhe todos os prazos e pendências de seus orientandos.</p>
                </div>
            </div>

            {cronograma.length === 0 ? (
                <Card className="flex flex-col items-center justify-center text-center p-10 mt-10">
                    <CardContent className="grid gap-2">
                        <Calendar className="h-16 w-16 mx-auto text-muted-foreground" />
                        <h2 className="text-xl font-semibold mt-4">Nenhum prazo no momento</h2>
                        <p className="text-muted-foreground">Seus orientandos não possuem pendências com prazos definidos.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {cronograma.map((item) => {
                        const status = getStatus(item.vencimento);
                        return (
                           <Link key={item.id} href={`/dashboard/orientandos/${item.orientandoId}`} className="block">
                             <Card className="hover:bg-accent/50 transition-colors h-full flex flex-col">
                                <CardContent className="p-4 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant="outline" className={cn('flex items-center gap-1.5 whitespace-nowrap', status.color)}>
                                            <status.icon className="h-3.5 w-3.5" />
                                            {status.label}
                                        </Badge>
                                        <span className='text-sm font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-md'>{item.processo}</span>
                                    </div>
                                    <div className="grid gap-1 mb-3 flex-1">
                                        <p className="font-semibold text-base">{item.pendencia}</p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <User className="h-4 w-4" />
                                            <span>{item.aluno}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-auto pt-3 border-t">
                                        <Calendar className="h-4 w-4" />
                                        <span>Vence em: {format(parseISO(item.vencimento), "dd/MM/yyyy", { locale: ptBR })}</span>
                                    </div>
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
