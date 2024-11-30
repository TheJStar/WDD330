
import {
  getLocalStorage,
  setLocalStorage,
} from "./utils.mjs";

// //return a template literal string for each of the templates needed 
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image" data-action="show-modal" data-id="${item.Id}">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#" data-action="show-modal" data-id="${item.Id}">
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

export default class ShoppingCart {
  constructor(key, parentSelector) {
      this.key = key;
      this.parentSelector = parentSelector;
    }

  init () {
    renderCartContents();
    calculateTotal();
  }
}

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
      attachShowModalListeners();
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
    
  function calculateTotal() {
      // Need to find a way not to display total after the item has been removed
      const cartItems = getLocalStorage("so-cart");
      let total = 0;
      cartItems.map((item) => (total += item.FinalPrice * item.Quantity));
      let cartPElement = document.querySelector(".cart-total");
      cartPElement.innerHTML = "";
      cartPElement.insertAdjacentHTML("afterbegin", `Total: $${total}`);
    }

  function removeItemFromCart(itemId) {
    // we need to fin the way to delite only one item !!!!
    let cart = getLocalStorage("so-cart") || [];
  
    // Remove the item with the given ID
    cart = cart.filter((item) => item.Id !== itemId);
  
    // Update localStorage with the new cart
    setLocalStorage("so-cart", cart);
  
    // Re-render the cart after removing the item
    calculateTotal();
    renderCartContents();
  }

function showModal(itemId) {
    const cartItem = getLocalStorage("so-cart").find(item => item.Id === itemId);
    const modal = document.querySelector(".modal");
    const modalContent = modal.querySelector(".modal-content");

    if (!cartItem) {
        console.error("Item not found in cart!");
        return;
    }

    // Show the modal
    modal.classList.remove("hidden");

    modalContent.innerHTML = `
        <h2>${cartItem.Name}</h2>
        <img src="${cartItem.Images.PrimaryLarge}" alt="${cartItem.Name}" />
        <p>Brand: ${cartItem.Brand.Name}</p>
        <p>Color: ${cartItem.Colors[0].ColorName}</p>
        <p>Price: $${cartItem.FinalPrice}</p>
        <p>Quantity: ${cartItem.Quantity}</p>
        
        <span class="close-modal">&times;</span>
    `;

    document.querySelector(".close-modal").addEventListener("click", function() {
        modal.classList.add("hidden");
    });

    modal.addEventListener("click", function(e) {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });
}

function attachShowModalListeners() {

  const cartItemLinks = document.querySelectorAll('[data-action="show-modal"]');
  cartItemLinks.forEach(link => {

      link.addEventListener("click", (event) => {
          event.preventDefault();  
          const itemId = link.getAttribute("data-id"); 
          showModal(itemId); 
      });
  });
}
