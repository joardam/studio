import { Suspense } from 'react';
import { SubmeterCandidaturaForm } from './submeter-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SubmeterCandidaturaPage() {
    return (
        <Suspense fallback={<Card><CardHeader><CardTitle>Carregando...</CardTitle></CardHeader><CardContent><div className="h-96 w-full animate-pulse bg-muted/50 rounded-md"></div></CardContent></Card>}>
            <SubmeterCandidaturaForm />
        </Suspense>
    );
}
