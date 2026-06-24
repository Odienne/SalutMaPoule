import {z} from 'zod';

export const createListingSchema = z.object({
    owner_id: z.number(),
    title: z.string().min(3, 'Title should be at least 3 characters long'),
    description: z.string(),
});

export const createListingResponseSchema = z.object({
    id: z.number(),
    owner_id: z.number(),
    title: z.string().min(3, 'Title should be at least 3 characters long'),
    description: z.string(),
});


export type CreateListingInput = z.infer<typeof createListingSchema>;
