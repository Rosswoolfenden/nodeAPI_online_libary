CREATE TABLE IF NOT EXISTS users (
    ID INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(32),  
    lastName VARCHAR(32),
    username VARCHAR(16) NOT NULL,
    about TEXT,
    dateRegistered DATETIME DEFAULT CURRENT_TIMESTAMP,
    password VARCHAR(32),  
    passwordSalt VARCHAR(16),  
    email VARCHAR(64) UNIQUE NOT NULL,
    avatarURL VARCHAR(64),
    adress TEXT,
    ownedBooks int,
    role VARCHAR(32) DEFAULT "basic",
    PRIMARY KEY (ID)
);