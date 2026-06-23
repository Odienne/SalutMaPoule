import { z } from 'zod';

const userCore = z.object({
    email: z.email({
        error: 'Email must be a valid email address',
    }),
    firstName: z.string().min(3, 'First name must be at least 3 characters long'),
    lastName: z.string().min(3, 'Last name must be at least 3 characters long'),
});

export const createUserSchema = userCore.extend({
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const createUserResponseSchema = userCore.extend({
    id: z.number(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
