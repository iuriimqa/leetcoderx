require('dotenv').config();

// console.log(process.env.DB_PORT);


const database = require('knex')({
    client: 'pg',
    connection: {
      host : process.env.DB_HOST,
      port : process.env.DB_PORT,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
    }
  });
  
  

module.exports = database;