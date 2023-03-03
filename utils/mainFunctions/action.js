const { bot } = require("../../config/bot.js");
const cron = require("node-cron");
const InsertUrl = require("../db/insertUrl.js");
const insertData = require("../db/data_db.js");
const CheckedUrl = require("../CheckingData/checked_db.js");
const { regex } = require("../../regex/regex.js");
const parse = require("../../parser/parse.js");
const checkPriceAndNotify = require("../CheckingData/checkPriceAndNotify.js");

const action = async () => {
  bot.on("message", async (msg) => {
    try {
      const chatId = msg.chat.id;
      const url = msg.text;
      const userid = msg.from.id;
      const Interval = 60 * 60 * 1000;
      if (regex.test(url)) {
        data1 = {
          value1: chatId,
          value2: url,
        };
        if ((await InsertUrl(data1, chatId)) != false) {
          await CheckedUrl(chatId);
          await parse(chatId, url, userid);
          await insertData(data);
          cron.schedule("0 8, 20 * * *", function () {
            checkPriceAndNotify(chatId, url);
          });
        }
      } else if (url !== "/start" && url !== "/start@ChatbotRozetkaBot")
        bot.sendMessage(chatId, "⛔️Дані введено не вірно, спробуйте ща раз");
    } catch (error) {
      console.error(error);
    }
  });
};
module.exports = action;
