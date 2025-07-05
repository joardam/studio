import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Link from "next/link";
import {
  FilePlus2,
  ListTodo,
  Calendar,
  User,
  BookUser,
  CalendarCheck,
  FileCheck2,
  Settings2,
  Users,
  FileClock,
  Clock,
  Award,
  ClipboardList,
  Star,
  Briefcase,
  FileText
} from "lucide-react";
import type { ReactNode } from "react";

const QuickLink = ({ href, icon: Icon, children }: { href: string, icon: React.ElementType, children: ReactNode }) => (
  <Button asChild variant="outline" className="justify-start gap-2 text-left">
    <Link href={href}>
      <Icon className="h-4 w-4 shrink-0" />
      <span>{children}</span>
    </Link>
  </Button>
);

const AlunoDashboard = () => (
  <div className="grid gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral</CardTitle>
        <CardDescription>Seus processos ativos e seus status.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Monitoria</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Aprovada</div>
              <p className="text-xs text-muted-foreground">Parabéns!</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Estágio</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">Pendente</div>
              <p className="text-xs text-muted-foreground">
                Aguardando aprovação
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">TCC</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Em andamento</div>
              <p className="text-xs text-muted-foreground">
                Próxima entrega: 25/12
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Atalhos Rápidos</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <QuickLink href="#" icon={FilePlus2}>Submeter Candidatura</QuickLink>
        <QuickLink href="#" icon={ListTodo}>Acompanhar Candidaturas</QuickLink>
        <QuickLink href="#" icon={Calendar}>Meu Cronograma</QuickLink>
        <QuickLink href="#" icon={User}>Atualizar Cadastro</QuickLink>
      </CardContent>
    </Card>
  </div>
);

const ProfessorDashboard = () => (
  <div className="grid gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral</CardTitle>
        <CardDescription>Solicitações de orientação pendentes.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Você tem <strong className="text-lg">3</strong> novas solicitações de orientação.</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Atalhos Rápidos</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <QuickLink href="#" icon={BookUser}>Visualizar Orientandos</QuickLink>
        <QuickLink href="#" icon={CalendarCheck}>Acompanhar Cronogramas</QuickLink>
        <QuickLink href="#" icon={FileCheck2}>Aprovar/Rejeitar Relatórios</QuickLink>
        <QuickLink href="#" icon={User}>Atualizar Cadastro</QuickLink>
      </CardContent>
    </Card>
  </div>
);

const CoordenadorDashboard = () => (
  <div className="grid gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral</CardTitle>
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
      <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <QuickLink href="#" icon={BookUser}>Visualizar Orientandos</QuickLink>
        <QuickLink href="#" icon={CalendarCheck}>Acompanhar Cronogramas</QuickLink>
        <QuickLink href="#" icon={FileCheck2}>Aprovar Relatórios</QuickLink>
        <QuickLink href="#" icon={Settings2}>Definir Regras do Curso</QuickLink>
        <QuickLink href="#" icon={Users}>Trocar Orientador</QuickLink>
        <QuickLink href="#" icon={FileClock}>Validar Documentos</QuickLink>
        <QuickLink href="#" icon={User}>Atualizar Cadastro</QuickLink>
      </CardContent>
    </Card>
  </div>
);

const AdminDashboard = () => (
  <div className="grid gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral</CardTitle>
        <CardDescription>Processos finalizados aguardando emissão de certificados.</CardDescription>
      </Header>
      <CardContent>
       <p>Você tem <strong className="text-lg">12</strong> certificados para emitir.</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Atalhos Rápidos</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <QuickLink href="#" icon={Clock}>Definir e Ajustar Prazos</QuickLink>
        <QuickLink href="#" icon={Award}>Gerar Certificados</QuickLink>
        <QuickLink href="#" icon={ClipboardList}>Exportar Relatórios</QuickLink>
        <QuickLink href="#" icon={User}>Atualizar Cadastro</QuickLink>
      </CardContent>
    </Card>
  </div>
);

export default function DashboardPage() {
  return (
    <Tabs defaultValue="aluno" className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
        <TabsTrigger value="aluno">Aluno</TabsTrigger>
        <TabsTrigger value="professor">Professor</TabsTrigger>
        <TabsTrigger value="coordenador">Coordenador</TabsTrigger>
        <TabsTrigger value="administrativo">Administrativo</TabsTrigger>
      </TabsList>
      <TabsContent value="aluno" className="mt-4">
        <AlunoDashboard />
      </TabsContent>
      <TabsContent value="professor" className="mt-4">
        <ProfessorDashboard />
      </TabsContent>
      <TabsContent value="coordenador" className="mt-4">
        <CoordenadorDashboard />
      </TabsContent>
      <TabsContent value="administrativo" className="mt-4">
        <AdminDashboard />
      </TabsContent>
    </Tabs>
  );
}
