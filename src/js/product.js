import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import {
  getParams,
  changeValueFromKeyList,
  loadHeaderFooter,
} from "./utils.mjs";

const productId = getParams("product");
const dataSource = new ExternalServices("tents");
const product = new ProductDetails(productId, dataSource);
//const cartIconNotification = document.querySelector(".item-count");

product.init();
loadHeaderFooter(changeValueFromKeyList);
