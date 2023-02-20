const dotenv = require("dotenv").config();

port = process.env.port;
password = process.env.pass;
const { Pool, Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "ChatbotRozetka",
  password: password,
  port: port,
});

async function insertData(data) {
  try {
    await client.connect();
    const query =
      "INSERT INTO db_data (userid, chatid, goodsname, goodsprice, goodsphoto, goodsstatus) VALUES ($1, $2, $3, $4, $5, $6)";
    const values = [
      data.value1,
      data.value2,
      data.value3,
      data.value4,
      data.value5,
      data.value6,
    ];
    await client.query(query, values);
    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data: ", error);
  } finally {
    await client.end();
  }
}

module.exports = insertData;
