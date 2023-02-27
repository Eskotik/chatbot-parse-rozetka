const getLatestPriceFromDB = require("./getLatestPriceFromDB")
const parsePrice = require("../../parser/parsePrice")
const {knex } = require("../../database/db");
const { bot } = require("../../config/bot.js");

async function checkPriceAndNotify(chatId,url) {
    const priceFromSite = await parsePrice(url);
    var date = new Date();
    const priceFromDB = await getLatestPriceFromDB();
    console.log("Ok",date.toUTCString())
      if (priceFromSite !== priceFromDB) {
        try {
        bot.sendMessage(chatId, `Ціна на товар змінилась на сайті Rozetka! Нова ціна: ${priceFromSite} грн.`);
        await knex('rozetka_db').where('id', knex.raw('(SELECT MAX(id) FROM "rozetka_db")')).update({ goodsprice: priceFromSite });
          
    } catch (err) {
      console.error(err);
  }}
}
  module.exports = checkPriceAndNotify