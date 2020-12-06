const mariadb = require('../database/mariaDbConnector');
const logging = require('../logging/WinstonLogging');
const { roles } = require('../permissons/roles');
const log = logging.createLogger('request Model'); 
const bookmodel =  require('../models/books');


exports.bookRequest = async (details) => {
    // check book not on loan
    console.log(details);
    const book = await bookmodel.getId(details.bookId);
    console.log(book);
    if(!book.length) {
        log.error("Book Does not exist")
        return book;
    } else {
        log.info("Book Exists");
        details.ownerId = book[0].ownerId;
        // urn details;
    }


    const query = 'INSERT INTO messages SET ?';
    const result =await mariadb.sqlquery(query, details);
    console.log(result);
    if(result.affectedRows) {
        log.info("Sent message ");
        return {Success: true, Message: "Book Request message sent"}
    } else {
        return;
    }

    // 
}

async function checkAvailability(bookID) {
    
}