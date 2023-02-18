const TelegramApi = require("node-telegram-bot-api");
const dotenv = require("dotenv").config();
const token = process.env.Api_Token;
const bot = new TelegramApi(token, { polling: true });
const sequelize = require("./database/db");
const { JSDOM } = require("jsdom");

bot.setMyCommands([{ command: "/start", description: "Привітання" }]);

async function parse(chatId, url) {
  try {
    const dom = await JSDOM.fromURL(url);
    const d = dom.window.document;
    let goods = d.querySelector("rz-product.ng-star-inserted");
    let goodsId = goods.querySelector(
      "p.product__code.detail-code"
    ).textContent;
    let goodsName = goods.querySelector("h1.product__title").textContent;
    let goodsPrice = goods
      .querySelector("p.product-prices__big")
      .textContent.split(/\s+/)
      .join("");
    let goodsPhoto = goods
      .querySelector("img.picture-container__picture")
      .getAttribute("src");
    let goodsStatus = goods.querySelector("p.status-label").textContent;

    bot.sendMessage(
      chatId,
      `id товару:${goodsId.slice(5)}\n
      Назва:${goodsName}\n
      Ціна: ${parseFloat(goodsPrice)}₴\n
      Статус:${goodsStatus}`
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

      if (/^https?:\/\/rozetka\.com\.ua\//.test(url)) {
        await parse(chatId, url);
      }
    } catch (e) {
      bot.sendMessage(chatId, "Error");
    }
  });
};

start();
