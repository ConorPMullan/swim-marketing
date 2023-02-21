CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY NOT NULL,
    user_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    user_password VARCHAR NOT NULL,
    user_level_id SERIAL NOT NULL
);

CREATE TABLE IF NOT EXISTS client (
    id SERIAL PRIMARY KEY NOT NULL,
    client_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    company_name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS campaign (
    id SERIAL PRIMARY KEY NOT NULL,
    campaign_name VARCHAR NOT NULL,
    campaign_start_date TIMESTAMP,
    end_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS platform (
    id SERIAL PRIMARY KEY NOT NULL,
    platform_name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS appointment (
    id SERIAL PRIMARY KEY NOT NULL,
    scheduled_date_time TIMESTAMP,
    duration SERIAL NOT NULL,
    description VARCHAR NOT NULL,
    location VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS user_client (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL,
    client_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users (id),
    FOREIGN KEY(client_id) REFERENCES client (id)
);

CREATE TABLE IF NOT EXISTS appointment_user_client (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL,
    client_id INTEGER NOT NULL,
    appointment_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users (id),
    FOREIGN KEY(client_id) REFERENCES client (id),
    FOREIGN KEY(appointment_id) REFERENCES appointment (id)
);

CREATE TABLE IF NOT EXISTS client_campaign (
    id SERIAL PRIMARY KEY NOT NULL,
    campaign_id INTEGER NOT NULL,
    client_id INTEGER NOT NULL,
    FOREIGN KEY (campaign_id) REFERENCES campaign (id),
    FOREIGN KEY (client_id) REFERENCES client (id)
);

CREATE TABLE IF NOT EXISTS influencer (
    id SERIAL PRIMARY KEY NOT NULL,
    influencer_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    platform_id INTEGER NOT NULL,
    price_per_post VARCHAR NOT NULL,
    is_active BOOLEAN DEFAULT FALSE NOT NULL,
    FOREIGN KEY (platform_id) REFERENCES platform (id)
);

CREATE TABLE IF NOT EXISTS campaign_influencer (
    id SERIAL PRIMARY KEY NOT NULL,
    campaign_id INTEGER NOT NULL,
    influencer_id INTEGER NOT NULL,
    FOREIGN KEY (campaign_id) REFERENCES campaign (id),
    FOREIGN KEY (influencer_id) REFERENCES influencer (id)
);