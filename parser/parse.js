const { JSDOM } = require("jsdom");
const path = require("path");
const sendData = require(path.join(__dirname, "..", "./helpers/helper1.js"));

async function parse(chatId, url, userid) {
  try {
    const dom = await JSDOM.fromURL(url);
    const d = dom.window.document;
    let goods = d.querySelector("rz-product.ng-star-inserted");
    let goodsId = parseInt(
      goods.querySelector("p.product__code.detail-code").textContent.slice(5)
    );
    let goodsName = goods.querySelector("h1.product__title").textContent.trim();
    let goodsPrice = parseInt(
      goods
        .querySelector("p.product-price__big")
        .textContent.split(/\s+/)
        .join("")
    );
    let goodsPhoto = goods
      .querySelector("img.picture-container__picture")
      .getAttribute("src");
    let goodsStatus = goods
      .querySelector("p.status-label")
      .textContent.trim()
      .slice(0);
    data = {
      value1: userid,
      value2: goodsId,
      value3: goodsName,
      value4: goodsPrice,
      value5: goodsPhoto,
      value6: goodsStatus,
      value7: url,
    };

    await sendData(
      chatId,
      goodsId,
      goodsPhoto,
      goodsName,
      goodsPrice,
      goodsStatus
    );
  } catch (error) {
    console.error("Error parse:", error);
  }
}

module.exports = parse;