const mariadb = require('../database/mariaDbConnector');
const logging = require('../logging/WinstonLogging');
const { roles } = require('../permissons/roles');
const log = logging.createLogger('request Model'); 
const bookmodel =  require('./books');
const usermodel = require('./users')


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
        details.ownername =book[0].firstName;
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

exports.getRequests = async(details) => {
    const query = "SELECT * FROM messages WHERE ownerId = ? AND requesterId = ?";
    const params = [details.ownerId, details.requesterId];
    const result = await mariadb.sqlquery(query, params);
    if(!result.length) {
        return;
    } else {
        return result;
    }

} 

exports.getSent = async(details) => {
    const query = "SELECT * FROM messages WHERE requesterId = ? AND ownerId = ?";
    const params = [details.ownerId, details.requesterId];
    const result = await mariadb.sqlquery(query, params);
    if(!result.length) {
        return;
    } else {
        return result;
    }
}

exports.respond =  async(details) => {
    const updatestatus = await bookmodel.updateStatus(details.bookid, "on loan");
    console.log(updatestatus);
    if(!updatestatus.affectedRows) {
        log.error("Failed to update status");
        return;
    }

    const adress = await usermodel.getAdress(details.userid);
    if(!adress) {
        log.error("No adress ")
        return {Error: "No Adress available"};
    }
    return adress;
    // get user adress 

}

exports.getChats = async(userid) => {
    const query = "SELECT * FROM messages WHERE user"
}