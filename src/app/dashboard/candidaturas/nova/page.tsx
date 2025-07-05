import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen, Briefcase, GraduationCap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NovaCandidaturaPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="flex-row items-start gap-4">
          <Button asChild variant="outline" size="icon" className="shrink-0">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Link>
          </Button>
          <div className="flex-1">
            <CardTitle>Submeter Nova Candidatura</CardTitle>
            <CardDescription>
              Selecione o tipo de processo para o qual deseja se candidatar:
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Link
            href="/dashboard/candidaturas/nova/monitoria"
            className="flex flex-col items-center justify-center p-6 text-center hover:bg-accent hover:text-accent-foreground transition-colors h-full rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <BookOpen className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold">Monitoria</h3>
          </Link>
          <Link
            href="/dashboard/candidaturas/nova/orientador?tipo=estagio"
            className="flex flex-col items-center justify-center p-6 text-center hover:bg-accent hover:text-accent-foreground transition-colors h-full rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <Briefcase className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold">Estágio</h3>
          </Link>
          <Link
            href="/dashboard/candidaturas/nova/orientador?tipo=tcc"
            className="flex flex-col items-center justify-center p-6 text-center hover:bg-accent hover:text-accent-foreground transition-colors h-full rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <GraduationCap className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold">TCC (Trabalho de Conclusão de Curso)</h3>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
