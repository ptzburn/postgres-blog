CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer default 0
);

INSERT INTO blogs (title, url)
VALUES ('Third Test', 'https://www.thirdtest.de');

INSERT INTO blogs (title, url, author)
VALUES ('Asynchronous II', 'https://www.duelecorazon.es', 'Dr Emil Corazón');