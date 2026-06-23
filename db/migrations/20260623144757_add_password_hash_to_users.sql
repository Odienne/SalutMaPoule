-- migrate:up

ALTER TABLE users
    ADD COLUMN password_hash TEXT NOT NULL DEFAULT '';

-- migrate:down

ALTER TABLE users
DROP COLUMN password_hash;

