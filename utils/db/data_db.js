const { knex } = require("../../database/db");

async function insertData(data) {
  try {
     knex("rozetka_db")
    .select()
    .where({
      userid: data.value1,
      goodsid: data.value2,
      goodsname: data.value3,
      goodsprice: data.value4,
      goodsphoto: data.value5,
      goodsstatus: data.value6,
      goodsurl: data.value7,
    })
    .then(function (rows) {
      if (rows.length === 0) {
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
      } else {
        console.log("Record already exists in the table");
      }
    })

  } catch (error) {
    console.error("Error inserting data: ", error);
  }
}

module.exports = insertData;
