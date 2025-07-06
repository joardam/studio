import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Settings2,
  Users,
  FileClock,
  Clock,
  Award,
  ClipboardList,
  CalendarCheck,
  FileCheck2,
} from "lucide-react";
import type { ReactNode } from "react";
import { AlunoDashboard } from "@/components/dashboard/aluno-dashboard";
import { ProfessorDashboard } from "@/components/dashboard/professor-dashboard";

const QuickLink = ({ href, icon: Icon, children }: { href: string, icon: React.ElementType, children: ReactNode }) => {
  return (
    <Button asChild variant="outline" className="justify-start gap-2 text-left">
      <Link href={href}>
        <Icon className="h-4 w-4 shrink-0" />
        <span>{children}</span>
      </Link>
    </Button>
  );
};

const CoordenadorDashboard = ({ profile }: { profile: string }) => {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral do Coordenador</CardTitle>
          <CardDescription>Suas pendências como coordenador e professor.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="text-muted-foreground">Pendências (Professor)</p>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-muted-foreground">Pendências (Coordenador)</p>
            <p className="text-2xl font-bold">5</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Atalhos Rápidos</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <QuickLink href="/dashboard/gerenciamento-orientandos" icon={Users}>Gerenciar Orientandos</QuickLink>
          <QuickLink href={`/dashboard/cronogramas?profile=${profile}`} icon={CalendarCheck}>Acompanhar Cronogramas</QuickLink>
          <QuickLink href="/dashboard/relatorios?profile=coordenador" icon={FileCheck2}>Aprovar Relatórios</QuickLink>
          <QuickLink href="/dashboard/configuracoes" icon={Settings2}>Definir Regras do Curso</QuickLink>
          <QuickLink href="/dashboard/validar-documentos" icon={FileClock}>Validar Documentos</QuickLink>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral do Admin</CardTitle>
          <CardDescription>Processos finalizados aguardando emissão de certificados.</CardDescription>
        </CardHeader>
        <CardContent>
         <p>Você tem <strong className="text-lg">12</strong> certificados para emitir.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Atalhos Rápidos</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <QuickLink href="/dashboard/prazos" icon={Clock}>Definir e Ajustar Prazos</QuickLink>
          <QuickLink href="/dashboard/certificados" icon={Award}>Gerar Certificados</QuickLink>
          <QuickLink href="/dashboard/exportar-relatorios" icon={ClipboardList}>Exportar Relatórios</QuickLink>
        </CardContent>
      </Card>
    </div>
  );
};

export default function DashboardPage({ searchParams }: { searchParams?: { profile?: string } }) {
  const profile = searchParams?.profile || 'aluno';

  const renderDashboard = () => {
    switch (profile) {
      case 'professor':
        return <ProfessorDashboard profile={profile} />;
      case 'coordenador':
        return <CoordenadorDashboard profile={profile} />;
      case 'administrativo':
        return <AdminDashboard />;
      case 'aluno':
      default:
        return <AlunoDashboard />;
    }
  };

  return (
    <div className="w-full">
      {renderDashboard()}
    </div>
  );
}
