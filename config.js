module.exports = {
    port: 9999,
    mariadb: {
        client: 'mysql',
        connection: {
          host: process.env.DB_HOST || 'localhost',
          port: process.env.DB_PORT || '3306',
          user: process.env.DB_USER || 'ross',
          password: process.env.DB_PW || 'qwerty',
          database: process.env.DB_NAME || 'smart_home'
        },
        pool: { min: 0, max: 5 }
      },
}                 