'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, File, User, Calendar, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const documentosPendentesMock = [
    {
        id: 1,
        aluno: 'Gabriela Lima',
        processo: 'Estágio Obrigatório',
        documento: 'Termo de Compromisso.pdf',
        prazoFinal: '2025-06-15',
        dataEnvio: '2025-06-18',
        url: '#',
    },
    {
        id: 2,
        aluno: 'Roberto Carlos',
        processo: 'TCC',
        documento: 'Formulário de Defesa.pdf',
        prazoFinal: '2025-07-01',
        dataEnvio: '2025-07-02',
        url: '#',
    },
    {
        id: 3,
        aluno: 'Fernanda Souza',
        processo: 'Monitoria',
        documento: 'Relatório Final de Monitoria.pdf',
        prazoFinal: '2025-07-10',
        dataEnvio: '2025-07-15',
        url: '#',
    },
];

export default function DetalhesValidacaoDocPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const { toast } = useToast();
    const documento = documentosPendentesMock.find((d) => d.id === parseInt(params.id, 10));

    const [justificativa, setJustificativa] = useState('');

    if (!documento) {
        notFound();
    }

    const handleValidation = () => {
        toast({
            title: "Sucesso!",
            description: "Documento validado com sucesso. A pendência do aluno foi removida.",
            className: "bg-green-100 border-green-300 text-green-800"
        });
        router.push('/dashboard/validar-documentos');
    };

    return (
        <div className="grid gap-6">
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon" className="shrink-0">
                    <Link href="/dashboard/validar-documentos">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Voltar</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-semibold">Analisar Documento Fora do Prazo</h1>
                    <p className="text-sm text-muted-foreground">Avalie o documento e a justificativa para regularizar a situação.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 grid gap-6">
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle>Visualizador de Documento</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col items-center justify-center bg-muted/20 rounded-b-lg p-6 text-center">
                            <File className="h-16 w-16 text-muted-foreground" />
                            <p className="mt-4 font-semibold text-lg">{documento.documento}</p>
                            <p className="text-sm text-muted-foreground">Visualização do PDF apareceria aqui.</p>
                            <Button className="mt-4" asChild>
                                <a href={documento.url} target="_blank" rel="noopener noreferrer">Abrir Documento em Nova Aba</a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 content-start">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informações da Submissão</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-3 text-sm">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="font-semibold">{documento.aluno}</p>
                                    <p className="text-xs text-muted-foreground">{documento.processo}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground flex items-center gap-2"><Calendar className="h-4 w-4" /> Prazo Final:</span>
                                <span className="font-medium">{format(parseISO(documento.prazoFinal), "dd/MM/yyyy")}</span>
                            </div>
                            <div className="flex justify-between items-center text-destructive">
                                <span className="flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Data do Envio:</span>
                                <span className="font-bold">{format(parseISO(documento.dataEnvio), "dd/MM/yyyy")}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Análise e Validação</CardTitle>
                            <CardDescription>Esta ação irá regularizar a pendência do aluno, contornando a regra de rejeição automática.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="justificativa" className="font-semibold">Justificativa para Validação do Atraso (Obrigatório)</Label>
                                <Textarea
                                    id="justificativa"
                                    placeholder="Ex: Atraso justificado por atestado médico apresentado pelo aluno..."
                                    rows={5}
                                    value={justificativa}
                                    onChange={(e) => setJustificativa(e.target.value)}
                                />
                            </div>
                            <Button
                                onClick={handleValidation}
                                disabled={!justificativa.trim()}
                                className="w-full"
                            >
                                Validar Documento e Regularizar Pendência
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}