import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ROUTES } from '@/shared/model/routes';
import { api } from '@/shared/api/instance';
import type { LoginCredentials, LoginResponse } from './schema';
import { useSession } from '@/shared/model/session';
import { isAxiosError } from 'axios';

export function useLogin() {
  const navigate = useNavigate();
  const session = useSession();

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      try {
        return await api.post<LoginResponse>('/auth/login', credentials, {
          timeout: 5000,
        });
      } catch (error) {
        if (isAxiosError(error)) {
          let message = error.message;
          if (error.response?.data?.message) {
            message = error.response.data?.message;
          } else if (error.response) {
            message = `${error.response.status}: ${error.response.statusText}`;
          }
          throw new Error(message);
        }
        throw new Error('Произошла непредвиденная ошибка');
      }
    },
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
