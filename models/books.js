const { ParamName } = require('koa-router');
const mariadb = require('../database/mariaDbConnector');
const logging = require('../logging/WinstonLogging');
const { roles } = require('../permissons/roles');
const log = logging.createLogger('Book Model');

/**
 * middleware functin to send book details to be added to the databses
 * @param {Object} book object containing the book details 
 */
exports.addBook = async (book) => {
    const q = 'INSERT INTO books SET ?';
    const result = await mariadb.sqlquery(q, book);
    if(result.affectedRows) {
        log.info('succesfully added user')
        return {ID: result.insertId, success: true, message: `succsefully added book :  ${book.title}`, ctxstatus: 201};
    } else {
        return {Error: 'Failed to add book'};
    }
}

/**
 * Function to retirve all book entrys from database */
exports.getAll = async() => {
    const q = 'SELECT * FROM books';
    const result = await mariadb.sqlquery(q, null);
    return result; 
}

/**
 * Calls sql query function to get all books where id is equal to paramaters 
 * @param {Int} bookId the bookid, uniqe identifer  
 */
exports.getId = async(bookId) => {
    const q = 'SELECT * FROM books WHERE ID = ?'
    const result = await mariadb.sqlquery(q, [bookId]);
    if(result.length === 0){
        return {Error: 'No book with this id exists in database'};
    }

    return result;
}

/**
 * 
 * @param {Int} bookId Unique Book id to identify book 
 * @param {Int} user Unique user id to identify user
 */
exports.delBook = async(bookId, user) => {
    const book = await this.getId(bookId);
    if(book.length != 1) {
        log.info('no lenght')
        return({success: false, ID: bookId, message: `Book does not exist in database`});
    }
   bookAuthorId = book[0].ownerId;
   let grant = 'deleteOwn';
   if(bookAuthorId != user.ID) {
        grant = 'deleteAny';
   }
   const permisson = roles.can(user.role)[grant]('books');
   if(!permisson.granted) 
       return({success: false, ID: bookId, message: `You do not have permission to delte book ${bookId}`});
   
        
    
    const query = 'DELETE FROM books WHERE ID = ?';
    const result = await mariadb.sqlquery(query, [bookId]);
    if(result.affectedRows) {
        log.info(`Sucsesfully delted ${bookId}`);
        return({success: true, ID: bookId, message: `Succsefully deleted book ID: ${bookId}`, ctxstatus: 201});
    } else {
        return({success: false, ID: bookId, message: `Failed to delete book ID : ${bookId}`});
    }
    
}

/**
 * Function to call sql quaery to update the selected books
 * @param {Object} updatedBook Object containing the new values for the book    
 * @param {Int} user The unique indetifier for users
 */
exports.updateBook = async(updatedBook, user) => {
    const book = await this.getId(updatedBook.ID);
    if(book.length != 1){
        log.info('no book with id : ' + updatedBook.ID);
        return({success: false, ID: updatedBook.ID, message: `Book does not exist in database`});
    }
    bookAuthorId = book[0].ownerId;
    let grant = 'deleteOwn';
    if(bookAuthorId != user.ID) {
        grant = 'deleteAny';
    }
    const permisson = roles.can(user.role)[grant]('books');
    if(!permisson.granted)
        return({success: false, ID: updatedBook.ID, message: `You do not have permission to update book ${updatedBook.ID}`});
    const query = 'UPDATE books SET ? WHERE ID = ?'
    const params = [updatedBook, updatedBook.ID];
    const result = await mariadb.sqlquery(query, params);

    if(result.affectedRows) {
        log.info(`Updated book ${updatedBook.ID}`);
        return({success: true, ID: updatedBook.ID, message: `Succesfully updated book ID: ${updatedBook.ID}`});
    } else {
        return({success: false, ID: updatedBook.ID, message: `Failed to update book ID : ${updatedBook.ID}`});
    }
}
/**
 * A function to call the sql query to update the status of a book - to on lone, or available 
 * @param {Int} bookid Uniuqe book identifier 
 * @param {String} newStatus String containing the new book status - either 'on loan' or 'available'
 */
exports.updateStatus = async(bookid, newStatus) => {
    const query = "UPDATE books SET status = ? WHERE ID = ?";
    const params = [newStatus, bookid];
    const result =  await mariadb.sqlquery(query, params);
    return result;
}

/**
 * Function to call sql query to get all books owned by a given user. 
 * @param {Int} userid Unique user identifier
 */
exports.getUserBooks = async(userid) => {
    const query = "SELECT * FROM books WHERE ownerId = ?";
    const result = await mariadb.sqlquery(query, [userid]);
    return result;
}
