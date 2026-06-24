import {describe, it, expect} from 'vitest';
import {create, findByEmail, getUsers} from '../user.repository.js';

describe('User repository', () => {
    it('creates a user', async () => {
        const email = `test-${crypto.randomUUID()}@mail.com`;

        const user = await create({
            email,
            firstName: 'Adam',
            lastName: 'Odienne',
            password: 'hash',
            salt: 'salt'
        });

        expect(user.id).toBeDefined();
        expect(user.email).toBe(email);
    });

    it('finds a user by email', async () => {
        const email = `test-${crypto.randomUUID()}@mail.com`;

        await create({
            email,
            firstName: 'Adam',
            lastName: 'Odienne',
            password: 'hash',
            salt: 'salt'
        });

        const user = await findByEmail(email);

        expect(user).not.toBeNull();
        expect(user?.email).toBe(email);
    });

    it('returns users without password fields', async () => {
        const users = await getUsers();

        expect(Array.isArray(users)).toBe(true);

        if (users.length > 0) {
            expect(users[0]).toHaveProperty('id');
            expect(users[0]).toHaveProperty('email');

            expect(users[0]).not.toHaveProperty('password_hash');
            expect(users[0]).not.toHaveProperty('password_salt');
        }
    });
});
