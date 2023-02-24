const { knex } = require("./db");
const path = require("path");
const { bot } = require(path.join(__dirname, "..", "./config/bot.js"));

async function CheckedUrl(chatId) {
  knex("rozetka_db")
    .insert(function () {
      this.select(
        knex.raw("t1.id + 1 as id"),
        knex.raw("CAST(t2.userid AS BIGINT)"),
        knex.raw("CAST(t1.goodsid AS BIGINT)"),
        "t1.goodsphoto",
        "t1.goodsname",
        "t1.goodsprice",
        "t1.goodsstatus",
        "t2.goodsurl"
      )
        .from("rozetka_db as t1")
        .join("rozetka as t2", function () {
          this.on("t1.userid", "!=", "t2.userid").andOn(
            "t1.goodsurl",
            "=",
            "t2.goodsurl"
          );
        })
        .whereNotExists(function () {
          this.select("*")
            .from("rozetka_db")
            .whereRaw("t1.userid = t2.userid")
            .andWhereRaw("t1.goodsurl = t2.goodsurl");
        })
        .returning("id")
        .then(function (ids) {
          console.log("Data inserted successfully with id:", ids[0]);
        });
      bot.sendMessage(chatId, "Дані записано в rozetka");
      return true
    })
    .catch(function (error) {
      console.error("Error1:", error);
      return false
    });
}
module.exports = CheckedUrl;
