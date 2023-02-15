const TelegramApi = require('node-telegram-bot-api')
const dotenv = require('dotenv').config();
const token = process.env.Api_Token
const bot = new TelegramApi(token, {polling:true})

