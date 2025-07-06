'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Search, UserSwitch, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock Data
const orientandosMock = [
  { id: 1, aluno: 'Vinícius de Moura', processo: 'TCC', orientador: 'Prof. Dr. Pedro Henrique', status: 'Em Andamento' },
  { id: 2, aluno: 'Maria Clara', processo: 'Estágio', orientador: 'Prof. Dr. Maria Clara', status: 'Com Pendências' },
  { id: 3, aluno: 'João Silva', processo: 'Monitoria', orientador: 'Prof. Dr. João Silva', status: 'Finalizado' },
  { id: 4, aluno: 'Ana Beatriz', processo: 'TCC', orientador: 'Prof. Dr. Pedro Henrique', status: 'Aguardando Relatório' },
  { id: 5, aluno: 'Carlos Eduardo', processo: 'Estágio', orientador: 'Prof. Dr. Maria Clara', status: 'Em Andamento' },
  { id: 6, aluno: 'Daniela Faria', processo: 'TCC', orientador: 'Prof. Dr. Vinícius Moura', status: 'Em Andamento' },
  { id: 7, aluno: 'Eduarda Lima', processo: 'Monitoria', orientador: 'Prof. Dr. Carla Dias', status: 'Com Pendências'},
];

const professoresMock = [
    { id: 1, nome: "Prof. Dr. Pedro Henrique" },
    { id: 2, nome: "Prof. Dr. Maria Clara" },
    { id: 3, nome: "Prof. Dr. Vinícius Moura" },
    { id: 4, nome: "Prof. Dr. Carla Dias" },
    { id: 5, nome: "Prof. Dr. João Silva" },
];

type Orientando = typeof orientandosMock[0];

export default function GerenciamentoOrientandosPage() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [processoFilter, setProcessoFilter] = useState('Todos os Processos');
    const [statusFilter, setStatusFilter] = useState('Todos os Status');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAluno, setSelectedAluno] = useState<Orientando | null>(null);

    const handleClearFilters = () => {
        setSearchTerm('');
        setProcessoFilter('Todos os Processos');
        setStatusFilter('Todos os Status');
    };

    const filteredOrientandos = orientandosMock.filter(orientando => {
        const matchesSearch = orientando.aluno.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesProcesso = processoFilter === 'Todos os Processos' || orientando.processo === processoFilter;
        const matchesStatus = statusFilter === 'Todos os Status' || orientando.status === statusFilter;
        return matchesSearch && matchesProcesso && matchesStatus;
    });

    const handleOpenModal = (aluno: Orientando) => {
        setSelectedAluno(aluno);
        setIsModalOpen(true);
    };

    const handleConfirmTroca = () => {
        // Here would be the logic to submit the change
        toast({
            title: "Sucesso!",
            description: `Solicitação de troca de orientador para ${selectedAluno?.aluno} foi enviada.`,
        });
        setIsModalOpen(false);
        setSelectedAluno(null);
    }

    return (
        <div className="grid gap-6">
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon" className="shrink-0">
                    <Link href="/dashboard?profile=coordenador">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Voltar</span>
                    </Link>
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl font-semibold">Gerenciamento de Orientandos</h1>
                    <p className="text-sm text-muted-foreground">
                        Visualize e gerencie todos os alunos em processos de monitoria, estágio e TCC do curso.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Filtros</CardTitle>
                    <CardDescription>Utilize os filtros para refinar sua busca.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                        <div className="relative sm:col-span-2">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Buscar por nome do aluno..."
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
                                <SelectItem value="Todos os Processos">Todos os Processos</SelectItem>
                                <SelectItem value="Monitoria">Monitoria</SelectItem>
                                <SelectItem value="Estágio">Estágio</SelectItem>
                                <SelectItem value="TCC">TCC</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filtrar por Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Todos os Status">Todos os Status</SelectItem>
                                <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                                <SelectItem value="Aguardando Relatório">Aguardando Relatório</SelectItem>
                                <SelectItem value="Com Pendências">Com Pendências</SelectItem>
                                <SelectItem value="Finalizado">Finalizado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="flex justify-end mt-4">
                        <Button variant="outline" onClick={handleClearFilters}>Limpar Filtros</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Lista de Alunos</CardTitle>
                </CardHeader>
                <CardContent>
                    {orientandosMock.length === 0 ? (
                         <div className="text-center text-muted-foreground py-10">
                            Ainda não há alunos em processos de orientação neste curso.
                        </div>
                    ) : filteredOrientandos.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Aluno</TableHead>
                                        <TableHead>Processo</TableHead>
                                        <TableHead>Orientador Atual</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredOrientandos.map((aluno) => (
                                        <TableRow key={aluno.id}>
                                            <TableCell className="font-medium">{aluno.aluno}</TableCell>
                                            <TableCell>{aluno.processo}</TableCell>
                                            <TableCell>{aluno.orientador}</TableCell>
                                            <TableCell>{aluno.status}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={`/dashboard/orientandos/${aluno.id}`}>
                                                            <Eye className="h-4 w-4" />
                                                            <span className="sr-only">Ver Detalhes</span>
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleOpenModal(aluno)}>
                                                        <UserSwitch className="h-4 w-4" />
                                                        <span className="sr-only">Trocar Orientador</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground py-10">
                            Nenhum resultado encontrado para os filtros aplicados.
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Trocar Orientador</DialogTitle>
                        <DialogDescription>
                           Selecione um novo orientador para <strong>{selectedAluno?.aluno}</strong> e justifique a alteração.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                           <p className="text-sm"><strong>Orientador Atual:</strong> {selectedAluno?.orientador}</p>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="novo-orientador">Novo Orientador</Label>
                            <Select>
                                <SelectTrigger id="novo-orientador">
                                    <SelectValue placeholder="Selecione um professor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {professoresMock.map(p => (
                                        <SelectItem key={p.id} value={p.nome}>{p.nome}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="justificativa">Justificativa da Troca (Obrigatório)</Label>
                            <Textarea id="justificativa" placeholder="Descreva o motivo da troca de orientador..." required />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button onClick={handleConfirmTroca}>Confirmar Troca</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
