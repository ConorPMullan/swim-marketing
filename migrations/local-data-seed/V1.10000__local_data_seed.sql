INSERT INTO
    users (user_name, email, user_password, user_level_id)
VALUES
    (
        'John Smith',
        'john.smith@gmail.com',
        'password1!',
        1
    );

INSERT INTO
    users (user_name, email, user_password, user_level_id)
VALUES
    (
        'Jane Smith',
        'jane.smith@gmail.com',
        'password456!',
        1
    );

INSERT INTO
    users (user_name, email, user_password, user_level_id)
VALUES
    (
        'Bob Johnson',
        'bob.johnson@gmail.com',
        'password789!',
        2
    );

INSERT INTO
    users (user_name, email, user_password, user_level_id)
VALUES
    (
        'Alice Williams',
        'alice.williams@gmail.com',
        'password123!',
        2
    );

INSERT INTO
    users (user_name, email, user_password, user_level_id)
VALUES
    (
        'Chris Jones',
        'chris.jones@gmail.com',
        'password456!',
        3
    );

INSERT INTO
    client (client_name, email, company_name)
VALUES
    (
        'Alice Smith',
        'alice.smith@example.com',
        'Novexa Corp'
    ),
    (
        'Bob Williams',
        'bob.williams@example.com',
        'Vintal Solutions'
    ),
    (
        'Charlie Johnson',
        'charlie.johnson@example.com',
        'TriDyn Holdings'
    ),
    (
        'Dave Jones',
        'dave.jones@example.com',
        'NexaCore Industries'
    ),
    (
        'Eve Smith',
        'eve.smith@example.com',
        'Crystalline Ventures'
    ),
    (
        'Frank Williams',
        'frank.williams@example.com',
        'Silverwood Systems'
    ),
    (
        'Gina Johnson',
        'gina.johnson@example.com',
        'EliteStream Enterprises'
    ),
    (
        'Henry Jones',
        'henry.jones@example.com',
        'Horizonia Inc'
    ),
    (
        'Irene Smith',
        'irene.smith@example.com',
        'TitanForge Technologies'
    ),
    (
        'Jack Williams',
        'jack.williams@example.com',
        'QuantumWave Innovations'
    );

INSERT INTO
    campaign (campaign_name, campaign_start_date, end_date)
VALUES
    (
        'Spring Promotion',
        '2022-03-01',
        '2022-03-31'
    ),
    (
        'Summer Promotion',
        '2022-06-01',
        '2022-06-30'
    ),
    ('Fall Promotion', '2022-09-01', '2022-09-30'),
    (
        'Winter Promotion',
        '2022-12-01',
        '2022-12-31'
    ),
    (
        'New Year Promotion',
        '2023-01-01',
        '2023-01-31'
    ),
    (
        'Valentine''s Day Promotion',
        '2023-02-01',
        '2023-02-14'
    ),
    (
        'Easter Promotion',
        '2023-04-01',
        '2023-04-30'
    ),
    (
        'Mother''s Day Promotion',
        '2023-05-01',
        '2023-05-14'
    ),
    (
        'Father''s Day Promotion',
        '2023-06-01',
        '2023-06-14'
    ),
    (
        'Fourth of July Promotion',
        '2023-07-01',
        '2023-07-04'
    );

INSERT INTO
    influencer (
        influencer_name,
        email,
        platform_id,
        price_per_post,
        is_active
    )
