INSERT INTO user (id, user_name, email, password) VALUES (1, 'John Smith', 'john.smith@gmail.com', 'password123');
INSERT INTO user (id, user_name, email, password) VALUES (2, 'Jane Smith', 'jane.smith@gmail.com', 'password456');
INSERT INTO user (id, user_name, email, password) VALUES (3, 'Bob Johnson', 'bob.johnson@gmail.com', 'password789');
INSERT INTO user (id, user_name, email, password) VALUES (4, 'Alice Williams', 'alice.williams@gmail.com', 'password123');
INSERT INTO user (id, user_name, email, password) VALUES (5, 'Chris Jones', 'chris.jones@gmail.com', 'password456');

INSERT INTO user_client (user_id, client_id)
VALUES (1, 1), (1, 2), (2, 3), (3, 4), (4, 5);

INSERT INTO appointment (id, user_client_id, scheduled_date_time, duration) VALUES
(1, 1, '2022-01-01 10:00:00', 60),
(2, 1, '2022-01-02 10:00:00', 60),
(3, 2, '2022-01-03 10:00:00', 60),
(4, 3, '2022-01-04 10:00:00', 60),
(5, 4, '2022-01-05 10:00:00', 60),
(6, 5, '2022-01-06 10:00:00', 60),
(7, 6, '2022-01-07 10:00:00', 60),
(8, 7, '2022-01-08 10:00:00', 60),
(9, 8, '2022-01-09 10:00:00', 60),
(10, 9, '2022-01-10 10:00:00', 60);

INSERT INTO client_campaign (id, campaign_id, client_id) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5);









