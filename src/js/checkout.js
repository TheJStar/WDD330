import { loadHeaderFooter, changeValueFromKeyList, getLocalStorage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter(changeValueFromKeyList);

const zipcode = document.querySelector("#zip");
const submit = document.querySelector("#submit");
const myCheckout = new CheckoutProcess("so-cart", ".summary");
myCheckout.init();

zipcode.addEventListener("change", () => {
  myCheckout.calculateOrderTotal();
});
submit.addEventListener("click", (event) => {
  event.preventDefault();
  const form = document.forms[0];
  form.reportValidity();
  if (form.checkValidity()) {
    myCheckout.checkout();
  }
})