import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrientadorSelection } from "@/components/dashboard/orientador-selection";

export default function CandidaturaOrientadorPage({ searchParams }: { searchParams?: { tipo?: string, submittedId?: string } }) {
  const tipo = searchParams?.tipo || "tcc";
  const submittedId = searchParams?.submittedId;

  return (
    <Suspense fallback={<Card><CardHeader><CardTitle>Carregando...</CardTitle></CardHeader><CardContent><div className="h-48 w-full"></div></CardContent></Card>}>
      <OrientadorSelection tipo={tipo} submittedIdParam={submittedId} />
    </Suspense>
  )
}
