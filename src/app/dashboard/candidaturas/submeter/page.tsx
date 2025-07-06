import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SubmeterCandidaturaForm } from '@/components/dashboard/submeter-candidatura-form';

export default function SubmeterCandidaturaPage({ searchParams }: { searchParams?: { tipo?: string, disciplina?: string, professor?: string, id?: string } }) {
    return (
        <Suspense fallback={<Card><CardHeader><CardTitle>Carregando...</CardTitle></CardHeader><CardContent><div className="h-96 w-full"></div></CardContent></Card>}>
            <SubmeterCandidaturaForm 
                tipo={searchParams?.tipo}
                disciplina={searchParams?.disciplina}
                professor={searchParams?.professor}
                id={searchParams?.id}
            />
        </Suspense>
    );
}
