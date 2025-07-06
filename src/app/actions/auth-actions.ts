'use server';

import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido.'),
  password: z.string(),
});

export type LoginState = {
  success: boolean;
  profile: string;
  message: string;
};

const getProfileFromEmail = (email: string) => {
    if (email.includes("professor")) return "professor";
    if (email.includes("coordenador")) return "coordenador";
    if (email.includes("admin")) return "administrativo";
    return "aluno";
};

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  
  const validatedFields = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      profile: 'aluno',
      message: 'Dados de login inválidos.',
    };
  }

  const { email } = validatedFields.data;
  const profile = getProfileFromEmail(email);

  // A lógica de protótipo agora vive aqui.
  // Em uma aplicação real, aqui você chamaria seu serviço de autenticação.
  // A chamada para sessionStorage foi removida daqui, pois 'use server'
  // não tem acesso a APIs do navegador. O cliente fará isso.

  return {
    success: true,
    profile: profile,
    message: 'Login bem-sucedido!',
  };
}
