import { loadHeaderFooter, changeValueFromKeyList } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter(changeValueFromKeyList);

const zipcode = document.querySelector("#zipcode");
const submit = document.querySelector("#submit");
const myCheckout = new CheckoutProcess("so-cart", ".summary");
myCheckout.init();

zipcode.addEventListener("change", () => {
  myCheckout.calculateOrderTotal();
});
submit.addEventListener("submit", (event) => {
  myCheckout.checkout();
  console.log("Yay");
  event.preventDefault();
});
