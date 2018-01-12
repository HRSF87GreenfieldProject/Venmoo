DROP DATABASE IF EXISTS venmoo;

CREATE DATABASE venmoo;

\connect venmoo;

DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  password VARCHAR(30) NOT NULL,
  balance MONEY NOT NULL
);

CREATE TABLE transactions (
  id SERIAL NOT NULL PRIMARY KEY,
  sender_id INT references users(id),
  receiver_id INT references users(id),
  amount MONEY NOT NULL,
  status VARCHAR(12) NOT NULL,
  type VARCHAR(10) NOT NULL,
  created_timestamp timestamp NOT NULL,
  resolved_timestamp timestamp,
  description VARCHAR(200)
);

-- INSERT DUMMY DATA
INSERT INTO users(name, password, balance) VALUES('annie', '123', 100);
INSERT INTO users(name, password, balance) VALUES('bonnie', '123',  120);
INSERT INTO users(name, password, balance) VALUES('connie', '123',  0);
INSERT INTO users(name, password, balance) VALUES('donny', '123', 50);
INSERT INTO users(name, password, balance) VALUES('eddie', '123', 71);
INSERT INTO users(name, password, balance) VALUES('freddy', '123',  65);
INSERT INTO users(name, password, balance) VALUES('geddy', '123', 88);

INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(1,2,48,'approved','payment','2018-01-01 4:05:06', '2018-01-01 4:05:06');
INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(1,2,153,'approved','request','2018-01-02 4:05:15', '2018-01-02 15:21:00');
INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(1,2,6,'approved','request','2018-01-02 6:00:00', '2018-01-05 0:00:01');
INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(2,1,25,'approved','payment','2018-01-02 7:00:00', '2018-01-02 7:00:00');
INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(5,6,73,'approved','request','2018-01-03 7:00:00', '2018-01-08 12:25:00');
INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(5,7,173,'canceled','request','2018-01-03 10:15:11', '2018-01-04 5:00:00');
INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(6,7,98,'approved','payment','2018-01-03 10:15:11', '2018-01-03 10:15:11');
INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(7,1,39,'approved','payment','2018-01-03 13:51:00', '2018-01-03 13:51:00');
INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(1,7,171,'approved','payment','2018-01-04 13:51:00', '2018-01-04 13:51:00');
INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(2,3,74,'declined','request','2018-01-04 17:51:00', '2018-01-05 12:12:12');
INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(3,2,47,'approved','payment','2018-01-04 17:51:00', '2018-01-04 17:51:00');
INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(3,4,34,'declined','request','2018-01-04 13:51:00', '2018-01-04 23:23:23');
INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(4,6,64,'pending','request','2018-01-05 02:51:00', null);
INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(6,5,37,'pending','request','2018-01-05 03:51:00', null);
INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(5,6,88,'canceled','request','2018-01-05 13:52:11', '2018-01-08 14:15:14');
INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(6,7,53,'approved','payment','2018-01-05 13:52:12', '2018-01-05 13:52:12');
INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(6,7,10,'approved','request','2018-01-05 13:52:13', '2018-01-08 14:14:14');
INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(7,6,148,'pending','request','2018-01-05 13:52:14', null);
INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(4,3,188,'pending','request','2018-01-05 13:52:15', null);
INSERT INTO transactions(sender_id, receiver_id, amount, status, type, created_timestamp, resolved_timestamp) VALUES(2,3,91,'approved','payment','2018-01-05 13:52:16', '2018-01-05 13:52:16');
