'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Search, Award, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock Data
const alunosElegiveisMock = [
  { id: 1, nome: 'João Silva', processo: 'Monitoria de Redes de Computadores', periodo: '2025.1', status: 'Aguardando Emissão' },
  { id: 2, nome: 'Mariana Costa', processo: 'Monitoria de Cálculo Vetorial', periodo: '2025.1', status: 'Aguardando Emissão' },
  { id: 3, nome: 'Pedro Álvares', processo: 'Monitoria de Física Quântica', periodo: '2025.1', status: 'Aguardando Emissão' },
];

type Aluno = typeof alunosElegiveisMock[0];

export default function GerarCertificadosPage() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [alunos, setAlunos] = useState<Aluno[]>(alunosElegiveisMock);
    const [selectedAlunos, setSelectedAlunos] = useState<Set<number>>(new Set());

    const filteredAlunos = alunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            const allIds = new Set(filteredAlunos.map(a => a.id));
            setSelectedAlunos(allIds);
        } else {
            setSelectedAlunos(new Set());
        }
    };

    const handleSelectOne = (id: number, checked: boolean) => {
        const newSelection = new Set(selectedAlunos);
        if (checked) {
            newSelection.add(id);
        } else {
            newSelection.delete(id);
        }
        setSelectedAlunos(newSelection);
    };

    const handleGenerateCertificates = () => {
        toast({
            title: "Operação Concluída!",
            description: `O(s) certificado(s) para ${selectedAlunos.size} aluno(s) foi(ram) gerado(s) e disponibilizado(s).`,
        });

        // Remove selected students from the list
        setAlunos(alunos.filter(a => !selectedAlunos.has(a.id)));
        setSelectedAlunos(new Set());
    };
    
    // Derived state for the "Select All" checkbox
    const isAllSelected = filteredAlunos.length > 0 && selectedAlunos.size === filteredAlunos.length;
    const isSomeSelected = selectedAlunos.size > 0 && selectedAlunos.size < filteredAlunos.length;
    const isAnySelected = selectedAlunos.size > 0;

    return (
        <div className="grid gap-6">
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon" className="shrink-0">
                    <Link href="/dashboard?profile=administrativo">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Voltar</span>
                    </Link>
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl font-semibold leading-none tracking-tight">Geração de Certificados de Monitoria</h1>
                    <p className="text-sm text-muted-foreground">
                        Gere os certificados para os alunos que finalizaram suas atividades.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                             <CardTitle>Alunos Elegíveis</CardTitle>
                             <CardDescription>
                                Os alunos elegíveis são aqueles cujo relatório final já foi aprovado pelo orientador.
                            </CardDescription>
                        </div>
                        <Button
                            onClick={handleGenerateCertificates}
                            disabled={!isAnySelected}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Gerar Certificado(s) Selecionado(s)
                        </Button>
                    </div>

                </CardHeader>
                <CardContent>
                    {alunos.length === 0 && searchTerm === '' ? (
                         <div className="text-center text-muted-foreground py-10">
                            <Award className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">Nenhum certificado para emitir</h3>
                            <p>Não há certificados pendentes para emissão no momento.</p>
                        </div>
                    ) : (
                        <>
                             <div className="relative mb-4">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Buscar por nome do aluno..."
                                    className="pl-8 w-full sm:w-80"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="overflow-x-auto rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]">
                                                <Checkbox
                                                    checked={isAllSelected ? true : isSomeSelected ? 'indeterminate' : false}
                                                    onCheckedChange={(checked) => handleSelectAll(!!checked)}
                                                    aria-label="Selecionar todos"
                                                />
                                            </TableHead>
                                            <TableHead>Aluno</TableHead>
                                            <TableHead>Processo Concluído</TableHead>
                                            <TableHead>Período Letivo</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredAlunos.length > 0 ? filteredAlunos.map((aluno) => (
                                            <TableRow key={aluno.id} data-state={selectedAlunos.has(aluno.id) ? "selected" : ""}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedAlunos.has(aluno.id)}
                                                        onCheckedChange={(checked) => handleSelectOne(aluno.id, !!checked)}
                                                        aria-label={`Selecionar ${aluno.nome}`}
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">{aluno.nome}</TableCell>
                                                <TableCell>{aluno.processo}</TableCell>
                                                <TableCell>{aluno.periodo}</TableCell>
                                                <TableCell>{aluno.status}</TableCell>
                                            </TableRow>
                                        )) : (
                                            <TableRow>
                                                <TableCell colSpan={5} className="h-24 text-center">
                                                    Nenhum aluno encontrado.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
