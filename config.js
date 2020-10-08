exports.info = {
    port: 9999,
      // host: 'localhost',
      // user: '304backend',
      // port: '3306',
      // password: 'qwerty',
      // database: '304libary',
      // connectionLimit: 5
}      

exports.mariadb = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3306',
  user: process.env.DB_USER || '304libary',
  password: process.env.DB_PW || 'qwerty',
  database: process.env.DB_NAME || '304libary',
  connectionLimit: 5
  }