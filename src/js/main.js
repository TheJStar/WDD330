import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { changeValueFromKeyList } from "./utils.mjs"

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, listElement);
const cartIconNotification = document.querySelector(".item-count")

productList.init();
changeValueFromKeyList(cartIconNotification, "so-cart")