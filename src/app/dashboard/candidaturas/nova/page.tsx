import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen, Briefcase, GraduationCap } from "lucide-react";

export default function NovaCandidaturaPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Submeter Nova Candidatura</CardTitle>
          <CardDescription>
            Selecione o tipo de processo para o qual deseja se candidatar:
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Link href="/dashboard/candidaturas/nova/monitoria" className="block h-full">
            <Card className="flex flex-col items-center justify-center p-6 text-center hover:bg-accent hover:text-accent-foreground transition-colors h-full">
              <BookOpen className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-semibold">Monitoria</h3>
            </Card>
          </Link>
          <Link href="/dashboard/candidaturas/nova/orientador?tipo=estagio" className="block h-full">
            <Card className="flex flex-col items-center justify-center p-6 text-center hover:bg-accent hover:text-accent-foreground transition-colors h-full">
              <Briefcase className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-semibold">Estágio</h3>
            </Card>
          </Link>
          <Link href="/dashboard/candidaturas/nova/orientador?tipo=tcc" className="block h-full">
            <Card className="flex flex-col items-center justify-center p-6 text-center hover:bg-accent hover:text-accent-foreground transition-colors h-full">
              <GraduationCap className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-semibold">TCC (Trabalho de Conclusão de Curso)</h3>
            </Card>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
