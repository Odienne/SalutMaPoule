import { describe, it, expect } from 'vitest';
import { buildServer } from '../app.js';

describe('healthcheck', () => {
    it('returns OK', async () => {
        const server = await buildServer();

        const response = await server.inject({
            method: 'GET',
            url: '/healthcheck',
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual({
            status: 'OK',
        });
    });
});
