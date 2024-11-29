import { loadHeaderFooter, changeValueFromKeyList } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter(changeValueFromKeyList);

const zip = document.querySelector("#zip");
const submit = document.querySelector("#submit");
const myCheckout = new CheckoutProcess("so-cart", ".summary");
myCheckout.init();

zip.addEventListener("change", () => {
  myCheckout.calculateOrderTotal();
});
submit.addEventListener("submit", (event) => {
  event.preventDefault();
  myCheckout.checkout();
});

document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if (chk_status) myCheckout.checkout();
});
