const path = require("path");
const { bot } = require(path.join(__dirname, "..", "./config/bot.js"));

const start = async () => {
  bot.onText(/\/start/, async function (msg, match) {
    chatId = msg.chat.id;
    name1 = msg.from.first_name;
    await bot.sendMessage(
      chatId,
      "Ласкаво просимо в телеграм бот для відстеження ціни товару на площадці Rozetka\nНадішліть URL посилання після цього повідомлення:"
    );
  });
};

module.exports = start;
