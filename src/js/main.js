import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { changeValueFromKeyList } from "./utils.mjs";

const category = "tents";
const dataSource = new ProductData(category);
// create an instance of your ProductListing class
const listElement = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, listElement);
const cartIconNotification = document.querySelector(".item-count");

productList.init();
changeValueFromKeyList(cartIconNotification, "so-cart");