const config = require('../config');
const logger = require('../logging/WinstonLogging');
const db = require('promise-mysql'); 
const log = logger.createLogger('SQL connector');
const { v4: uuidv4 } = require('uuid');

/**
 * A function to query the database with given query and paramaters
 * @param {String} query String containing the sql query 
 * @param {Array} params Array contianing all the needed peramters
 */
exports.sqlquery = async (query, params) => {
    let connection;
    try{
        const connection = await db.createConnection(config.mariadb);
        const res = await connection.query(query, params);
        return res;
    } catch(e) { 
        const errorId = uuidv4();
        log.error(Date.now(), errorId, e )
        log.error(e);
        throw new DatabaseExeption('Database Error', e.code, errorId);
    } finally {
        if(connection) {
            log.debug('mariadb connection has ended');
            connection.end();
        }
    }
}

/**
 * A fucntion to create error codes from sql query. 
 * A fucntion to create error codes from sql query. 
 * @param {String} msg String contianing the error message
 * @param {Int} code Error code number  
 * @param {Int} id Id containing the id of the error.
 */
function DatabaseExeption(msg, code, id) {
    this.message = this.msg;
    this.code = code;
    this.id = id;
    this.name = 'DatabaseException';
}

