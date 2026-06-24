import * as db from 'zapatos/db';
import {pool} from '../../../db/pool.js';

export async function findByEmail(email: string) {
    return db.selectOne('users', {email}).run(pool);
}

export async function getById(id: number) {
    return db.selectOne('users', {id}).run(pool);
}

export async function getUsers() {
    return db.select('users', {}, {
        columns: ['id', 'email', 'first_name', 'last_name']
    }).run(pool);
}

export async function create(data: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    salt: string;
}) {
    return db.insert('users', {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        password_hash: data.password,
        password_salt: data.salt,
    }).run(pool);
}
