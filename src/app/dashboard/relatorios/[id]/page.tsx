'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams, useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, File, MessageSquare, Check, X, Send, Clock, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

const relatoriosDetalhesMock = [
  {
    id: 1,
    aluno: 'Carlos Eduardo',
    avatarFallback: 'CE',
    processo: 'Monitoria',
    documento: 'Relatorio_Mensal_Monitoria.pdf',
    dataEnvio: '28/06/2025',
    url: '#',
    comentario: 'Professor, segue o relatório mensal de atividades da monitoria. Cumpri 20h no mês de junho.',
    cargaHoraria: '20 horas',
  },
  {
    id: 2,
    aluno: 'Maria Clara',
    avatarFallback: 'MC',
    processo: 'Estágio',
    documento: 'Relatorio_Parcial_2.pdf',
    dataEnvio: '30/05/2025',
    url: '#',
    comentario: 'Segue o segundo relatório parcial do estágio. Gostaria de agendar uma reunião para discutir os próximos passos.',
    cargaHoraria: '120 horas',
  },
  {
    id: 3,
    aluno: 'João Silva',
    avatarFallback: 'JS',
    processo: 'Monitoria',
    documento: 'Relatorio_Final_Monitoria.pdf',
    dataEnvio: '01/07/2025',
    url: '#',
    comentario: 'Anexo o relatório final com todas as atividades desempenhadas durante o semestre.',
    cargaHoraria: '100 horas totais',
  },
];


export default function DetalhesRelatorioPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const relatorio = relatoriosDetalhesMock.find((r) => r.id === parseInt(params.id, 10));

  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  if (!relatorio) {
    notFound();
  }

  const handleDecision = (decision: 'approve' | 'reject') => {
    if (decision === 'reject' && !feedback.trim()) {
        setError('A justificativa é obrigatória para rejeitar o relatório.');
        return;
    }
    setError('');
    
    toast({
        title: "Sucesso!",
        description: decision === 'approve' 
            ? "Relatório aprovado com sucesso."
            : "O relatório foi rejeitado e o aluno notificado para realizar as correções."
    });
    
    const profile = searchParams.get('profile');
    const redirectUrl = profile ? `/dashboard/relatorios?profile=${profile}` : '/dashboard/relatorios';
    router.push(redirectUrl);
  }

  const handleCancelAction = () => {
    setAction(null);
    setFeedback('');
    setError('');
  }

  const profile = searchParams.get('profile');
  const backUrl = profile ? `/dashboard/relatorios?profile=${profile}` : '/dashboard/relatorios';

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon" className="shrink-0">
          <Link href={backUrl}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Analisar Relatório</h1>
          <p className="text-sm text-muted-foreground">Avalie o documento enviado por {relatorio.aluno}.</p>
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
                 <p className="mt-4 font-semibold text-lg">{relatorio.documento}</p>
                 <p className="text-sm text-muted-foreground">Visualização do PDF apareceria aqui.</p>
                 <Button className="mt-4" asChild>
                    <a href={relatorio.url} target="_blank" rel="noopener noreferrer">Abrir Documento em Nova Aba</a>
                 </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 content-start">
          <Card>
            <CardHeader>
              <CardTitle>Informações</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://placehold.co/40x40.png`} alt={relatorio.aluno} data-ai-hint="person" />
                    <AvatarFallback>{relatorio.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div>
                    <p className="font-semibold">{relatorio.aluno}</p>
                    <p className="text-xs text-muted-foreground">Processo de {relatorio.processo}</p>
                    </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2"><Clock className="h-4 w-4"/> Carga Horária:</span>
                <span className="font-medium">{relatorio.cargaHoraria}</span>
              </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comentário do Aluno
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground italic">"{relatorio.comentario}"</p>
            </CardContent>
          </Card>
          
           <Card>
            <CardHeader>
              <CardTitle>Análise e Parecer</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                {!action ? (
                     <div className="grid grid-cols-2 gap-2">
                        <Button variant="destructive" onClick={() => setAction('reject')}>
                            <X className="mr-2 h-4 w-4" /> Rejeitar
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700" onClick={() => setAction('approve')}>
                            <Check className="mr-2 h-4 w-4" /> Aprovar
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        <Label htmlFor="feedback">
                           {action === 'approve' ? 'Feedback (Opcional)' : 'Justificativa e Orientações para Correção (Obrigatório)'}
                        </Label>
                        <Textarea 
                            id="feedback"
                            placeholder="Escreva seu parecer aqui..." 
                            rows={4}
                            value={feedback}
                            onChange={(e) => {
                                setFeedback(e.target.value)
                                if(error) setError('');
                            }}
                            className={error ? 'border-destructive' : ''}
                        />
                        {error && <p className="text-xs text-destructive">{error}</p>}
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" onClick={handleCancelAction}>Cancelar</Button>
                            <Button onClick={() => handleDecision(action)}>
                                <Send className="mr-2 h-4 w-4" /> Confirmar
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
