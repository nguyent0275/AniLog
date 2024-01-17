DROP DATABASE IF EXISTS anime_db;
CREATE DATABASE anime_db;

USE anime_db;

-- CREATE TABLE user (
-- id INT auto_increment primary key not null,
-- user_name varchar(30) not null,
-- pass_word varchar(30) not null,
-- email varchar(30) not null
-- );

-- CREATE TABLE anime (
-- id INT auto_increment primary key not null,
-- title varchar(255) not null
-- );

-- CREATE table category (
-- category_id INT auto_increment primary key not null,
-- category_name varchar(30) not null
-- );

-- CREATE table status (
-- id INT auto_increment primary key not null,
-- user_id INT,
-- watch_status varchar(30),
-- rating INT,
-- anime_id INT,
-- foreign key (user_id)
-- references user(id),
-- foreign key (anime_id)
-- references	anime(id)
-- );

-- CREATE table category_name (
-- id INT auto_increment primary key not null,
-- anime_name INT,
-- category_id INT,
-- foreign key (anime_name)
-- references anime(id),
-- foreign key (category_id)
-- references category(category_id)
-- );

/* 
CREATE table rating (
user_id INT,
ratings INT,
anime_id INT,
foreign key (user_id)
references user(id),
foreign key (anime_id)
references	anime(id)
); */
