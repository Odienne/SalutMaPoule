import './bootstrap.js';
import { beforeEach } from 'vitest';
import { pool } from '../../db/pool.js';

if (!process.env.DATABASE_URL?.includes('test')) {
    throw new Error(
        'Tests are not running against a test database'
    );
}

beforeEach(async () => {
    await pool.query(`
    TRUNCATE TABLE users
    RESTART IDENTITY CASCADE
  `);
});
