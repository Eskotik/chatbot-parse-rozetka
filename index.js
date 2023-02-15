const TelegramApi = require('node-telegram-bot-api')
const dotenv = require('dotenv').config();
const token = process.env.Api_Token
const bot = new TelegramApi(token, {polling:true})
const sequelize = require('./database/db')

bot.setMyCommands([
    {command: '/start', description: 'Початкове привітання'},
    {command: '/action', description: 'Виконання дій'}
])

const start = async ()  => {
    try {
        await sequelize.authenticate()
        await sequelize.sync();
    } catch (e) {
        console.log('Підключення до бази зникло')
    }
    bot.on('message',async msg =>{
        const text = msg.text;
        const chatId = msg.chat.id;
        
        if(text === '/start') {
            return bot.sendMessage(chatId, "Ласкаво просимо в телеграм бот для відстеження ціни товару на площадці Rozetka")
        }
    })
    
}

start()