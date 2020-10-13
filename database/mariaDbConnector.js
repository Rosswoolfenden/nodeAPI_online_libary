const config = require('../config');
const logger = require('../logging/WinstonLogging');
const mariadb = require ('mariadb');
const log = logger.createLogger('SQL connector');
const { v4: uuidv4 } = require('uuid');

// gets maria db pool from config;
const pool = mariadb.createPool(config.mariadb);


// function to query mariadb database;
exports.sqlquery = async (q, params) => {
    let connection;
    try{
        connection = await pool.getConnection();
        const res = await connection.query(q, params);
        return res;
    } catch(e) {
        const errorId = uuidv4();
        log.error(Date.now(), errorId, )
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

