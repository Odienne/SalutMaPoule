import * as db from 'zapatos/db';
import {pool} from '../../../db/pool.js';

export async function create(data: {
    owner_id: number;
    title: string;
    description: string;
}) {
    return db.insert('listings', {
        owner_id: data.owner_id,
        title: data.title,
        description: data.description,
    }).run(pool);
}

export async function getListings() {
    return db.select('listings', {}, {
        columns: ['id', 'owner_id', 'title', 'description']
    }).run(pool);
}

export async function getListingOfUser(id: number) {
    return db.select('listings', {
        owner_id: id,
    }).run(pool);
}

export async function getById(id: number) {
    return db.selectOne('listings', {
        id,
    }).run(pool);
}
