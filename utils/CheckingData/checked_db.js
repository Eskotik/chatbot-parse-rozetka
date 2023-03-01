const { knex } = require("../../database/db");
const { bot } = require("../../config/bot.js");

async function CheckedUrl(chatId) {
  knex("rozetka_db")
    .insert(function () {
      this.select(
        knex.raw("nextval('rozetka_db_id_seq') AS id"),
        knex.raw("CAST(t1.userid AS BIGINT) AS userid"),
        knex.raw("CAST(t1.goodsid AS BIGINT) AS goodsid"),
        "t1.goodsphoto",
        "goodsname",
        "t1.goodsprice",
        "t1.goodsstatus",
        knex.raw("CAST(t2.goodsurl AS TEXT) AS goodsurl")
      )
        .from("rozetka_db as t1")
        .join("rozetka as t2", function () {
          this.on("t1.userid", "!=", "t2.userid").andOn(
            "t1.goodsurl",
            "=",
            "t2.goodsurl"
          )
        })
        .whereNotExists(function () {
          this.select("*")
            .from("rozetka_db")
            .whereRaw("t1.userid != t2.userid")
            .andWhereRaw("t1.goodsurl = t2.goodsurl");
        })
    })
    .catch(function (error) {
      console.error("Error insert data:", error);
      return false
    });
}
module.exports = CheckedUrl;
