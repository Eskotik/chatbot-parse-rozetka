const getPricefromdb = require("../db/getLatestPriceFromDB");
const parsePrice = require("../../parser/parsePrice");
const { knex } = require("../../database/db");
const { bot } = require("../../config/bot.js");

async function checkPriceAndNotify(chatId, url) {
  const priceFromSite = await parsePrice(url);
  var date = new Date();
  const priceFromDB = await getPricefromdb(url);
  const goodsUrl = url;
  console.log("Ok", chatId, date.toUTCString());
  if (priceFromSite !== priceFromDB) {
    try {
      bot.sendMessage(
        chatId,
        `Ціна на товар змінилась на сайті Rozetka! Нова ціна: ${priceFromSite} грн.\n ${goodsUrl}`
      );
      await knex("rozetka_db")
        .where("goodsurl", goodsUrl)
        .update({ goodsprice: priceFromSite });
      console.log("Price updated in the database");
    } catch (err) {
      console.error(err);
    }
  }
}
module.exports = checkPriceAndNotify;
