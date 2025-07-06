import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonitoriaSelection } from "@/components/dashboard/monitoria-selection";

export default function CandidaturaMonitoriaPage({ searchParams }: { searchParams?: { submittedId?: string } }) {
    return (
        <Suspense fallback={<Card><CardHeader><CardTitle>Carregando...</CardTitle></CardHeader><CardContent><div className="h-48 w-full"></div></CardContent></Card>}>
            <MonitoriaSelection submittedIdParam={searchParams?.submittedId} />
        </Suspense>
    )
}
