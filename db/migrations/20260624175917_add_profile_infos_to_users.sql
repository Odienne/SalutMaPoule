-- migrate:up

ALTER TABLE users
ADD COLUMN avatar_url TEXT,
ADD COLUMN phone VARCHAR(30),
ADD COLUMN seller_description TEXT,
ADD COLUMN is_verified BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- migrate:down

ALTER TABLE users
DROP COLUMN updated_at,
DROP COLUMN is_verified,
DROP COLUMN seller_description,
DROP COLUMN phone,
DROP COLUMN avatar_url,
