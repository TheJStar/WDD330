import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();
const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();
cart.attachRemoveListeners();
cart.calculateTotal();

//loadHeaderFooter();
//changeValueFromKeyList(cartIconNotification, "so-cart");
