const start = require("./helpers/helper2");
const insertData = require("./database/db");
const { bot } = require("./config/bot");
const { regex } = require("./regex/regex");
const parse = require("./parser/parse");

bot.setMyCommands([{ command: "/start", description: "Привітання" }]);

const action = async () => {
  bot.on("message", async (msg) => {
    try {
      chatId = msg.chat.id;
      const url = msg.text;
      console.log(msg);

      const userid = msg.from.id;
      if (regex.test(url)) {
        await parse(chatId, url, userid);
        await insertData(data);
        console.log(data);
        await bot.sendMessage(chatId, "✅Дані занесено в базу");
      }
    } catch (error) {
      console.error(error);
    }
  });
};

start();
action();
