import * as db from 'zapatos/db';
import {pool} from '../../db/pool.js';

export async function getUsers() {
    return db.select('users', {}).run(pool);
}

export async function createUser(email: string) {
    return db.insert(
        'users',
        {
            email,
        }
    ).run(pool);
}
