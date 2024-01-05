INSERT INTO anime (title)
values("atttack on titan"), ("jujutsu kaisen"), ("naruto"), ("bleach"), ("dragonball")

INSERT INTO category(category_name)
values('action'),('adventure'),('comedy'),('romance'),('slice of life')

INSERT INTO user(user_name,pass_word,email)
values('torappyu','sadasdafsdf', 'toan@gmail.com'),
('ben','sadasdf', 'ben@gmail.com'),
('peter','dasdafsdf', 'peter@gmail.com'),
('james','sadasdadf', 'james@gmail.com')

INSERT INTO status(user_id,watch_status,rating,anime_id)
VALUES(1, 'completed', 10, 1),
(1, 'watching', 8, 2),
(1, 'planning', null, 3),
(1, 'dropped', 2, 1),
(1, 'completed', 9, 5),
(2, 'watching', 7, 1),
(2, 'dropped', 2, 2),
(2, 'completed', 9, 3),
(2, 'dropped', 3, 1),
(2, 'planning', null, 5),
(3, 'planning', null, 1),
(3, 'planning', null, 2),
(3, 'planning', null, 3),
(3, 'planning', null, 1),
(3, 'watching', 6, 5),
(4, 'completed', 5, 1),
(4, 'completed', 7, 2),
(4, 'completed', 6, 3),
(4, 'completed', 10, 1),
(4, 'completed', 3, 5)

INSERT INTO category_name(anime_name,category_id)
VALUES(1,1),
(1,2),
(2,1),
(2,2),
(2,3),
(3,1),
(3,2),
(3,3),
(4,1),
(4,2),
(4,3),
(5,1),
(5,2),
(5,3),
(5,4)

-- retrieves all the columns from all the tables 
SELECT * FROM user LEFT JOIN status on status.user_id = user.id LEFT JOIN anime on status.anime_id = anime.id LEFT JOIN category_name ON
category_name.anime_name = anime.id LEFT JOIN category ON category.category_id = category_name.category_id;

-- retrieve every user's list
SELECT user.user_name, status.watch_status, status.rating, anime.title FROM user 
LEFT JOIN status on status.user_id = user.id
LEFT JOIN anime on status.anime_id = anime.id;

-- retrieve an individual user's list by id
SELECT user.user_name, status.watch_status, status.rating, anime.title FROM user 
LEFT JOIN status on status.user_id = user.id
LEFT JOIN anime on status.anime_id = anime.id
WHERE user.id = 1;

-- order by score/watchstatus/or title(a-z)
SELECT user.user_name, status.watch_status, status.rating, anime.title FROM user 
LEFT JOIN status on status.user_id = user.id
LEFT JOIN anime on status.anime_id = anime.id
WHERE user.id = 1
ORDER BY anime.title asc;
-- ORDER BY watch_status;
-- ORDER BY rating desc;

-- retrieve list of animes by their category
 SELECT category_name, anime.title FROM anime
 LEFT JOIN category_name ON anime.id = category_name.anime_name
 LEFT JOIN category ON category_name.category_id = category.category_id
 ORDER BY category.category_name;