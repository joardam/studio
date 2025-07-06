'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Search, FileText, Clock } from 'lucide-react';

// Mock data
const relatoriosPendentesMock = [
    {
        id: 1,
        aluno: 'Carlos Eduardo',
        avatarFallback: 'CE',
        processo: 'Monitoria',
        documento: 'Relatorio_Mensal_Monitoria.pdf',
        dataEnvio: '28/06/2025',
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
        aluno: 'João Silva',
        avatarFallback: 'JS',
        processo: 'Monitoria',
        documento: 'Relatorio_Final_Monitoria.pdf',
        dataEnvio: '01/07/2025',
    },
];


function RelatoriosContent() {
    const searchParams = useSearchParams();
    const profile = searchParams.get('profile') || 'professor';
    const backUrl = `/dashboard?profile=${profile}`;

    const [searchTerm, setSearchTerm] = useState('');
    const [processoFilter, setProcessoFilter] = useState('Todos');


    const filteredRelatorios = relatoriosPendentesMock.filter(
        (r) =>
        (r.aluno.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (processoFilter === 'Todos' || r.processo === processoFilter)
    );

    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader className="flex-row items-start gap-4">
                    <Button asChild variant="outline" size="icon" className="shrink-0">
                        <Link href={backUrl}>
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Voltar</span>
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <CardTitle>Relatórios Pendentes de Avaliação</CardTitle>
                        <CardDescription>
                            Analise e valide os relatórios de atividades submetidos pelos seus orientandos.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid sm:grid-cols-[1fr_180px] gap-4">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Filtrar por nome do aluno..."
                                className="pl-8 w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={processoFilter} onValueChange={setProcessoFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filtrar por Processo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Todos">Todos os Processos</SelectItem>
                                <SelectItem value="Monitoria">Monitoria</SelectItem>
                                <SelectItem value="Estágio">Estágio</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {filteredRelatorios.length > 0 ? (
                        <div className="grid gap-4">
                            {filteredRelatorios.map((relatorio) => (
                                <Link key={relatorio.id} href={`/dashboard/relatorios/${relatorio.id}?profile=${profile}`} className="block">
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
                            <p>Você não possui relatórios pendentes para avaliação no momento.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default function AvaliarRelatoriosPage() {
    return (
        <Suspense fallback={<Card><CardHeader><CardTitle>Carregando...</CardTitle></CardHeader></Card>}>
            <RelatoriosContent />
        </Suspense>
    );
}
