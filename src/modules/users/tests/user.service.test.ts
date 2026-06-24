vi.mock('../user.repository.js');
vi.mock('../../utils/hash.js', () => ({
    hashPassword: () => ({
        hash: 'hashed-password',
        salt: 'salt',
    }),
}));
import * as hashUtils from '../../../utils/hash.js';
vi.spyOn(hashUtils, 'verifyPassword').mockReturnValue(true);

import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as userRepository from '../user.repository.js';


import {createUser, loginUser} from '../user.service.js';


describe('user.service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('creates a user successfully', async () => {
        (userRepository.findByEmail as any).mockResolvedValue(null);

        (userRepository.create as any).mockResolvedValue({
            id: 1,
            email: 'test@test.com',
            first_name: 'John',
            last_name: 'Doe',
        });

        const result = await createUser({
            email: 'test@test.com',
            firstName: 'John',
            lastName: 'Doe',
            password: 'password123',
        });

        expect(userRepository.findByEmail).toHaveBeenCalledWith('test@test.com');
        expect(userRepository.create).toHaveBeenCalled();
        expect(result.email).toBe('test@test.com');
    });

    it('throws if user already exists', async () => {
        (userRepository.findByEmail as any).mockResolvedValue({
            id: 1,
            email: 'test@test.com',
        });

        await expect(
            createUser({
                email: 'test@test.com',
                firstName: 'John',
                lastName: 'Doe',
                password: 'password123',
            })
        ).rejects.toThrow('User already exists');

        expect(userRepository.create).not.toHaveBeenCalled();
    });

    it('returns user on valid login', async () => {
        (userRepository.findByEmail as any).mockResolvedValue({
            id: 1,
            email: 'test@test.com',
            password_hash: 'hash',
            password_salt: 'salt',
        });

        const result = await loginUser({
            email: 'test@test.com',
            password: 'password123',
        });

        expect(result.email).toBe('test@test.com');
    });

    it('throws on invalid login (user not found)', async () => {
        (userRepository.findByEmail as any).mockResolvedValue(null);

        await expect(
            loginUser({
                email: 'missing@test.com',
                password: 'password123',
            })
        ).rejects.toThrow('Invalid credentials');
    });
});
