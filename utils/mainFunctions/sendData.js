const { bot } = require("../../config/bot.js");

async function sendData(chatId, id, photo, name, price, status) {
  await bot.sendPhoto(chatId, photo);
  bot.sendMessage(
    chatId,
    `Id товару: ${id}\nНазва: ${name}\nЦіна: ${price}₴\nСтатус: ${status}`
  );
}

module.exports = sendData;
