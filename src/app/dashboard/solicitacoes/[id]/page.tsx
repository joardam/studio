'use client';

import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, FileText, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';


const solicitacoesMock = [
  { 
    id: 1, 
    aluno: "Ana Beatriz", 
    tipo: "TCC", 
    avatarFallback: 'AB', 
    documentos: [{ nome: 'Pre_projeto_TCC_Ana.pdf', url: '#' }], 
    mensagem: "Prezado Prof. Dr. [Seu Nome], gostaria de submeter meu pré-projeto de TCC para sua avaliação. Acredito que minha proposta de pesquisa se alinha com sua área de especialização em Inteligência Artificial e ficaria honrada em tê-lo como meu orientador."
  },
  { 
    id: 2, 
    aluno: "Carlos Eduardo", 
    tipo: "Estágio", 
    avatarFallback: 'CE',
    documentos: [{ nome: 'Proposta_Estagio_Carlos.pdf', url: '#' }, { nome: 'Curriculo_Carlos.pdf', url: '#' }], 
    mensagem: "Olá Prof. Dr. [Seu Nome], estou buscando um orientador para meu estágio obrigatório e gostaria de saber se teria interesse em me orientar. Anexei meu currículo e uma breve proposta. Obrigado."
  },
  { 
    id: 3, 
    aluno: "Daniela Faria", 
    tipo: "TCC", 
    avatarFallback: 'DF',
    documentos: [{ nome: 'Pre_projeto_TCC_Daniela.pdf', url: '#' }], 
    mensagem: "Boa tarde, Prof. Dr. [Seu Nome]. Anexo meu pré-projeto para sua consideração. Tenho grande interesse na sua linha de pesquisa sobre Sistemas Distribuídos e gostaria de desenvolver meu TCC sob sua orientação."
  },
];

export default function DetalhesSolicitacaoPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { toast } = useToast();
  const solicitacao = solicitacoesMock.find((s) => s.id === parseInt(params.id, 10));

  if (!solicitacao) {
    notFound();
  }

  const handleDecision = () => {
    toast({
        title: "Sucesso!",
        description: "Notificação enviada para o aluno."
    });
    router.back();
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="shrink-0" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Analisar Solicitação</h1>
          <p className="text-sm text-muted-foreground">Avalie os documentos e a mensagem do aluno.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Mensagem do Aluno
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{solicitacao.mensagem}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Documentos Enviados</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {solicitacao.documentos.map((doc, index) => (
                <Button key={index} variant="outline" className="justify-start" asChild>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2 h-4 w-4" />
                        {doc.nome}
                    </a>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Aluno</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={`https://placehold.co/40x40.png`} alt={solicitacao.aluno} data-ai-hint="person" />
                  <AvatarFallback>{solicitacao.avatarFallback}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{solicitacao.aluno}</p>
                  <p className="text-sm text-muted-foreground">Solicitação de {solicitacao.tipo}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Análise e Parecer</CardTitle>
              <CardDescription>Adicione uma justificativa (opcional para aprovação, obrigatório para rejeição).</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Textarea placeholder="Escreva sua justificativa aqui..." rows={5} />
              <div className="grid grid-cols-2 gap-2">
                <Button variant="destructive" onClick={handleDecision}>Rejeitar</Button>
                <Button onClick={handleDecision}>Aprovar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
