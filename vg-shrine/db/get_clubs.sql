SELECT * FROM user_clubs uc
JOIN clubs c ON uc.clubid = c.clubid
WHERE uc.clubid IN (SELECT clubid FROM user_clubs WHERE userid = $1)