VALUES
    (
        'John Jones',
        'john.jones@example.com',
        1,
        '£100',
        true
    ),
    (
        'Jane Smith',
        'jane.smith@example.com',
        2,
        '£200',
        true
    ),
    (
        'Alex Williams',
        'alex.williams@example.com',
        3,
        '£300',
        true
    ),
    (
        'Emily Johnson',
        'emily.johnson@example.com',
        4,
        '£400',
        true
    ),
    (
        'Michael Jones',
        'michael.jones@example.com',
        5,
        '£500',
        true
    ),
    (
        'Sara Smith',
        'sara.smith@example.com',
        6,
        '£600',
        true
    ),
    (
        'Chris Williams',
        'chris.williams@example.com',
        7,
        '£700',
        true
    ),
    (
        'Kate Johnson',
        'kate.johnson@example.com',
        8,
        '£800',
        true
    ),
    (
        'Samuel Jones',
        'samuel.jones@example.com',
        7,
        '£900',
        true
    ),
    (
        'Emma Smith',
        'emma.smith@example.com',
        8,
        '£1000',
        true
    ),
    (
        'Adam Williams',
        'adam.williams@example.com',
        1,
        '£100',
        false
    ),
    (
        'Emily Johnson',
        'emily.johnson@example.com',
        2,
        '£200',
        false
    ),
    (
        'Michael Jones',
        'michael.jones@example.com',
        3,
        '£300',
        false
    ),
    (
        'Sara Smith',
        'sara.smith@example.com',
        4,
        '£400',
        false
    ),
    (
        'Chris Williams',
        'chris.williams@example.com',
        5,
        '£500',
        false
    ),
    (
        'Kate Johnson',
        'kate.johnson@example.com',
        6,
        '£600',
        false
    ),
    (
        'Samuel Jones',
        'samuel.jones@example.com',
        7,
        '£700',
        false
    ),
    (
        'Emma Smith',
        'emma.smith@example.com',
        8,
        '£800',
        false
    ),
    (
        'John Jones',
        'john.jones@example.com',
        3,
        '£900',
        false
    ),
    (
        'Jane Smith',
        'jane.smith@example.com',
        4,
        '£1000',
        false
    );

INSERT INTO
    appointment (
        scheduled_date_time,
        duration,
        description,
        location
    )
VALUES
    (
        '2022-01-01 10:00:00',
        60,
        'Figures Meeting',
        'zoom.link'
    ),
    (
        '2022-01-02 10:00:00',
        60,
        'Discuss Spring Campaign',
        'Meeting Room 2'
    ),
    (
        '2022-01-03 10:00:00',
        60,
        'Discuss Summer Campaign',
        'zoom.link'
    ),
    (
        '2022-01-04 10:00:00',
        60,
        'New Client Meeting',
        'zoom.link'
    ),
    (
        '2022-01-05 10:00:00',
        60,
        'Figures Meeting',
        'zoom.link'
    ),
    (
        '2022-01-06 10:00:00',
        60,
        'Discuss Autumn Campaign',
        'Meeting Room'
    ),
    (
        '2022-01-07 10:00:00',
        60,
        'Discuss Winter Campaign',
        'zoom.link'
    ),
    (
        '2022-01-08 10:00:00',
        60,
        'New Client Meeting',
        'zoom.link'
    ),
    (
        '2022-01-09 10:00:00',
        60,
        'Mid Campaign Meeting',
        'zoom.link'
    ),
    (
        '2022-01-10 10:00:00',
        60,
        'End of Campaign Review',
        'zoom.link'
    ),
(
        '2023-03-10 10:00:00',
        60,
        'Figures Meeting',
        'zoom.link'
    ),
    (
        '2023-03-02 10:00:00',
        60,
        'Discuss Spring Campaign',
        'Meeting Room 2'
    ),
    (
        '2023-03-03 10:00:00',
        60,
        'Discuss Summer Campaign',
        'zoom.link'
    ),
    (
        '2023-03-04 10:00:00',
        60,
        'New Client Meeting',
        'zoom.link'
    ),
    (
        '2023-03-05 10:00:00',
        60,
        'Figures Meeting',
        'zoom.link'
    ),
    (
        '2023-03-06 10:00:00',
        60,
        'Discuss Autumn Campaign',
        'Meeting Room'
    ),
    (
        '2023-03-07 10:00:00',
        60,
        'Discuss Winter Campaign',
        'zoom.link'
    ),
    (
        '2023-03-08 10:00:00',
        60,
        'New Client Meeting',
        'zoom.link'
    ),
    (
        '2023-03-09 10:00:00',
        60,
        'Mid Campaign Meeting',
        'zoom.link'
    ),
    (
        '2023-03-10 10:00:00',
        60,
        'End of Campaign Review',
        'zoom.link'
    );

INSERT INTO
    client_campaign (campaign_id, client_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5);

INSERT INTO
    user_client (user_id, client_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (3, 4),
    (4, 5);

INSERT INTO
    campaign_influencer (campaign_id, influencer_id)
VALUES
    (1, 9),
    (1, 8),
    (2, 9),
    (3, 7),
    (4, 8),
    (1, 5),
    (1, 2),
    (2, 2),
    (3, 2),
    (4, 4);