const { knex } = require("../../database/db.js");

async function getLatestPriceFromDB() {
  try {
    const result = await knex("rozetka_db")
      .select("goodsprice")
      .where("id", knex.raw('(SELECT MAX(id) FROM "rozetka_db")'));
    return result[0].goodsprice;
  } catch (err) {
    console.error(err);
  }
}
module.exports = getLatestPriceFromDB;
