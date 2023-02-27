const jsdom = require('jsdom');
const { JSDOM } = jsdom;

async function parsePrice(url) {
  const dom = await JSDOM.fromURL(url);
  const d = dom.window.document;
  let goods = d.querySelector("rz-product.ng-star-inserted");
  goodsPrice = parseInt(
    goods
      .querySelector("p.product-price__big")
      .textContent.split(/\s+/)
      .join("")
  );
  return goodsPrice;
}
module.exports = parsePrice