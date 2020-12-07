const mariadb = require('../database/mariaDbConnector');
const logging = require('../logging/WinstonLogging');
const { roles } = require('../permissons/roles');
const log = logging.createLogger('request Model'); 
const bookmodel =  require('./books');
const usermodel = require('./users')


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
    const params = [details.requesterId, details.ownerId];
    // console.log(params)
    const result = await mariadb.sqlquery(query, params);
    if(!result.length) {
        return;
    } else {
        return result;
    }
}

exports.respond =  async(details) => {
    const updatestatus = await bookmodel.updateStatus(details.bookid, "on loan");
    if(!updatestatus.affectedRows) {
        log.error("Failed to update status");
        return;
    }

    const adress = await usermodel.getAdress(details.userid);
    if(!adress) {
        log.error("No adress")
        return {Error: "No Adress available"};
    }
    return adress;
    // get user adress 

}

async function getChatId(details) {
    const query = "SELECT * FROM chats WHERE ownerId=? AND requesterId=?";
    const res = await mariadb.sqlquery(query, [details.ownerId, details.requesterId]);
    if(res.length === 0) {
        return false;
    } else {
        return res[0].ID;
    }
}
async function createChat(details, title) {
    const newChat = {
        ownerId: details.ownerId,
        requesterId: details.requesterId,
        bookId: details.bookId,
        booktitle: title
    }
    const query = "INSERT INTO chats SET ?"
    const result = await  mariadb.sqlquery(query, newChat);
    if(result.affectedRows) {
        return true;
    } else{
        return false;
    }
}

exports.getChats = async(userid) => {
    const query = "SELECT * FROM chats WHERE ownerId=? or requesterId=?;"
    const chats = await mariadb.sqlquery(query, [userid, userid]);
    if(chats.length === 0 ) {
        return false;
    } else {
        return chats;
    }
}