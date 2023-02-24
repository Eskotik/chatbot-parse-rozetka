const path = require('path')
const {db, password,port} = require(path.join(__dirname, '..', './config/bot.js'));
const {Client } = require("pg");

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    port : port,
    user : 'postgres',
    password : password,
    database : db
  }
});


const client = new Client({
  user: "postgres",
  host: "localhost",
  database: db,
  password: password,
  port: port,
});

connection()

async function connection(){
  await client.connect()
}

module.exports = {
  client,
  knex
}
