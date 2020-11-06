CREATE TABLE IF NOT EXISTS books (
    ID INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(32),
    rating INT,
    isbn VARCHAR(32),
    genre VARCHAR(32),
    pubDate DATE,
    ownerId INT,
    about TEXT,
    imageURL VARCHAR(2048),
    status VARCHAR(32) DEFAULT "available",
    PRIMARY KEY(ID)
);
