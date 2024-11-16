fetch("./json/tents.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    generateProductCards(data);
  });
/*.catch((error) => {
    console.error("There was a problem with the fetch operation:", error)
  })*/

const container = document.querySelector(".products");

function generateProductCards(data) {
  data.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.className = "product-image";
    img.src = product.Image;
    img.alt = product.Name;

    const name = document.createElement("h2");
    name.className = "product-name"; // Add class for name
    name.textContent = product.Name;

    /*const description = document.createElement('p')
    description.className = 'product-description' // Add class for description
    description.innerHTML = product.DescriptionHtmlSimple*/

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = `Price: $${product.FinalPrice}`;

    const link = document.createElement("a");
    link.className = "product-link";
    link.href = `product_pages/product-details.html?id=${product.Id}`;

    card.appendChild(img);
    card.appendChild(name);
    /*card.appendChild(description)*/
    card.appendChild(price);
    link.appendChild(card);
    container.appendChild(link);
  });
}
