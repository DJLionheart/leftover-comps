INSERT INTO users (authid, username, profile_pic)
VALUES ($1, $2, $3)
RETURNING *;