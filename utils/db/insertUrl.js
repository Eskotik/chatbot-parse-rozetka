﻿const { knex } = require("../../database/db.js");
const { bot } = require("../../config/bot.js");

async function InsertUrl(data, chatId) {
  try {
    const existingRecord = await knex("rozetka")
      .where({
        userid: data.value1,
        goodsurl: data.value2,
      })
      .first();
    if (existingRecord) {
      await bot.sendMessage(
        chatId,
        "Надіслано дублюючі дані, спробуйте ще раз"
      );
      console.log("Record with these values already exists in the table!");
      return false
    } else {
      await knex("rozetka").insert({
        userid: data.value1,
        goodsurl: data.value2,
      });
      return true
    }
  } catch (error) {
    console.error("Error InsertUrl data: ", error);
  }
}
module.exports = InsertUrl;
