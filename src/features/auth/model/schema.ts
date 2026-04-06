import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Обязательное поле'),
  password: z.string().min(1, 'Обязательное поле'),
  remember: z.boolean(),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
