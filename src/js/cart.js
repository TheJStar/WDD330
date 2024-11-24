import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const cart = new ShoppingCart("so-cart", ".product-list");
cart.init();

//changeValueFromKeyList(cartIconNotification, "so-cart");
