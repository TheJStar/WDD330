import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import {
  changeValueFromKeyList,
  loadHeaderFooter,
  getParams,
  addToNav,
} from "./utils.mjs";

const category = getParams("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");

//const cartIconNotification = document.querySelector(".item-count");
const pr = dataSource.getData(category)

// create an instance of your ProductList class
const products = new ProductList(category, dataSource, element);
products.init();

loadHeaderFooter(changeValueFromKeyList);