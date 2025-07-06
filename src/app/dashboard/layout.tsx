'use client';

import { Button } from "@/components/ui/button";
import { CircleUser, GanttChartSquare, LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState('aluno');

  useEffect(() => {
    const storedProfile = sessionStorage.getItem('userProfile');
    if (storedProfile) {
      setProfile(storedProfile);
    }
  }, []);

  const homeUrl = `/dashboard?profile=${profile}`;
  const logoutUrl = `/?profile=${profile}`;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href={homeUrl}
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <GanttChartSquare className="h-6 w-6 text-primary" />
            <span className="sr-only">SGA</span>
          </Link>
          <h1 className="text-lg font-semibold whitespace-nowrap">
            Sistema de Gerenciamento Acadêmico
          </h1>
        </nav>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial" />
          <Button variant="ghost" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
          <Button asChild variant="secondary" size="sm">
            <Link href={logoutUrl}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
