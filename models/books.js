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
    if(result.lenght === 0){
        return {Error: 'No book with this id exists in database'};
    }

    return result;
}

exports.delBook = async(bookId, userID) => {
    book = await this.getId(bookId);
    
    const q = 'DELETE FROM books WHERE ID = ?';
    const result = await mariadb.sqlquery(q, [bookId]);
    if(result.affectedRows) {
        log.info(`Sucsesfully delted ${bookId}`);
        return({success: true, ID: bookId, message: `Succsefully deleted book ID: ${bookId}`, ctxstatus: 201});
    } else {
        return({success: false, ID: bookId, message: `Failed to delete book ID : ${bookId}`});
    }
    
}

// async function hasPermission(permission, )