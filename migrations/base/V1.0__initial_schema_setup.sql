CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY NOT NULL,
    user_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    user_password VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS client (
    id SERIAL PRIMARY KEY NOT NULL,
    client_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL
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

CREATE TABLE IF NOT EXISTS user_client (
    id SERIAL PRIMARY KEY NOT NULL,
    CONSTRAINT user_id FOREIGN KEY(user_id) REFERENCES users (id),
    CONSTRAINT client_id FOREIGN KEY(client_id) REFERENCES client (id)
);

CREATE TABLE IF NOT EXISTS appointment_user_client (
    id SERIAL PRIMARY KEY NOT NULL,
    CONSTRAINT user_id FOREIGN KEY(user_id) REFERENCES users (id),
    CONSTRAINT client_id FOREIGN KEY(client_id) REFERENCES client (id)
);

CREATE TABLE IF NOT EXISTS appointment (
    id SERIAL PRIMARY KEY NOT NULL,
    CONSTRAINT user_client_id FOREIGN KEY (user_client_id) REFERENCES user_client (id),
    scheduled_date_time TIMESTAMP,
    duration SERIAL NOT NULL,
    description VARCHAR NOT NULL,
    location VARCHAR NOT NULL,
    CONSTRAINT appointment_user_client_id FOREIGN KEY(appointment_user_client_id) REFERENCES appointment (id)
);

CREATE TABLE IF NOT EXISTS client_campaign (
    id SERIAL PRIMARY KEY NOT NULL,
    CONSTRAINT campaign_id FOREIGN KEY (campaign_id) REFERENCES campaign (id),
    CONSTRAINT client_id FOREIGN KEY (client_id) REFERENCES client (id)
);

CREATE TABLE IF NOT EXISTS influencer (
    id SERIAL PRIMARY KEY NOT NULL,
    influencer_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    CONSTRAINT platform_id FOREIGN KEY (platform_id) REFERENCES platform (id),
    price_per_post VARCHAR NOT NULL,
    is_active BOOLEAN DEFAULT FALSE NOT NULL
);