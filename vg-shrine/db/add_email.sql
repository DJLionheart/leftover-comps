INSERT INTO user_contact (userid, email_address)
VALUES ($1, $2)
RETURNING *;