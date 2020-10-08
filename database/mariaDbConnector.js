const config = require('../config');
const logger = require('../logging/WinstonLogging');
const mariadb = require ('mariadb');
const log = logger.createLogger('SQL connector');

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
        log.error({Error: e});
        throw e;
    } finally {
        if(connection) {
            log.debug('db connection end');
            connection.end();
        }
    }
}