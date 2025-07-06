import { Suspense } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { RelatoriosContent } from '@/components/dashboard/relatorios-content';

export default function AvaliarRelatoriosPage({ searchParams }: { searchParams?: { profile?: string } }) {
    return (
        <Suspense fallback={<Card><CardHeader><CardTitle>Carregando...</CardTitle></CardHeader></Card>}>
            <RelatoriosContent profile={searchParams?.profile} />
        </Suspense>
    );
}
