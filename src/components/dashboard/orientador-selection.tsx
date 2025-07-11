'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, ArrowLeft } from "lucide-react";

const professoresMock = [
  { id: 1, nome: "Prof. Dr. Pedro Henrique", area: "Engenharia de Software, Inteligência Artificial" },
  { id: 2, nome: "Prof. Dr. Maria Clara", area: "Sistemas Distribuídos, Banco de Dados" },
  { id: 3, nome: "Prof. Dr. Vinícius Moura", area: "Cálculo, Álgebra Linear" },
  { id: 4, nome: "Prof. Dr. Carla Dias", area: "Física de Partículas" },
  { id: 5, nome: "Prof. Dr. João Silva", area: "Redes e Segurança da Informação" },
];

export function OrientadorSelection({ tipo, submittedIdParam }: { tipo: string, submittedIdParam?: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedIds, setSubmittedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (submittedIdParam) {
      setSubmittedIds(prevIds => new Set(prevIds).add(Number(submittedIdParam)));
    }
  }, [submittedIdParam]);

  const filteredProfessores = professoresMock.filter((p) =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const title = tipo === "estagio"
    ? "Candidatura para Estágio - Selecione o Orientador"
    : "Candidatura para TCC - Selecione o Orientador";

  return (
    <Card>
      <CardHeader className="flex-row items-start gap-4">
        <Button asChild variant="outline" size="icon" className="shrink-0">
          <Link href="/dashboard/candidaturas/nova">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <div className="flex-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>Filtre os professores por nome ou área de pesquisa.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Filtrar por nome ou área..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid gap-4">
          {filteredProfessores.length > 0 ? (
            filteredProfessores.map((professor) => (
              <div key={professor.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage 
                      src={`https://placehold.co/40x40.png`} 
                      alt={professor.nome} 
                      data-ai-hint="person professional"
                    />
                    <AvatarFallback>{professor.nome.split(' ').map(n => n[0]).slice(1,3).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{professor.nome}</p>
                    <p className="text-sm text-muted-foreground">{professor.area}</p>
                  </div>
                </div>
                {submittedIds.has(professor.id) ? (
                  <Button variant="secondary" disabled>
                    Pedido enviado
                  </Button>
                ) : (
                  <Button asChild>
                    <Link href={`/dashboard/candidaturas/submeter?tipo=${tipo}&id=${professor.id}&professor=${encodeURIComponent(professor.nome)}`}>
                        Solicitar Orientação
                    </Link>
                  </Button>
                )}
              </div>
            ))
          ) : (
             <p className="text-center text-muted-foreground">Nenhum professor encontrado.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
