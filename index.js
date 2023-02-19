const TelegramApi = require("node-telegram-bot-api");
const dotenv = require("dotenv").config();
const token = process.env.Api_Token;
const bot = new TelegramApi(token, { polling: true });
const sequelize = require("./database/db");
const { JSDOM } = require("jsdom");

bot.setMyCommands([{ command: "/start", description: "Привітання" }]);

async function parse(chatId, url, userid) {
  try {
    const dom = await JSDOM.fromURL(url);
    const d = dom.window.document;
    let goods = d.querySelector("rz-product.ng-star-inserted");
    let goodsId = goods.querySelector(
      "p.product__code.detail-code"
    ).textContent.slice(5)
    let goodsName = goods.querySelector("h1.product__title").textContent;
    let goodsPrice = parseFloat(goods
      .querySelector("p.product-prices__big")
      .textContent.split(/\s+/)
      .join(""));
    let goodsPhoto = goods
      .querySelector("img.picture-container__picture")
      .getAttribute("src");
    let goodsStatus = goods.querySelector("p.status-label").textContent;
  data = {
    value1: userid,
    value2: goodsId,
    value3: goodsName,
    value4: goodsPrice,
    value5: goodsPhoto,
    value6: goodsStatus
}
    bot.sendMessage(
      chatId,
      `Id юзера:${userid}\nId товару:${goodsId}\nНазва:${goodsName}\nЦіна: ${goodsPrice}₴\nСтатус:${goodsStatus}`
    );
  } catch (e) {
    bot.sendMessage("Error");
  }
}

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (e) {
    console.log("Підключення до бази зникло");
  }

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const userid = msg.from.id;
    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        "Ласкаво просимо в телеграм бот для відстеження ціни товару на площадці Rozetka"
      );
      await bot.sendMessage(
        chatId,
        "Надішліть URL посилання після цього повідомлення"
      );
    }

    try {
      const url = msg.text;
      console.log(msg)
      if (/^https?:\/\/.*?rozetka\.com\.ua\//.test(url)) {
        await parse(chatId, url, userid);
        bot.sendMessage(chatId, "✅Дані занесено в базу");

      }
    } catch (e) {
      bot.sendMessage(chatId, "Error");
    }
  });
};

start();