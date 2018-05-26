SELECT * FROM user_clubs uc
JOIN clubs c ON uc.clubid = c.clubid
WHERE uc.userid = $1 AND c.clubid = $2;