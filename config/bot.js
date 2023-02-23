const TelegramApi = require("node-telegram-bot-api");
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.Api_Token;
const bot = new TelegramApi(token, { polling: true });
const port = process.env.port;
const password = process.env.pass;
const db = process.env.database;

module.exports = {
  bot,
  port,
  password,
  db,
};
