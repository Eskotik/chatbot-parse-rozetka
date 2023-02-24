const path = require("path");
const { bot } = require(path.join(__dirname, "..", "./config/bot.js"));
const InsertUrl = require(path.join(
  __dirname,
  "..",
  "./database/insertUrl.js"
));
const insertData = require(path.join(__dirname, "..", "./database/data_db.js"));
const CheckedUrl = require(path.join(
  __dirname,
  "..",
  "./database/checked_db.js"
));
const regex = require(path.join(
  __dirname,
  "..",
  "./regex/regex.js"
));
const parse = require(path.join(__dirname, "..", "./parser/parse.js"));

const action = async () => {
  bot.on("message", async (msg) => {
    try {
      const chatId = msg.chat.id;
      console.log(msg);
      const url = msg.text;
      const userid = msg.from.id;

      if (regex.test(url)) {
        data1 = {
          value1: chatId,
          value2: url,
        };
        if ((await InsertUrl(data1, chatId)) === true) {
          await CheckedUrl(chatId);
        } else {
          await parse(chatId, url, userid);
          await insertData(data);
        }
      } else if (url !== "/start" && url !== "/start@ChatbotRozetkaBot")
        bot.sendMessage(chatId, "⛔️Дані введено не вірно, спробуйте ща раз");
    } catch (error) {
      console.error(error);
    }
  });
};
module.exports = action;
