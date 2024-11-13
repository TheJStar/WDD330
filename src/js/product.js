import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");

  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Checking if the element is already in the card
  const alreadyInCart = cart.find((element) => element.Id === product.Id);

  if (alreadyInCart) {
    alreadyInCart.Quantity += 1;
  } else {
    product.Quantity = 1;
    cart.push(product);
  }
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
