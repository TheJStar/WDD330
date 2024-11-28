import { loadHeaderFooter, changeValueFromKeyList } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter(changeValueFromKeyList);

const zipcode = document.querySelector("#zipcode");
const myCheckout = new CheckoutProcess("so-cart", ".summary");
myCheckout.init();

zipcode.addEventListener("change", () => {
  myCheckout.calculateOrderTotal();
});
