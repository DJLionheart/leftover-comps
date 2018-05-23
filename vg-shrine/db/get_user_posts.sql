SELECT count(*) FROM posts
WHERE postid IN (SELECT postid WHERE userid = $1)