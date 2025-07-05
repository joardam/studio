'use client';

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";

const professoresMock = [
  { id: 1, nome: "Prof. Dr. Pedro Henrique", area: "Engenharia de Software, Inteligência Artificial" },
  { id: 2, nome: "Prof. Dr. Maria Clara", area: "Sistemas Distribuídos, Banco de Dados" },
  { id: 3, nome: "Prof. Dr. Vinícius Moura", area: "Cálculo, Álgebra Linear" },
  { id: 4, nome: "Prof. Dr. Carla Dias", area: "Física de Partículas" },
  { id: 5, nome: "Prof. Dr. João Silva", area: "Redes e Segurança da Informação" },
];

function OrientadorSelection() {
  const searchParams = useSearchParams();
  const tipo = searchParams.get("tipo") || "tcc";
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProfessores = professoresMock.filter((p) =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const title = tipo === "estagio"
    ? "Candidatura para Estágio - Selecione o Orientador"
    : "Candidatura para TCC - Selecione o Orientador";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Filtre os professores por nome ou área de pesquisa.</CardDescription>
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
                <Button>Solicitar Orientação</Button>
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

export default function CandidaturaOrientadorPage() {
  return (
    <Suspense fallback={<Card><CardHeader><CardTitle>Carregando...</CardTitle></CardHeader><CardContent><div className="h-48 w-full"></div></CardContent></Card>}>
      <OrientadorSelection />
    </Suspense>
  )
}
