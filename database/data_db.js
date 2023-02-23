const client = require("./db")

async function insertData(data) {
    try {
      const query =
        "INSERT INTO rozetka_db (userid, goodsid, goodsname, goodsprice, goodsphoto, goodsstatus) VALUES ($1, $2, $3, $4, $5, $6)";
      const values = [
        data.value1,
        data.value2,
        data.value3,
        data.value4,
        data.value5,
        data.value6,
      ];
      if (await client.query(query, values)) {
        console.log("Data inserted successfully!");
      }
    } catch (error) {
      console.error("Error inserting data: ", error);
    } 
  }
  module.exports = insertData