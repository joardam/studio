'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users, User } from "lucide-react";

const disciplinasMock = [
  { id: 1, nome: "Cálculo Vetorial", professor: "Prof. Dr. Vinícius Moura", vagas: 2 },
  { id: 2, nome: "Física Quântica", professor: "Prof. Dr. Carla Dias", vagas: 1 },
  { id: 3, nome: "Inteligência Artificial", professor: "Prof. Dr. Pedro Henrique", vagas: 3 },
  { id: 4, nome: "Engenharia de Software I", professor: "Prof. Dr. Maria Clara", vagas: 2 },
  { id: 5, nome: "Redes de Computadores", professor: "Prof. Dr. João Silva", vagas: 1 },
];

export default function CandidaturaMonitoriaPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDisciplinas = disciplinasMock.filter((d) =>
    d.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidatura para Monitoria</CardTitle>
        <CardDescription>Selecione a disciplina desejada.</CardDescription>
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
                <Button>Candidatar-se</Button>
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
