const path = require('path')
const {db, password,port} = require(path.join(__dirname, '..', './config/bot.js'));
const {Client } = require("pg");

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

module.exports = client;
