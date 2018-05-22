INSERT INTO posts (userid, title, body, img)
VALUES($1, $2, $3, $4)
RETURNING *;