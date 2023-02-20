const TelegramApi = require("node-telegram-bot-api");
const dotenv = require("dotenv").config();
const token = process.env.Api_Token;
const bot = new TelegramApi(token, { polling: true });
const insertData = require("./database/db");
const { JSDOM } = require("jsdom");

bot.setMyCommands([{ command: "/start", description: "Привітання" }]);

async function parse(chatId, url, userid) {
  try {
    const dom = await JSDOM.fromURL(url);
    const d = dom.window.document;

    let goods = d.querySelector("rz-product.ng-star-inserted");
    let goodsId = parseInt(
      goods.querySelector("p.product__code.detail-code").textContent.slice(5)
    );
    let goodsName = goods.querySelector("h1.product__title").textContent.trim();
    let goodsPrice = parseInt(
      goods
        .querySelector("p.product-prices__big")
        .textContent.split(/\s+/)
        .join("")
    );
    let goodsPhoto = goods
      .querySelector("img.picture-container__picture")
      .getAttribute("src");
    let goodsStatus = goods
      .querySelector("p.status-label")
      .textContent.trim()
      .slice(0);

    data = {
      value1: userid,
      value2: goodsId,
      value3: goodsName,
      value4: goodsPrice,
      value5: goodsPhoto,
      value6: goodsStatus,
    };

    await sendData(
      chatId,
      goodsId,
      goodsPhoto,
      goodsName,
      goodsPrice,
      goodsStatus
    );
  } catch (error) {
    console.error("Error parse", error);
  }
}
async function sendData(chatId, id, photo, name, price, status) {
  await bot.sendPhoto(chatId, photo);
  bot.sendMessage(
    chatId,
    `Id товару: ${id}\nНазва: ${name}\nЦіна: ${price}₴\nСтатус: ${status}`
  );
}

const start = async () => {
  try {
  } catch (error) {
    console.error("Підключення до бази зникло", error);
  }

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const userid = msg.from.id;
    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        "Ласкаво просимо в телеграм бот для відстеження ціни товару на площадці Rozetka\nНадішліть URL посилання після цього повідомлення"
      );
    }

    try {
      const url = msg.text;
      const regex = /^https?:\/\/.*?rozetka\.com\.ua\//;
      if (regex.test(url)) {
        await parse(chatId, url, userid);
        await bot.sendMessage(chatId, "✅Дані занесено в базу");
        console.log(data);
        insertData(data);
      }
    } catch (error) {
      console.error(error);
    }
  });
};

start();
