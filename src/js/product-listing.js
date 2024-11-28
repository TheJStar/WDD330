import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import {
  changeValueFromKeyList,
  loadHeaderFooter,
  getParams,
} from "./utils.mjs";

const category = getParams("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");

//const cartIconNotification = document.querySelector(".item-count");

// create an instance of your ProductList class
const products = new ProductList(category, dataSource, element);
products.init();

loadHeaderFooter(changeValueFromKeyList);
//changeValueFromKeyList(cartIconNotification, "so-cart");
