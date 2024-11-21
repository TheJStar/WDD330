import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const category = "tents";
const dataSource = new ProductData(category);
const element = document.querySelector(".product-list");

// create an instance of your ProductListing class
const products = new ProductListing(category, dataSource, element);
products.init();
