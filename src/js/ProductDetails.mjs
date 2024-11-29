import { setLocalStorage, getLocalStorage, alertMessage} from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
        this.slideIndex = 1;
    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId)
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // once we have the product details we can render out the HTML
        this.renderProductDetails("main")
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        this.addCarousel();
        this.showSlides(this.slideIndex);

        // EventListeners for .prev and .next
        document.querySelector(".prev").addEventListener("click", () => this.plusSlides(-1));
        document.querySelector(".next").addEventListener("click", () => this.plusSlides(1));

        document.getElementById("addToCart")
            .addEventListener("click", this.addToCart.bind(this));
    }
        addToCart() {
        let cart = getLocalStorage("so-cart");
        
        if (!Array.isArray(cart)) {
            cart = [];
        }
        
        // Checking if the element is already in the card
        const alreadyInCart = cart.find((element) => element.Id === this.product.Id);
        
        if (alreadyInCart) {
            alreadyInCart.Quantity += 1;
        } else {
            this.product.Quantity = 1;
            cart.push(this.product);
        }
        setLocalStorage("so-cart", cart);
        alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
    }
    async renderProductDetails(selector) {
        const element = document.querySelector(selector)
        const html = `
            <section class="product-detail">
            <h3>${this.product.Brand.Name}</h3>

            <h2 class="divider">${this.product.NameWithoutBrand}</h2>

            <div class="container">
                <div class="mySlides">
                    <img
                    class="divider"
                    src="${this.product.Images.PrimaryLarge}"
                    alt="${this.product.NameWithoutBrand}"
                    />
                </div>
                <!-- Next and previous buttons -->
                <a class="prev"">&#10094;</a>
                <a class="next"">&#10095;</a>
            </div>


            <p class="product-card__price">$${this.product.ListPrice}</p>

            <p class="product__color">${this.product.Colors[0].ColorName}</p>

            <p class="product__description">
                ${this.product.DescriptionHtmlSimple}
            </p>

            <div class="product-detail__add">
            <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
            </div>
        </section>
        `
        element.insertAdjacentHTML("afterBegin", html)
    }

    addCarousel(){
        const element = document.querySelector(".container")
        // Chech if ExtraImages exist
        if (this.product.Images.ExtraImages) {

            this.product.Images.ExtraImages.forEach((image, number=0) => {
                const newDiv = document.createElement("div");
                newDiv.classList.add("mySlides");
                const htmlImage = `<img src=${this.product.Images.ExtraImages[number].Src} style="width:100%">`
                newDiv.innerHTML = htmlImage;
                element.appendChild(newDiv);
            });
        } else {
            document.querySelector(".prev").style.display = "none";
            document.querySelector(".next").style.display = "none";
        }
    }

    showSlides(n) {
        let slides = document.getElementsByClassName("mySlides");

        if (n > slides.length) {this.slideIndex = slides.length; // Stay at the last slide
            return;
        }
        if (n < 1) {this.slideIndex = 1; // Stay at the first slide
            return;
        }

        // Hide all slides
        for ( let i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }

        // Show the current slide
        slides[this.slideIndex-1].style.display = "block";
    }

    plusSlides(n) {
        const slides = document.getElementsByClassName("mySlides");
        // Ensure slideIndex does not exceed bounds
        if (this.slideIndex + n > slides.length || this.slideIndex + n < 1) {
            return; // Do nothing if out of bounds
        }

        this.showSlides(this.slideIndex += n);
    }

}
  