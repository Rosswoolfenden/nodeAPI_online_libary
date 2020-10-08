const config = require('../config');
const logger = require('../logging/WinstonLogging');
const mariadb = require ('mariadb');
// const mariaPool = require('../mariaDB/mariaPool');
const log = logger.createLogger('SQL connector');

// const pool1 = mariadb.createPool({
//     host: config.mariadb.host,
//     port: config.mariadb.port,
//     user: config.mariadb.user,
//     password: config.mariadb.password,
//     database: config.mariadb.database,
//     connectionLimit: 5,
// });
const pool1 = mariadb.createPool(config.mariadb);


const pool = mariadb.createPool({
    host: 'localhost',
    user: '304backend',
    port: '3306',
    password: 'qwerty',
    database: '304libary',
    connectionLimit: 5
    });

// // const pool2 = mariadb.createPool({
// //     host: '172.17.0.1',
// //     user: root,
// //     da
// // });

async function getConnections() {
    try {
        console.log('the pool is is ' + pool1 );
        return ;
        // return pool1.getConnection();
    } catch (e){
        log.error('failed to get connection');
        throw e;
    }
    
}

exports.query = async (q, params) => {
    log.info('i have been called');
    let connection;
    try{
        log.info('we got this far');
        connection = await getConnections();
        log.info('connection is ' + connection);
       // const res = await connection.query(q, params);
       // log.info('res is ' + res.key);
      //  return res;
    } catch(e) {
        log.error({Error: e});
        throw e;
    } finally {
        if(connection) {
            log.debug('ending connection')
            connection.end();
        }
    }
}