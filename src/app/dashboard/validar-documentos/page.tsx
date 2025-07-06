'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileClock, User, Calendar, AlertTriangle } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const documentosPendentesMock = [
    {
        id: 1,
        aluno: 'Gabriela Lima',
        avatarFallback: 'GL',
        processo: 'Estágio Obrigatório',
        documento: 'Termo de Compromisso',
        prazoFinal: '2025-06-15',
        dataEnvio: '2025-06-18',
    },
    {
        id: 2,
        aluno: 'Roberto Carlos',
        avatarFallback: 'RC',
        processo: 'TCC',
        documento: 'Formulário de Defesa',
        prazoFinal: '2025-07-01',
        dataEnvio: '2025-07-02',
    },
    {
        id: 3,
        aluno: 'Fernanda Souza',
        avatarFallback: 'FS',
        processo: 'Monitoria',
        documento: 'Relatório Final de Monitoria',
        prazoFinal: '2025-07-10',
        dataEnvio: '2025-07-15',
    },
];

export default function ValidarDocumentosPage() {
    const [documentos] = useState(documentosPendentesMock);

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
                    <CardTitle>Validação de Documentos Fora do Prazo</CardTitle>
                    <CardDescription>
                        Analise e valide documentos submetidos após o prazo final. Sua aprovação é necessária para regularizar a pendência do aluno.
                    </CardDescription>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Documentos Aguardando Validação</CardTitle>
                </CardHeader>
                <CardContent>
                    {documentos.length > 0 ? (
                        <div className="grid gap-4">
                            {documentos.map((doc) => (
                                <Link key={doc.id} href={`/dashboard/validar-documentos/${doc.id}`} className="block">
                                    <Card className="hover:bg-accent/50 transition-colors">
                                        <CardContent className="p-4 grid md:grid-cols-[1fr_auto] items-center gap-4">
                                            <div className="grid gap-2">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-semibold">{doc.aluno}</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    <span className='font-medium text-foreground'>{doc.documento}</span> ({doc.processo})
                                                </p>
                                                 <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        <span>Prazo Final: {format(parseISO(doc.prazoFinal), "dd/MM/yyyy", { locale: ptBR })}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-destructive font-medium">
                                                         <AlertTriangle className="h-3 w-3" />
                                                        <span>Enviado em: {format(parseISO(doc.dataEnvio), "dd/MM/yyyy", { locale: ptBR })}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">Analisar Documento</Button>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground py-10">
                            <FileClock className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">Tudo em dia!</h3>
                            <p>Não há documentos com envio fora do prazo aguardando validação no momento.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}