import { Suspense } from 'react';
import { LoginForm } from '@/components/login-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// This is a Server Component
export default function LoginPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const profile = typeof searchParams?.profile === 'string' ? searchParams.profile : undefined;

  // Suspense is used as a fallback while the client component loads
  return (
    <Suspense fallback={
      <main className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="mx-auto w-full max-w-sm">
          <CardHeader>
            <CardTitle>Carregando...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full animate-pulse rounded-md bg-muted/50"></div>
          </CardContent>
        </Card>
      </main>
    }>
      <LoginForm profile={profile} />
    </Suspense>
  );
}
