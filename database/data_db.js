const { knex } = require("./db");

async function insertData(data) {
  try {
    knex("rozetka_db")
      .insert({
        userid: data.value1,
        goodsid: data.value2,
        goodsname: data.value3,
        goodsprice: data.value4,
        goodsphoto: data.value5,
        goodsstatus: data.value6,
        goodsurl: data.value7,
      })
      .then(function (rowsInserted) {
        console.log(rowsInserted);
      })
      .catch(function (err) {
        console.error(err);
      });
  } catch (error) {
    console.error("Error inserting data: ", error);
  }
}

module.exports = insertData;
