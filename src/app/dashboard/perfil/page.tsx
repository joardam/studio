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

export default function PerfilPage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleSaveChanges = (e: FormEvent) => {
        e.preventDefault();
        toast({
            title: "Sucesso!",
            description: "Seus dados foram atualizados com sucesso.",
        });
        router.push('/dashboard');
    }

    return (
        <div className="grid gap-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon" className="shrink-0">
                    <Link href="/dashboard">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Voltar</span>
                    </Link>
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl font-semibold leading-none tracking-tight">Atualizar Cadastro</h1>
                    <p className="text-sm text-muted-foreground">Mantenha seus dados pessoais sempre atualizados.</p>
                </div>
            </div>

            <form onSubmit={handleSaveChanges}>
                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informações Pessoais</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="full-name">Nome Completo</Label>
                                <Input id="full-name" defaultValue="Aluno Teste" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Institucional</Label>
                                <Input id="email" type="email" defaultValue="aluno@upe.br" disabled />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Telefone</Label>
                                <Input id="phone" type="tel" placeholder="(81) 99999-9999" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Alterar Senha</CardTitle>
                            <CardDescription>Deixe os campos em branco se não quiser alterar sua senha.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="new-password">Nova Senha</Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                                <Input id="confirm-password" type="password" />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-2">
                        <Button variant="destructive" type="button" onClick={() => router.push('/dashboard')}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-primary-foreground">
                            Salvar Alterações
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
