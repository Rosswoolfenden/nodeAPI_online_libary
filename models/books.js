const mariadb = require('../database/mariaDbConnector');
const logging = require('../logging/WinstonLogging');
const { roles } = require('../permissons/roles');



const log = logging.createLogger('Book Model');

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

exports.getAll = async() => {
    const q = 'SELECT * FROM books';
    const result = await mariadb.sqlquery(q, null);
    return result; 
}

exports.getId = async(bookId) => {
    const q = 'SELECT * FROM books WHERE ID = ?'
    const result = await mariadb.sqlquery(q, [bookId]);
    if(result.length === 0){
        return {Error: 'No book with this id exists in database'};
    }

    return result;
}

exports.delBook = async(bookId, user) => {
    book = await this.getId(bookId);
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
   
        
    
    const q = 'DELETE FROM books WHERE ID = ?';
    const result = await mariadb.sqlquery(q, [bookId]);
    if(result.affectedRows) {
        log.info(`Sucsesfully delted ${bookId}`);
        return({success: true, ID: bookId, message: `Succsefully deleted book ID: ${bookId}`, ctxstatus: 201});
    } else {
        return({success: false, ID: bookId, message: `Failed to delete book ID : ${bookId}`});
    }
    
}

