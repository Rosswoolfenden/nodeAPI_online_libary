const mariadb = require('../database/mariaDbConnector');
const logging = require('../logging/WinstonLogging');
const log = logging.createLogger('admin model');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
// const bookSql = require('../tables_create/bookstable');
/**
 * a function to call other functions to create dtabases tables
 */
exports.createDatabase =  async() => {
   const rootdir = process.cwd();
   await createBooksTable(rootdir);
   await createUserTable(rootdir);
   await createUserBookTable(rootdir);
}
/**
 * 
 * @param {string} rootdir Root directory to find tables files
 */
async function createBooksTable(rootdir){
   const sql = fs.readFileSync(rootdir + '/tables_create/bookstable.sql').toString();
   const result = await mariadb.sqlquery(sql, null);
}

/**
 * 
 * @param {String} rootdir Root directory to find tables files 
 */
async function createUserTable(rootdir) {
   const sql = fs.readFileSync(rootdir + '/tables_create/usertable.sql').toString();
   const result = await mariadb.sqlquery(sql, null);
}

/**
 * 
 * @param {String} rootdir Root directory to find tables files 
 */
async function createUserBookTable(rootdir){
   const sql = fs.readFileSync(rootdir + '/tables_create/ownedBooks.sql').toString();
   const result = await mariadb.sqlquery(sql, null);
}