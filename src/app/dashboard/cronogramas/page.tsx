import { Suspense } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { CronogramasContent } from '@/components/dashboard/cronogramas-content';

export default function CronogramasProfessorPage({ searchParams }: { searchParams?: { profile?: string } }) {
    return (
        <Suspense fallback={<Card><CardHeader><CardTitle>Carregando...</CardTitle></CardHeader></Card>}>
            <CronogramasContent profile={searchParams?.profile} />
        </Suspense>
    )
}
