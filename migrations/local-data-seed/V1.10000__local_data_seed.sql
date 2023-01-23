INSERT INTO
    users (id, user_name, email, user_password)
VALUES
    (
        1,
        'John Smith',
        'john.smith@gmail.com',
        'password123'
    );

INSERT INTO
    users (id, user_name, email, user_password)
VALUES
    (
        2,
        'Jane Smith',
        'jane.smith@gmail.com',
        'password456'
    );

INSERT INTO
    users (id, user_name, email, user_password)
VALUES
    (
        3,
        'Bob Johnson',
        'bob.johnson@gmail.com',
        'password789'
    );

INSERT INTO
    users (id, user_name, email, user_password)
VALUES
    (
        4,
        'Alice Williams',
        'alice.williams@gmail.com',
        'password123'
    );

INSERT INTO
    users (id, user_name, email, user_password)
VALUES
    (
        5,
        'Chris Jones',
        'chris.jones@gmail.com',
        'password456'
    );

INSERT INTO
    client (id, client_name, email)
VALUES
    (1, 'Alice Smith', 'alice.smith@example.com'),
    (2, 'Bob Williams', 'bob.williams@example.com'),
    (
        3,
        'Charlie Johnson',
        'charlie.johnson@example.com'
    ),
    (4, 'Dave Jones', 'dave.jones@example.com'),
    (5, 'Eve Smith', 'eve.smith@example.com'),
    (
        6,
        'Frank Williams',
        'frank.williams@example.com'
    ),
    (7, 'Gina Johnson', 'gina.johnson@example.com'),
    (8, 'Henry Jones', 'henry.jones@example.com'),
    (9, 'Irene Smith', 'irene.smith@example.com'),
    (10, 'Jack Williams', 'jack.williams@example.com');

INSERT INTO
    campaign (id, campaign_name, campaign_start_date, end_date)
VALUES
    (
        1,
        'Spring Promotion',
        '2022-03-01',
        '2022-03-31'
    ),
    (
        2,
        'Summer Promotion',
        '2022-06-01',
        '2022-06-30'
    ),
    (3, 'Fall Promotion', '2022-09-01', '2022-09-30'),
    (
        4,
        'Winter Promotion',
        '2022-12-01',
        '2022-12-31'
    ),
    (
        5,
        'New Year Promotion',
        '2023-01-01',
        '2023-01-31'
    ),
    (
        6,
        'Valentine''s Day Promotion',
        '2023-02-01',
        '2023-02-14'
    ),
    (
        7,
        'Easter Promotion',
        '2023-04-01',
        '2023-04-30'
    ),
    (
        8,
        'Mother''s Day Promotion',
        '2023-05-01',
        '2023-05-14'
    ),
    (
        9,
        'Father''s Day Promotion',
        '2023-06-01',
        '2023-06-14'
    ),
    (
        10,
        'Fourth of July Promotion',
        '2023-07-01',
        '2023-07-04'
    );

INSERT INTO
    influencer (
        id,
        influencer_name,
        email,
        platform_id,
        price_per_post,
        is_active
    )
VALUES
    (
        1,
        'John Jones',
        'john.jones@example.com',
        1,
        '£100',
        true
    ),
    (
        2,
        'Jane Smith',
        'jane.smith@example.com',
        2,
        '£200',
        true
    ),
    (
        3,
        'Alex Williams',
        'alex.williams@example.com',
        3,
        '£300',
        true
    ),
    (
        4,
        'Emily Johnson',
        'emily.johnson@example.com',
        4,
        '£400',
        true
    ),
    (
        5,
        'Michael Jones',
        'michael.jones@example.com',
        5,
        '£500',
        true
    ),
    (
        6,
        'Sara Smith',
        'sara.smith@example.com',
        6,
        '£600',
        true
    ),
    (
        7,
        'Chris Williams',
        'chris.williams@example.com',
        7,
        '£700',
        true
    ),
    (
        8,
        'Kate Johnson',
        'kate.johnson@example.com',
        8,
        '£800',
        true
    ),
    (
        9,
        'Samuel Jones',
        'samuel.jones@example.com',
        7,
        '£900',
        true
    ),
    (
        10,
        'Emma Smith',
        'emma.smith@example.com',
        8,
        '£1000',
        true
    ),
    (
        11,
        'Adam Williams',
        'adam.williams@example.com',
        1,
        '£100',
        false
    ),
    (
        12,
        'Emily Johnson',
        'emily.johnson@example.com',
        2,
        '£200',
        false
    ),
    (
        13,
        'Michael Jones',
        'michael.jones@example.com',
        3,
        '£300',
        false
    ),
    (
        14,
        'Sara Smith',
        'sara.smith@example.com',
        4,
        '£400',
        false
    ),
    (
        15,
        'Chris Williams',
        'chris.williams@example.com',
        5,
        '£500',
        false
    ),
    (
        16,
        'Kate Johnson',
        'kate.johnson@example.com',
        6,
        '£600',
        false
    ),
    (
        17,
        'Samuel Jones',
        'samuel.jones@example.com',
        7,
        '£700',
        false
    ),
    (
        18,
        'Emma Smith',
        'emma.smith@example.com',
        8,
        '£800',
        false
    ),
    (
        19,
        'John Jones',
        'john.jones@example.com',
        3,
        '£900',
        false
    ),
    (
        20,
        'Jane Smith',
        'jane.smith@example.com',
        4,
        '£1000',
        false
    );

INSERT INTO
    appointment (
        id,
        scheduled_date_time,
        duration,
        description,
        location
    )
VALUES
    (
        1,
        '2022-01-01 10:00:00',
        60,
        'Figures Meeting',
        'zoom.link'
    ),
    (
        2,
        '2022-01-02 10:00:00',
        60,
        'Discuss Spring Campaign',
        'Meeting Room 2'
    ),
    (
        3,
        '2022-01-03 10:00:00',
        60,
        'Discuss Summer Campaign',
        'zoom.link'
    ),
    (
        4,
        '2022-01-04 10:00:00',
        60,
        'New Client Meeting',
        'zoom.link'
    ),
    (
        5,
        '2022-01-05 10:00:00',
        60,
        'Figures Meeting',
        'zoom.link'
    ),
    (
        6,
        '2022-01-06 10:00:00',
        60,
        'Discuss Autumn Campaign',
        'Meeting Room'
    ),
    (
        7,
        '2022-01-07 10:00:00',
        60,
        'Discuss Winter Campaign',
        'zoom.link'
    ),
    (
        8,
        '2022-01-08 10:00:00',
        60,
        'New Client Meeting',
        'zoom.link'
    ),
    (
        9,
        '2022-01-09 10:00:00',
        60,
        'Mid Campaign Meeting',
        'zoom.link'
    ),
    (
        10,
        '2022-01-10 10:00:00',
        60,
        'End of Campaign Review',
        'zoom.link'
    );

INSERT INTO
    client_campaign (id, campaign_id, client_id)
VALUES
    (1, 1, 1),
    (2, 2, 2),
    (3, 3, 3),
    (4, 4, 4),
    (5, 5, 5);

INSERT INTO
    user_client (user_id, client_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (3, 4),
    (4, 5);