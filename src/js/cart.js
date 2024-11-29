import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter, changeValueFromKeyList } from "./utils.mjs";

loadHeaderFooter(changeValueFromKeyList);
const cart = new ShoppingCart("so-cart", ".product-list");
cart.init();
