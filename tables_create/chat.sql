CREATE TABLE IF NOT EXISTS chats(
    ID INT NOT NULL AUTO_INCREMENT,
    ownerId INT NOT NULL,
    requesterId INT NOT NULL,
    bookId INT NOT NULL,
    booktitle VARCHAR(1000),
    PRIMARY KEY (ID),
    FOREIGN KEY (ownerId) REFERENCES users(ID),

    FOREIGN KEY (requesterId) REFERENCES users(ID),
    FOREIGN KEY (bookId) REFERENCES books(ID)
);