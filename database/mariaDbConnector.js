const config = require('../config');
const logger = require('../logging/WinstonLogging');
const db = require('promise-mysql'); 
const log = logger.createLogger('SQL connector');
const { v4: uuidv4 } = require('uuid');

// function to query mariadb database;
exports.sqlquery = async (query, params) => {
    let connection;
    try{
        const connection = await db.createConnection(config.mariadb);
        const res = await connection.query(query, params);
        return res;
    } catch(e) { 
        const errorId = uuidv4();
        log.error(Date.now(), errorId, e )
        throw new DatabaseExeption('Database Error', e.code, errorId);
    } finally {
        if(connection) {
            log.debug('mariadb connection has ended');
            connection.end();
        }
    }
}


function DatabaseExeption(msg, code, id) {
    this.message = this.msg;
    this.code = code;
    this.id = id;
    this.name = 'DatabaseException';
}

