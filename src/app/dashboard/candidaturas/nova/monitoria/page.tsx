import { Suspense } from "react";
import { MonitoriaSelection } from "./monitoria-selection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CandidaturaMonitoriaPage() {
    return (
        <Suspense fallback={<Card><CardHeader><CardTitle>Carregando...</CardTitle></CardHeader><CardContent><div className="h-48 w-full animate-pulse bg-muted/50 rounded-md"></div></CardContent></Card>}>
            <MonitoriaSelection />
        </Suspense>
    )
}
