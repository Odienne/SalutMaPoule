import {z} from 'zod';

export const createListingSchema = z.object({
    owner_id: z.string(),
    title: z.string().min(3, 'Title should be at least 3 characters long'),
    description: z.string(),
});

export const createListingResponseSchema = z.object({
    id: z.number(),
    owner_id: z.number(),
    title: z.string().min(3, 'Title should be at least 3 characters long'),
    description: z.string(),
});

export const deleteListingParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});


export type CreateListingInput = z.infer<typeof createListingSchema>;
export type CreateListingResponse = z.infer<typeof createListingResponseSchema>;
