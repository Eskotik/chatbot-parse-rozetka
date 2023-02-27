const { bot } = require("../config/bot.js");
const InsertUrl = require("./db/insertUrl.js")
const insertData = require("./db/data_db.js");
const CheckedUrl = require("./db/checked_db.js");
const {regex} = require("../regex/regex.js");
const parse = require("../parser/parse.js");
const checkPriceAndNotify = require("./db/checkPriceAndNotify.js")

const action = async () => {
  bot.on("message", async (msg) => {
    try {
      const chatId = msg.chat.id;
      const url = msg.text;
      const userid = msg.from.id;
      const Interval =24*60*60*1000 
      if (regex.test(url)) {
        data1 = {
          value1: chatId,
          value2: url,
        };
        if (await InsertUrl(data1, chatId) !=false) {
          console.log("god1")
          if(await CheckedUrl(chatId) !=false){
          console.log("good2")}
          await parse(chatId, url, userid);
          await insertData(data);
          checkPriceAndNotify(chatId,url)
          setInterval(function() {checkPriceAndNotify(chatId,url)}, Interval);
        }
        
      } else if (url !== "/start" && url !== "/start@ChatbotRozetkaBot")
        bot.sendMessage(chatId, "⛔️Дані введено не вірно, спробуйте ща раз");
    } catch (error) {
      console.error(error);
    }
  });
};
module.exports = action;
