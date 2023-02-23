const path = require("path");
const { bot } = require(path.join(__dirname, "..", "./config/bot.js"));
const  {insertData, CheckUrl}  = require(path.join(__dirname, "..", "./database/data_db.js"));
const { regex,startcommand } = require(path.join(__dirname, "..", "./regex/regex.js"));
const  parse  = require(path.join(__dirname, "..", "./parser/parse.js"));

const action = async () => {
    bot.on("message", async (msg) => {
      try {
        const chatId = msg.chat.id;
        console.log(msg);
        const url = msg.text;
        const userid = msg.from.id;
        
        if (regex.test(url)) { 
            data1 = {
                value1:chatId,
                value2:url
                }
          await parse(chatId, url, userid);
          CheckUrl(data1)
          await insertData(data);
          console.log(data);
          await bot.sendMessage(chatId, "✅Дані занесено в базу");
        }
        else if(!startcommand.test(url)) await bot.sendMessage(chatId, "⛔️Дані введено не вірно, спробуйте ща раз")
      } catch (error) {
        console.error(error);
      }
    });
  };
  module.exports = action