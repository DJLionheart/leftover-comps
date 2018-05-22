CREATE TABLE IF NOT EXISTS users (
    userid SERIAL PRIMARY KEY,
    authid TEXT NOT NULL,
    username VARCHAR(60) NOT NULL,
    profile_pic VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS posts (
    postid SERIAL PRIMARY KEY,
    userid INT REFERENCES users(userid),
    title VARCHAR(60) NOT NULL,
    body VARCHAR(200) NOT NULL,
    img VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS fav_posts (
    userid INT REFERENCES users(userid),
    postid INT REFERENCES posts(postid)
);

