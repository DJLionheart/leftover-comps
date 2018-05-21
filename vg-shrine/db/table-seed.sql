CREATE TABLE IF NOT EXISTS users (
    userid SERIAL PRIMARY KEY,
    username VARCHAR(60) NOT NULL,
    pass VARCHAR(25) NOT NULL,
    profile VARCHAR(100)
);

