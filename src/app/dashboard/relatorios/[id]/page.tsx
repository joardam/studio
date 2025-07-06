'use client';

import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, FileText, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

const relatoriosDetalhesMock = [
  {
    id: 1,
    aluno: 'Vinícius de Moura',
    avatarFallback: 'VM',
    processo: 'TCC',
    documento: 'Artigo_v2.pdf',
    dataEnvio: '25/05/2025',
    url: '#',
    comentario: 'Professor, segue a segunda versão do artigo com os ajustes solicitados na metodologia. Adicionei mais detalhes sobre o dataset e os resultados preliminares.'
  },
  {
    id: 2,
    aluno: 'Maria Clara',
    avatarFallback: 'MC',
    processo: 'Estágio',
    documento: 'Relatorio_Parcial_2.pdf',
    dataEnvio: '30/05/2025',
    url: '#',
    comentario: 'Segue o segundo relatório parcial do estágio. Gostaria de agendar uma reunião para discutir os próximos passos.'
  },
  {
    id: 3,
    aluno: 'Ana Beatriz',
    avatarFallback: 'AB',
    processo: 'TCC',
    documento: 'Capitulo_1.pdf',
    dataEnvio: '26/06/2025',
    url: '#',
    comentario: 'Olá, professor. Anexo o primeiro capítulo do TCC para sua avaliação. Aguardo seu feedback.'
  },
];


export default function DetalhesRelatorioPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { toast } = useToast();
  const relatorio = relatoriosDetalhesMock.find((r) => r.id === parseInt(params.id, 10));

  if (!relatorio) {
    notFound();
  }

  const handleDecision = (action: 'aprovado' | 'rejeitado') => {
    toast({
        title: "Sucesso!",
        description: `Relatório ${action} e notificação enviada para o aluno.`
    });
    router.push('/dashboard/relatorios');
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon" className="shrink-0">
          <Link href="/dashboard/relatorios">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Analisar Relatório</h1>
          <p className="text-sm text-muted-foreground">Avalie o documento enviado por {relatorio.aluno}.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comentário do Aluno
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{relatorio.comentario}</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Análise e Feedback</CardTitle>
              <CardDescription>Escreva seu parecer sobre o documento. Ele será enviado ao aluno.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Textarea placeholder="Seu feedback aqui..." rows={5} />
              <div className="grid grid-cols-2 gap-2">
                <Button variant="destructive" onClick={() => handleDecision('rejeitado')}>Rejeitar com Feedback</Button>
                <Button onClick={() => handleDecision('aprovado')}>Aprovar Relatório</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 content-start">
          <Card>
            <CardHeader>
              <CardTitle>Informações</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={`https://placehold.co/40x40.png`} alt={relatorio.aluno} data-ai-hint="person" />
                  <AvatarFallback>{relatorio.avatarFallback}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{relatorio.aluno}</p>
                  <p className="text-sm text-muted-foreground">Processo de {relatorio.processo}</p>
                </div>
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Documento Enviado</CardTitle>
            </CardHeader>
            <CardContent>
                <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={relatorio.url} target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2 h-4 w-4" />
                        {relatorio.documento}
                    </a>
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
