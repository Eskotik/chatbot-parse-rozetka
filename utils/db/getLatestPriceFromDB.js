const { knex } = require("../../database/db");

async function getPricefromdb(url) {
  try {
    const rows = await knex("rozetka_db")
      .select("goodsprice")
      .where("goodsurl", url);
      
    if (rows.length > 0) {

      return rows[0].goodsprice;
    } else {
      console.log("No matching rows found");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving data: ", error);
    return null;
  }
}

module.exports = getPricefromdb;
