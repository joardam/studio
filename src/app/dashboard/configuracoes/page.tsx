'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { FormEvent } from 'react';
import { useState } from 'react';

export default function ConfiguracoesPage() {
    const router = useRouter();
    const { toast } = useToast();

    // Mock initial data
    const [estagioObrigatorio, setEstagioObrigatorio] = useState('75');
    const [estagioNaoObrigatorio, setEstagioNaoObrigatorio] = useState('50');
    const [maxMonitores, setMaxMonitores] = useState('5');

    const handleSave = (e: FormEvent) => {
        e.preventDefault();
        // Simple validation check if values are numbers
        if (isNaN(Number(estagioObrigatorio)) || isNaN(Number(estagioNaoObrigatorio)) || isNaN(Number(maxMonitores)) || !estagioObrigatorio || !estagioNaoObrigatorio || !maxMonitores) {
             toast({
                title: "Erro de Validação",
                description: "Valor inválido. Por favor, insira um número.",
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Sucesso!",
            description: "As regras do curso foram salvas com sucesso.",
        });
        router.push('/dashboard?profile=coordenador');
    };

    return (
        <div className="grid gap-6 max-w-4xl mx-auto">
             <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon" className="shrink-0">
                    <Link href="/dashboard?profile=coordenador">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Voltar</span>
                    </Link>
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl font-semibold leading-none tracking-tight">Configurações e Regras do Curso</h1>
                    <p className="text-sm text-muted-foreground">
                        Ajuste os parâmetros que regulam os processos de estágio e monitoria para o seu curso. As alterações salvas aqui terão efeito imediato nas validações do sistema.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSave}>
                <div className="grid gap-8">
                     <Card>
                        <CardHeader>
                            <CardTitle>Regras de Estágio</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="estagio-obrigatorio" className="font-semibold">% da carga horária mínima para Estágio Obrigatório</Label>
                                <Input 
                                    id="estagio-obrigatorio" 
                                    type="number" 
                                    value={estagioObrigatorio}
                                    onChange={(e) => setEstagioObrigatorio(e.target.value)}
                                    placeholder="Ex: 75"
                                    required
                                />
                                <p className="text-xs text-muted-foreground">
                                    Define o percentual mínimo do curso que o aluno deve ter concluído para se candidatar ao estágio obrigatório (Regra RN-14).
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="estagio-nao-obrigatorio" className="font-semibold">% da carga horária mínima para Estágio Não-Obrigatório</Label>
                                <Input 
                                    id="estagio-nao-obrigatorio" 
                                    type="number" 
                                    value={estagioNaoObrigatorio}
                                    onChange={(e) => setEstagioNaoObrigatorio(e.target.value)}
                                    placeholder="Ex: 50"
                                    required
                                />
                                <p className="text-xs text-muted-foreground">
                                    Define o percentual mínimo do curso para o registro de estágio não-obrigatório (Regra RN-14).
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>Regras de Monitoria</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                           <div className="grid gap-2">
                                <Label htmlFor="max-monitores" className="font-semibold">Nº máximo de orientandos de monitoria por professor</Label>
                                <Input 
                                    id="max-monitores" 
                                    type="number"
                                    value={maxMonitores}
                                    onChange={(e) => setMaxMonitores(e.target.value)}
                                    placeholder="Ex: 5"
                                    required
                                />
                                <p className="text-xs text-muted-foreground">
                                    Define o limite de alunos que um professor pode orientar em monitorias simultaneamente (Regra RN-13).
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button type="submit">Salvar Regras</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
