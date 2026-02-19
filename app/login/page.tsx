'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { useLoginMutation } from '@/hooks/mutations/useLoginMutation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirect_to') || '/';

  const loginMutation = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password }, {
      onSuccess: () => {
        // Redirecionar para a página anterior ou dashboard
        router.push(redirectTo);
      },
    });
  };

  const isLoginLoading = loginMutation.status in ['loading', 'pending'];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle>
            <Text asChild variant="h2">
              <h2>Finance bot</h2>
            </Text>
          </CardTitle>
          <CardDescription>
            <Text variant="body-sm" tone="muted">Insira suas credenciais para acessar sua conta</Text>
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="email"
                type="text"
                placeholder="Insira seu email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Insira sua senha"
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoginLoading}>
              {isLoginLoading ? 'Signing in...' : 'Sign in'}
            </Button>
            <Text asChild variant="body-sm" tone="muted" className="text-center">
              <p>
              Não possui uma conta?{' '}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Registrar-se
              </Link>
              </p>
            </Text>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
