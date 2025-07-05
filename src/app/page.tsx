export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="text-center">
        <h1 className="font-headline text-8xl font-extrabold tracking-tighter sm:text-9xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Olá!
        </h1>
        <p className="mt-4 max-w-sm mx-auto text-lg text-muted-foreground">
          Bem-vindo à sua nova aplicação Next.js, criada com um toque de design.
        </p>
      </div>
    </main>
  );
}
