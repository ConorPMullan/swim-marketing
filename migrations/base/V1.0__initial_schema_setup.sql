CREATE TABLE IF NOT EXISTS user
(
    id   SERIAL PRIMARY KEY NOT NULL,
    user_name VARCHAR            NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS client
(
    id   SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR            NOT NULL,
    email VARCHAR            NOT NULL,
);


CREATE TABLE IF NOT EXISTS campaign
(
    id  SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR            NOT NULL,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
);

CREATE TABLE IF NOT EXISTS platform
(
    id  SERIAL PRIMARY KEY NOT NULL,
    platform_name VARCHAR            NOT NULL,    
);

CREATE TABLE IF NOT EXISTS influencer
(
    id  SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR            NOT NULL,
    email VARCHAR NOT NULL,
    FOREIGN KEY (platform_id) REFERENCES platform(id),
    PRICE_PER_POST VARCHAR NOT NULL,
    IS_ACTIVE BOOLEAN DEFAULT FALSE NOT NULL,    
);

CREATE TABLE IF NOT EXISTS user_client
(
    id   SERIAL PRIMARY KEY NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (client_id) REFERENCES client(id),
);


CREATE TABLE IF NOT EXISTS appointment
(
    id   SERIAL PRIMARY KEY NOT NULL,
    FOREIGN KEY (user_client_id) REFERENCES user_client(id)
    scheduled_date_time TIMESTAMP,
    SERIAL duration NOT NULL, 
);

CREATE TABLE IF NOT EXISTS client_campaign
(
    id   SERIAL PRIMARY KEY NOT NULL,
    FOREIGN KEY (campaign_id) REFERENCES campaign(id),
    FOREIGN KEY (client_id) REFERENCES client(id),
);
