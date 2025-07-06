import { Suspense } from 'react';
import { RelatoriosContent } from './relatorios-content';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AvaliarRelatoriosPage() {
    return (
        <Suspense fallback={<Card><CardHeader><CardTitle>Carregando...</CardTitle></CardHeader><CardContent><div className="h-96 w-full animate-pulse bg-muted/50 rounded-md"></div></CardContent></Card>}>
            <RelatoriosContent />
        </Suspense>
    );
}
