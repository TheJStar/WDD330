import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { changeValueFromKeyList, loadHeaderFooter } from "./utils.mjs";

const category = "tents";
const dataSource = new ProductData(category);
const element = document.querySelector(".product-list");

//const cartIconNotification = document.querySelector(".item-count");

// create an instance of your ProductListing class
const products = new ProductListing(category, dataSource, element);
products.init();

loadHeaderFooter();
//changeValueFromKeyList(cartIconNotification, "so-cart");
