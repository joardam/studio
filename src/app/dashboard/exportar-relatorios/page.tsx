
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const reportTypes = [
  {
    id: 'monitoria_periodo',
    title: 'Alunos em Monitoria por Período',
    description: 'Lista todos os alunos atuando como monitores em um período letivo específico.',
  },
  {
    id: 'estagio_empresa',
    title: 'Alunos em Estágio por Empresa',
    description: 'Gera uma lista de estagiários filtrada por empresa e status do estágio.',
  },
  {
    id: 'tcc_status',
    title: 'Status de todos os TCCs em Andamento',
    description: 'Relatório consolidado sobre o progresso de todos os TCCs.',
  },
  {
    id: 'processos_pendencias',
    title: 'Lista de Processos com Pendências',
    description: 'Identifica todos os processos com algum tipo de pendência no sistema.',
  },
];

type ReportType = typeof reportTypes[0] | null;

export default function ExportarRelatoriosPage() {
    const { toast } = useToast();
    const [selectedReport, setSelectedReport] = useState<ReportType>(null);
    const [format, setFormat] = useState('xlsx');

    const handleExport = () => {
        // In a real app, this would trigger an API call to generate and download the file.
        // For this prototype, we'll just show a success message.
        toast({
            title: "Relatório Gerado!",
            description: `O seu relatório "${selectedReport?.title}" foi gerado e o download foi iniciado.`,
        });
    };

    const renderFilters = () => {
        if (!selectedReport) return null;

        switch (selectedReport.id) {
            case 'monitoria_periodo':
                return (
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="periodo-letivo">Período Letivo</Label>
                            <Select>
                                <SelectTrigger id="periodo-letivo"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2025.1">2025.1</SelectItem>
                                    <SelectItem value="2025.2">2025.2</SelectItem>
                                    <SelectItem value="2024.2">2024.2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="curso">Curso</Label>
                            <Select>
                                <SelectTrigger id="curso"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todos">Todos os Cursos</SelectItem>
                                    <SelectItem value="computacao">Engenharia de Computação</SelectItem>
                                    <SelectItem value="civil">Engenharia Civil</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                );
            case 'estagio_empresa':
                return (
                     <div className="grid sm:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="empresa">Nome da Empresa</Label>
                            <Input id="empresa" placeholder="Digite para buscar..." />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="status-estagio">Status</Label>
                             <Select>
                                <SelectTrigger id="status-estagio"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todos">Todos os Status</SelectItem>
                                    <SelectItem value="ativo">Ativo</SelectItem>
                                    <SelectItem value="finalizado">Finalizado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                );
            case 'tcc_status':
                 return (
                     <div className="grid sm:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="curso-tcc">Curso</Label>
                             <Select>
                                <SelectTrigger id="curso-tcc"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                <SelectContent>
                                     <SelectItem value="todos">Todos os Cursos</SelectItem>
                                     <SelectItem value="computacao">Engenharia de Computação</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="status-tcc">Status do TCC</Label>
                             <Select>
                                <SelectTrigger id="status-tcc"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todos">Todos</SelectItem>
                                    <SelectItem value="em_andamento">Em Andamento</SelectItem>
                                    <SelectItem value="aprovado">Aprovado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                );
            case 'processos_pendencias':
                 return (
                    <div className="grid sm:grid-cols-2 gap-4">
                       <div className="grid gap-2">
                            <Label htmlFor="tipo-processo">Tipo de Processo</Label>
                            <Select>
                                <SelectTrigger id="tipo-processo"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todos">Todos</SelectItem>
                                    <SelectItem value="monitoria">Monitoria</SelectItem>
                                    <SelectItem value="estagio">Estágio</SelectItem>
                                    <SelectItem value="tcc">TCC</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="tipo-pendencia">Tipo de Pendência</Label>
                             <Select>
                                <SelectTrigger id="tipo-pendencia"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todos">Todas</SelectItem>
                                    <SelectItem value="documentacao">Documentação Atrasada</SelectItem>
                                    <SelectItem value="relatorio">Relatório Pendente</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="grid gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon" className="shrink-0">
                    <Link href="/dashboard?profile=administrativo">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Voltar</span>
                    </Link>
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl font-semibold leading-none tracking-tight">Exportação de Relatórios Gerenciais</h1>
                    <p className="text-sm text-muted-foreground">
                        Gere planilhas com dados consolidados do sistema para análise e controle administrativo.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Passo 1: Selecione o Relatório</CardTitle>
                    <CardDescription>Clique no relatório que deseja gerar para ver as opções de filtro.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                    {reportTypes.map((report) => (
                        <button
                            key={report.id}
                            onClick={() => setSelectedReport(report)}
                            className={cn(
                                "p-4 rounded-lg border text-left transition-colors hover:bg-accent hover:text-accent-foreground",
                                selectedReport?.id === report.id ? "bg-accent text-accent-foreground ring-2 ring-ring" : "bg-card text-card-foreground"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <FileText className="h-6 w-6 text-primary mt-1 shrink-0" />
                                <div>
                                    <p className="font-semibold">{report.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{report.description}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </CardContent>
            </Card>

            {selectedReport && (
                <Card className="animate-in fade-in-50">
                    <CardHeader>
                        <CardTitle>Passo 2: Filtros e Opções de Exportação</CardTitle>
                        <CardDescription>Ajuste os filtros para o relatório de <span className="font-semibold">"{selectedReport.title}"</span>.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        {renderFilters()}
                        <div className="grid gap-2">
                            <Label>Formato do Arquivo</Label>
                             <RadioGroup defaultValue="xlsx" value={format} onValueChange={setFormat} className="flex items-center gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="xlsx" id="xlsx" />
                                    <Label htmlFor="xlsx">Excel (.xlsx)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="csv" id="csv" />
                                    <Label htmlFor="csv">CSV (.csv)</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="flex justify-end mt-2">
                            <Button onClick={handleExport} disabled={!selectedReport}>
                                <Download className="mr-2 h-4 w-4" />
                                Exportar Relatório
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

