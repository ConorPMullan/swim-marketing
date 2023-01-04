INSERT INTO client (id, name, email) VALUES 
(1, 'Alice Smith', 'alice.smith@example.com'),
(2, 'Bob Williams', 'bob.williams@example.com'),
(3, 'Charlie Johnson', 'charlie.johnson@example.com'),
(4, 'Dave Jones', 'dave.jones@example.com'),
(5, 'Eve Smith', 'eve.smith@example.com'),
(6, 'Frank Williams', 'frank.williams@example.com'),
(7, 'Gina Johnson', 'gina.johnson@example.com'),
(8, 'Henry Jones', 'henry.jones@example.com'),
(9, 'Irene Smith', 'irene.smith@example.com'),
(10, 'Jack Williams', 'jack.williams@example.com');


INSERT INTO campaign (id, name, start_date, end_date) VALUES 
(1, 'Spring Promotion', '2022-03-01', '2022-03-31'),
(2, 'Summer Promotion', '2022-06-01', '2022-06-30'),
(3, 'Fall Promotion', '2022-09-01', '2022-09-30'),
(4, 'Winter Promotion', '2022-12-01', '2022-12-31'),
(5, 'New Year Promotion', '2023-01-01', '2023-01-31'),
(6, 'Valentine''s Day Promotion', '2023-02-01', '2023-02-14'),
(7, 'Easter Promotion', '2023-04-01', '2023-04-30'),
(8, 'Mother''s Day Promotion', '2023-05-01', '2023-05-14'),
(9, 'Father''s Day Promotion', '2023-06-01', '2023-06-14'),
(10, 'Fourth of July Promotion', '2023-07-01', '2023-07-04');


INSERT INTO platform (id, platform_name) VALUES 
(1, 'Instagram'),
(2, 'Snapchat'),
(3, 'TikTok'),
(4, 'Facebook'),
(5, 'Youtube'),
(6, 'LinkedIn'),
(7, 'Pinterest'),
(8, 'Twitter');

INSERT INTO influencer (id, name, email, platform_id, price_per_post, is_active) VALUES 
(1, 'John Jones', 'john.jones@example.com', 1, '£100', true),
(2, 'Jane Smith', 'jane.smith@example.com', 2, '£200', true),
(3, 'Alex Williams', 'alex.williams@example.com', 3, '£300', true),
(4, 'Emily Johnson', 'emily.johnson@example.com', 4, '£400', true),
(5, 'Michael Jones', 'michael.jones@example.com', 5, '£500', true),
(6, 'Sara Smith', 'sara.smith@example.com', 6, '£600', true),
(7, 'Chris Williams', 'chris.williams@example.com', 7, '£700', true),
(8, 'Kate Johnson', 'kate.johnson@example.com', 8, '£800', true),
(9, 'Samuel Jones', 'samuel.jones@example.com', 9, '£900', true),
(10, 'Emma Smith', 'emma.smith@example.com', 10, '£1000', true),
(11, 'Adam Williams', 'adam.williams@example.com', 1, '£100', false),
(12, 'Emily Johnson', 'emily.johnson@example.com', 2, '£200', false),
(13, 'Michael Jones', 'michael.jones@example.com', 3, '£300', false),
(14, 'Sara Smith', 'sara.smith@example.com', 4, '£400', false),
(15, 'Chris Williams', 'chris.williams@example.com', 5, '£500', false),
(16, 'Kate Johnson', 'kate.johnson@example.com', 6, '£600', false),
(17, 'Samuel Jones', 'samuel.jones@example.com', 7, '£700', false),
(18, 'Emma Smith', 'emma.smith@example.com', 8, '£800', false),
(19, 'John Jones', 'john.jones@example.com', 9, '£900', false),
(20, 'Jane Smith', 'jane.smith@example.com', 10, '£1000', false);
