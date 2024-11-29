import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import {
  getParams,
  changeValueFromKeyList,
  loadHeaderFooter,
  addToNav,
} from "./utils.mjs";

const productId = getParams("product");
const dataSource = new ExternalServices(); // "tents"
const product = new ProductDetails(productId, dataSource);
//const cartIconNotification = document.querySelector(".item-count");
const pr = await dataSource.findProductById(productId)
product.init();
loadHeaderFooter(changeValueFromKeyList);
addToNav([["Home", "/"], [pr.Category, `/product-listing/?category=${pr.Category}`], [pr.Name, ""]])