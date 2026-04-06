import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ROUTES } from '@/shared/model/routes';
import { api } from '@/shared/api/instance';
import type { LoginCredentials, LoginResponse } from './schema';
import { useSession } from '@/shared/model/session';

export function useLogin() {
  const navigate = useNavigate();
  const session = useSession();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      api.post<LoginResponse>('/auth/login', credentials),
    onSuccess: (data, vars) => {
      session.login(data.data, vars.remember);
      navigate(ROUTES.HOME);
    },
  });

  const login = (data: LoginCredentials) => {
    loginMutation.mutate(data);
  };

  const errorMessage = loginMutation.isError
    ? loginMutation.error.message
    : undefined;

  return { login, isPending: loginMutation.isPending, errorMessage };
}
