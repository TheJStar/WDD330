import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");

  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Need to find how to change quantity if the product already exist
  //

  cart.push(product);
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
