const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

fetch("../json/tents.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    const product = data.find((item) => item.Id == productId);
    if (product) {
      document.querySelector(".product-name").textContent = product.Name;
      document.querySelector(".product-image").src = `${product.Image}`;
      document.querySelector(".product-image").alt = product.Name;
      document.querySelector(".product-description").innerHTML =
        product.DescriptionHtmlSimple;
      document.querySelector(".product-price").textContent =
        `Price: $${product.FinalPrice}`;
      document.querySelector("#addToCart").dataid = `${product.Id}`;
    }
  });
