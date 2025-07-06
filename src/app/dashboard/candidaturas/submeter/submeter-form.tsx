'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, UploadCloud, FileText } from 'lucide-react';

export function SubmeterCandidaturaForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tipo = searchParams.get('tipo');
  const disciplina = searchParams.get('disciplina');
  const professor = searchParams.get('professor');
  const id = searchParams.get('id');
  const [fileName, setFileName] = useState<string | null>(null);

  const getTitle = () => {
    switch (tipo) {
      case 'monitoria':
        return 'Submeter Candidatura para Monitoria';
      case 'estagio':
        return 'Solicitar Orientação de Estágio';
      case 'tcc':
        return 'Solicitar Orientação de TCC';
      default:
        return 'Submeter Candidatura';
    }
  };

  const getDescription = () => {
    switch (tipo) {
      case 'monitoria':
        return 'Anexe os documentos necessários e envie sua carta de motivação.';
      case 'estagio':
      case 'tcc':
        return 'Anexe seu pré-projeto ou outros documentos e envie uma mensagem ao professor.';
      default:
        return 'Preencha os detalhes e anexe os documentos necessários.';
    }
  };
  
  const getBackButtonLink = () => {
    if (tipo === 'monitoria') {
        return '/dashboard/candidaturas/nova/monitoria';
    }
    if (tipo === 'estagio' || tipo === 'tcc') {
        return `/dashboard/candidaturas/nova/orientador?tipo=${tipo}`;
    }
    return '/dashboard/candidaturas/nova';
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  const handleSubmit = () => {
    const backLink = getBackButtonLink();
    router.push(`${backLink}?submittedId=${id}`);
  };


  return (
    <div className="grid gap-6">
        <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon" className="shrink-0">
                <Link href={getBackButtonLink()}>
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Voltar</span>
                </Link>
            </Button>
            <div className="flex-1">
                <h1 className="text-2xl font-semibold leading-none tracking-tight">{getTitle()}</h1>
                <p className="text-sm text-muted-foreground">{getDescription()}</p>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <Card className="flex flex-col items-center justify-center p-6">
                <CardHeader className="items-center text-center">
                    <CardTitle>Anexar Documentos</CardTitle>
                    <CardDescription>Anexe seu histórico escolar, currículo ou pré-projeto (PDF).</CardDescription>
                </CardHeader>
                <CardContent className="w-full">
                    <Label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                        {fileName ? (
                             <>
                                <FileText className="h-12 w-12 text-primary mb-4" />
                                <span className="font-semibold">{fileName}</span>
                                <span className="text-sm text-muted-foreground">Clique para trocar o arquivo</span>
                            </>
                        ) : (
                            <>
                                <UploadCloud className="h-12 w-12 text-muted-foreground mb-4" />
                                <span className="font-semibold">Clique para fazer upload</span>
                                <span className="text-sm text-muted-foreground">ou arraste e solte o arquivo</span>
                            </>
                        )}
                    </Label>
                    <Input id="file-upload" type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
                </CardContent>
            </Card>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Detalhes da Candidatura</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 text-sm">
                       <div className="flex justify-between">
                            <span className="text-muted-foreground">Aluno:</span>
                            <span className="font-medium">Aluno Teste</span>
                       </div>
                       <div className="flex justify-between">
                            <span className="text-muted-foreground">Processo:</span>
                            <span className="font-medium capitalize">{tipo}</span>
                       </div>
                        {disciplina && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Disciplina:</span>
                                <span className="font-medium">{disciplina}</span>
                            </div>
                        )}
                         {professor && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Professor:</span>
                                <span className="font-medium">{professor}</span>
                            </div>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Carta de Motivação / Mensagem</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea placeholder="Escreva aqui sua mensagem, apresente-se e explique por que você é um bom candidato para esta vaga..." rows={6} />
                    </CardContent>
                </Card>
            </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" asChild><Link href={getBackButtonLink()}>Cancelar</Link></Button>
            <Button onClick={handleSubmit}>Submeter Candidatura</Button>
        </div>
    </div>
  );
}
