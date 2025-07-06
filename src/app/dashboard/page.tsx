
import { Suspense } from 'react';
import DashboardContent from './dashboard-content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <Card>
        <CardHeader>
          <CardTitle>Carregando Dashboard...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 w-full animate-pulse rounded-md bg-muted/50"></div>
        </CardContent>
      </Card>
    }>
      <DashboardContent />
    </Suspense>
  );
}
