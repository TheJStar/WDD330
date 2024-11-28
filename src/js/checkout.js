import { loadHeaderFooter, changeValueFromKeyList } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter(changeValueFromKeyList);

const myCheckout = new CheckoutProcess("so-cart", ".summary");
myCheckout.init();
