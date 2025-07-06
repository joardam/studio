'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users, User, ArrowLeft } from "lucide-react";

const disciplinasMock = [
  { id: 1, nome: "Cálculo Vetorial", professor: "Prof. Dr. Vinícius Moura", vagas: 2 },
  { id: 2, nome: "Física Quântica", professor: "Prof. Dr. Carla Dias", vagas: 1 },
  { id: 3, nome: "Inteligência Artificial", professor: "Prof. Dr. Pedro Henrique", vagas: 3 },
  { id: 4, nome: "Engenharia de Software I", professor: "Prof. Dr. Maria Clara", vagas: 2 },
  { id: 5, nome: "Redes de Computadores", professor: "Prof. Dr. João Silva", vagas: 1 },
];

export function MonitoriaSelection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedIds, setSubmittedIds] = useState<Set<number>>(new Set());
  const searchParams = useSearchParams();

  useEffect(() => {
    const submittedId = searchParams.get("submittedId");
    if (submittedId) {
      setSubmittedIds(prevIds => new Set(prevIds).add(Number(submittedId)));
    }
  }, [searchParams]);

  const filteredDisciplinas = disciplinasMock.filter((d) =>
    d.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <CardTitle>Candidatura para Monitoria</CardTitle>
          <CardDescription>Selecione a disciplina desejada.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Filtrar disciplinas pelo nome..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid gap-4">
          {filteredDisciplinas.length > 0 ? (
            filteredDisciplinas.map((disciplina) => (
              <div key={disciplina.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="grid gap-1">
                  <p className="font-semibold">{disciplina.nome}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{disciplina.professor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{disciplina.vagas} Vagas</span>
                  </div>
                </div>
                {submittedIds.has(disciplina.id) ? (
                  <Button variant="secondary" disabled>
                    Pedido enviado
                  </Button>
                ) : (
                  <Button asChild>
                    <Link href={`/dashboard/candidaturas/submeter?tipo=monitoria&id=${disciplina.id}&disciplina=${encodeURIComponent(disciplina.nome)}&professor=${encodeURIComponent(disciplina.professor)}`}>
                      Candidatar-se
                    </Link>
                  </Button>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground">Nenhuma disciplina encontrada.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
