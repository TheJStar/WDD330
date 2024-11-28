import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import {
  getParams,
  changeValueFromKeyList,
  loadHeaderFooter,
} from "./utils.mjs";

loadHeaderFooter();
const productId = getParams("product");
const dataSource = new ProductData("tents");
const product = new ProductDetails(productId, dataSource);
const cartIconNotification = document.querySelector(".item-count");

product.init();
changeValueFromKeyList(cartIconNotification, "so-cart");