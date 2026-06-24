import {describe, it, expect, beforeEach, vi} from 'vitest';
import {buildServer} from '../../../app.js';

vi.mock('../../../auth/authenticate.js', () => ({
    authenticate: async () => {
    },
}));

describe('users routes', async () => {
    const server = await buildServer();

    it('POST /api/users - creates user', async () => {

        const res = await server.inject({
            method: 'POST',
            url: '/api/users',
            payload: {
                email: 'test@test.com',
                firstName: 'John',
                lastName: 'Doe',
                password: 'password123',
            },
        });

        expect(res.statusCode).toBe(201);
        expect(res.json()).toHaveProperty('email');
    });

    it('rejects missing password', async () => {
        const res = await server.inject({
            method: 'POST',
            url: '/api/users',
            payload: {
                email: 'test@test.com',
                firstName: 'John',
                lastName: 'Doe',
            },
        });

        expect(res.statusCode).toBe(400);
    });


    it('POST /api/users/login - returns token', async () => {
        await server.inject({
            method: 'POST',
            url: '/api/users',
            payload: {
                email: 'login@test.com',
                firstName: 'John',
                lastName: 'Doe',
                password: 'password123',
            },
        });

        const res = await server.inject({
            method: 'POST',
            url: '/api/users/login',
            payload: {
                email: 'login@test.com',
                password: 'password123',
            },
        });

        expect(res.statusCode).toBe(200);
        expect(res.json()).toHaveProperty('accessToken');
    });

    it('rejects wrong credentials', async () => {
        const res = await server.inject({
            method: 'POST',
            url: '/api/users/login',
            payload: {
                email: 'unknown@test.com',
                password: 'wrongbutlongenough',
            },
        });
        expect(res.statusCode).toBe(401);
    });

    it('rejects short password', async () => {
        const res = await server.inject({
            method: 'POST',
            url: '/api/users/login',
            payload: {
                email: 'unknown@test.com',
                password: 'wrong',
            },
        });
        expect(res.statusCode).toBe(400);
    });

    it('rejects invalid email', async () => {
        const res = await server.inject({
            method: 'POST',
            url: '/api/users',
            payload: {
                email: 'not-an-email',
                firstName: 'John',
                lastName: 'Doe',
                password: '123',
            },
        });

        expect(res.statusCode).toBe(400);
    });

    it('rejects access without JWT', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/users',
        });

        expect(res.statusCode).toBe(401);
    });
});
