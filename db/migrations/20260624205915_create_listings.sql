-- migrate:up

CREATE TABLE listings
(
    id           SERIAL PRIMARY KEY,

    owner_id     INTEGER      NOT NULL REFERENCES users (id) ON DELETE CASCADE,

    title        VARCHAR(255) NOT NULL,
    description  TEXT         NOT NULL,

    price        NUMERIC(10, 2),

    quantity     INTEGER      NOT NULL DEFAULT 1,

    breed        VARCHAR(255),

    age_months   INTEGER,

    is_laying    BOOLEAN      NOT NULL DEFAULT TRUE,
    free_range   BOOLEAN      NOT NULL DEFAULT FALSE,
    organic_feed BOOLEAN      NOT NULL DEFAULT FALSE,

    city         VARCHAR(255),
    latitude     DECIMAL(10, 8),
    longitude    DECIMAL(11, 8),

    status       VARCHAR(20)  NOT NULL DEFAULT 'published',

    created_at   TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP    NOT NULL DEFAULT NOW(),

    CONSTRAINT listings_status_check
        CHECK (status IN ('draft', 'published', 'sold', 'archived'))
);

CREATE INDEX idx_listings_owner_id
    ON listings (owner_id);

CREATE INDEX idx_listings_status
    ON listings (status);

CREATE INDEX idx_listings_created_at
    ON listings (created_at DESC);


-- migrate:down

DROP TABLE listings;
