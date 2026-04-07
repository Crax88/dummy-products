import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../model/use-login';
import { loginSchema } from '../model/schema';
import type { LoginCredentials } from '../model/schema';
import { Button, Input } from '@/shared/ui/kit';
import {
  UserIcon,
  LockIcon,
  EyeIcon,
  LogoIcon,
  CrossIcon,
} from '@/shared/ui/icons';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { remember: false },
  });

  const [showPassword, setShowPassword] = useState(false);

  const userName = watch('username');

  const { login, isPending, errorMessage } = useLogin();

  const onSubmit = async (data: LoginCredentials) => {
    login(data);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 relative overflow-hidden'>
      <div className='bg-white rounded-2xl shadow-xl w-full max-w-md p-8'>
        <div className='flex justify-center mb-6'>
          <div className='w-16 h-16 rounded-full flex items-center justify-center shadow-lg'>
            <LogoIcon className='text-white text-2xl font-bold' />
          </div>
        </div>
        <h1 className='text-2xl font-bold text-center text-gray-800 mb-2'>
          Добро пожаловать
        </h1>

        <p className='text-sm text-gray-500 text-center mb-8'>
          Пожалуйста, авторизуйтесь
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='animate-slide-up animation-delay-200'
        >
          <Input
            className='mb-4'
            label='Логин'
            placeholder='test'
            error={errors.username?.message}
            {...register('username')}
            startSlot={
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <UserIcon className='h-5 w-5 text-gray-400' />
              </div>
            }
            endSlot={
              userName ? (
                <button
                  type='button'
                  onClick={() => setValue('username', '')}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                >
                  <CrossIcon className='h-4 w-4 text-gray-400 hover:text-gray-600' />
                </button>
              ) : null
            }
          />

          <Input
            className='mb-4'
            label='Пароль'
            placeholder='******'
            error={errors.password?.message}
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            startSlot={
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <LockIcon className='h-5 w-5 text-gray-400' />
              </div>
            }
            endSlot={
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
              >
                <EyeIcon className='h-4 w-4 text-gray-400 hover:text-gray-600' />
              </button>
            }
          />

          <label className='flex items-center mb-6 cursor-pointer'>
            <input
              type='checkbox'
              {...register('remember')}
              className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
            />
            <span className='ml-2 text-sm text-gray-700'>Запомнить данные</span>
          </label>

          {errorMessage && (
            <div className='mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm animate-slide-down'>
              {errorMessage}
            </div>
          )}

          <Button type='submit' disabled={isPending} className='w-full'>
            Войти
          </Button>

          <div className='relative my-6'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>или</span>
            </div>
          </div>

          <div className='text-center'>
            <p className='text-sm text-gray-600'>
              Нет аккаунта?{' '}
              <button
                type='button'
                onClick={() => alert('Функция регистрации в разработке')}
                className='text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all'
              >
                Создать аккаунт
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
