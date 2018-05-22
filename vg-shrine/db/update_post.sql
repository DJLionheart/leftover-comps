
UPDATE posts
SET title = $2
WHERE postid = $1;

UPDATE posts
SET img = $3
WHERE postid = $1;

UPDATE posts
SET body = $4
WHERE postid = $1;
