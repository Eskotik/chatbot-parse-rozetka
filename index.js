const TelegramApi = require('node-telegram-bot-api')
const dotenv = require('dotenv').config();
const token = process.env.Api_Token
const bot = new TelegramApi(token, {polling:true})
const sequelize = require('./database/db');


bot.setMyCommands([
    {command: '/start', description: 'Привітання'},
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
             bot.sendMessage(chatId, "Ласкаво просимо в телеграм бот для відстеження ціни товару на площадці Rozetka")
             bot.sendMessage(chatId, 'Надішліть URL посилання після цього повідомлення')
        }
            
          try{
            console.log(msg)
            const url = msg.text
           
            if (/^https?:\/\/rozetka\.com\.ua\//.test(url)){
                return bot.sendMessage(chatId, url);
            }
            else{ return bot.sendMessage(chatId, "error")}
            
          } catch(e){
            bot.sendMessage(chatId, message.error())
          }
        })
}

start()