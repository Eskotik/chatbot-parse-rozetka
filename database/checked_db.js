const client = require("./db")

async function CheckedUrl(){
 try {
    const query = 
    "SELECT * FROM rozetka_db INNER JOIN rozetka ON rozetka_db.goodsurl = rozetka.goodsurl AND rozetka_db.userid = rozetka.userid "
    if (await client.query(query)) {
        console.log("Data checked successfully!");
      }
      else console.log("ERROR")
 } catch (error) {
    console.error("Error inserting data: ", error);
 }   
}
module.exports = CheckedUrl