const mariadb = require('../database/mariaDbConnector');
const logging = require('../logging/WinstonLogging');
const { roles } = require('../permissons/roles');
const log = logging.createLogger('request Model'); 
const bookmodel =  require('./books');
const usermodel = require('./users')

/**
 * A function to request book from the database - creates chat when nesscary 
 * @param {Object} details An object containing the request details 
 */
exports.bookRequest = async (details) => {
    // check book not on loan
    const book = await bookmodel.getId(details.bookId);
    
   
    if(!book.length) {
        log.error("Book Does not exist")
        return book;
    } else {
        
        details.ownerId = book[0].ownerId;
        details.ownername =book[0].firstName;
        // urn details;
    }
    let chatId = await getChatId(details);
    if(!chatId) {
        log.info("no chat id - creating now");
            await createChat(details, book[0].title);
         chatId = await getChatId(details);
    }
    details.chatId = chatId;
    const query = 'INSERT INTO messages SET ?';
    const result =await mariadb.sqlquery(query, details);
    if(result.affectedRows) {
        return {Success: true, Message: "Book Request message sent"}
    } else {
        return;
    }
    // 
}

/**
 * 
 * @param {Object} details Object containing the detials of the request 
 */
exports.respond =  async(bookid) => {
    const updatestatus = await bookmodel.setOnLoan(bookid);
    if(!updatestatus.affectedRows) {
        console.log(updatestatus);
        log.error("Failed to update status");
        return;
    }
    return true;
    // get user adress 

}

/**
 * A function to get to chat id if it exits, else returns false
 * @param {Object} details An object of the detials of the chat 
 */
async function getChatId(details) {
    const query = "SELECT * FROM chats WHERE ownerId=? AND requesterId=?";
    const res = await mariadb.sqlquery(query, [details.ownerId, details.requesterId]);
    if(res.length === 0) {
        return false;
    } else {
        return res[0].ID;
    }
}

/**
 * A function to create a new chat for a book request
 * @param {Object} details An object containing other details about the request
 * @param {String} title Title of the book requested 
 */
async function createChat(details, title) {
    console.log(details);
    const newChat = {
        ownerId: details.ownerId,
        requesterId: details.requesterId,
        bookId: details.bookId,
        booktitle: title,
    }
    const query = "INSERT INTO chats SET ?"
    const result = await  mariadb.sqlquery(query, newChat);
    if(result.affectedRows) {
        return true;
    } else{
        return false;
    }
}

/**
 * Function to get all messages from a given chat
 * @param {Int} chatId int of the chat id 
 */
exports.getChatFromId = async(chatId) => {
    const query = "SELECT * FROM messages WHERE chatid = ?";
    const result = await mariadb.sqlquery(query, [chatId]);
    console.log(result);
    return result;
}

/**
 * Function to get 
 * @param {Int} userid  id of the user 
 */
exports.getChats = async(userid) => {
    const query = "SELECT * FROM chats WHERE ownerId=? or requesterId=?;"
    const chats = await mariadb.sqlquery(query, [userid, userid]);
    if(chats.length === 0 ) {
        return false;
    } else {
        return chats;
    }
}

/**
 * A function to insert message into databsae
 * @param {Object} message Object containing message detisl
 */
exports.sendMsg = async(message) => {
    const query = 'INSERT INTO messages SET ?';
    const result = await mariadb.sqlquery(query, message);
    return result;
    
   //  const chatdetails =  
}

/**
 * A fucntiion to reutnr the adress of given user
 * @param {Int} userid User indentifyer 
 */
exports.getUserAdress = async(userid) => {
    const adress = await usermodel.getAdress(userid);
    return adress;
}

