import {
  getLocalStorage,
  setLocalStorage,
  changeValueFromKeyList,
} from "./utils.mjs";

const cartIconNotification = document.querySelector(".item-count");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems) {
    const cartTotal = document.querySelector(".cart-footer");
    cartTotal.setAttribute("class", "hide");
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty</p>";
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  attachRemoveListeners();

  calculateTotal(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.Quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <!-- Remove Button -->
    <button class="remove-item" data-id="${item.Id}">X</button>
</li>`;

  return newItem;
}

function attachRemoveListeners() {
  // Attach event listeners to each remove button (X)
  const removeButtons = document.querySelectorAll(".remove-item");

  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const itemId = button.getAttribute("data-id");
      removeItemFromCart(itemId);
    });
  });
}

function removeItemFromCart(itemId) {
  // we need to fin the way to delite only one item !!!!
  let cart = getLocalStorage("so-cart") || [];

  // Remove the item with the given ID
  cart = cart.filter((item) => item.Id !== itemId);

  // Update localStorage with the new cart
  setLocalStorage("so-cart", cart);

  // Re-render the cart after removing the item
  renderCartContents();
}

function calculateTotal(cartItems) {
  // Need to find a way not to display total after the item has been removed
  let total = 0;
  cartItems.map((item) => (total += item.FinalPrice * item.Quantity));
  let cartPElement = document.querySelector(".cart-total");
  cartPElement.innerHTML = "";
  cartPElement.insertAdjacentHTML("afterbegin", `Total: $${total}`);
}

renderCartContents();
changeValueFromKeyList(cartIconNotification, "so-cart");