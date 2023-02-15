const TelegramApi = require('node-telegram-bot-api')
const dotenv = require('dotenv').config();
const token = process.env.Api_Token
const bot = new TelegramApi(token, {polling:true})
const sequelize = require('./database/db')

const start = async ()  => {
    try {
        await sequelize.authenticate()
        await sequelize.sync();
    } catch (e) {
        console.log('Підключення до бази зникло')
    }
    
}
start()