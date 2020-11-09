const mariadb = require('../database/mariaDbConnector');
const logging = require('../logging/WinstonLogging');


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
    return result;
}