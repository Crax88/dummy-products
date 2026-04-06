import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ROUTES } from '@/shared/model/routes';
import { api } from '@/shared/api/instance';
import type { LoginCredentials } from './schema';

export function useLogin() {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      api.post('/auth/login', credentials),
    onSuccess: (data) => {
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
