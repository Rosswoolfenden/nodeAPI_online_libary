CREATE TABLE IF NOT EXISTS messages(
    ID INT NOT NULL AUTO_INCREMENT,
    ownerId INT NOT NULL,
    bookId INT NOT NULL,
    msg VARCHAR(1000), 
    PRIMARY KEY (ID),
    FOREIGN KEY (ownerId) REFERENCES users(ID),
    FOREIGN KEY (bookId) REFERENCES books(ID)
);