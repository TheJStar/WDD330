// generates a list of product cards in HTML from an array
import ProductData from "./ProductData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

//return a template literal string for each of the templates needed
function productCardTemplate(product) {
    return `<li class="product-card">
            <a href="product_pages/?product=${product.Id}">
            <img src=${product.Image}
              alt=${product.Name} />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.ListPrice}</p>
          </a>
          </li>`
}
export default class ProductListing {
    constructor(category, dataSource, listElement ) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    renderList(list) {
        list = this.filterList(list);
        renderListWithTemplate(productCardTemplate, this.listElement, list)
    }

    // filter the list of products to just the four (4) needed ones
    filterList(list) {
        const productIdList = ["880RR", "985RF", "985PR", "344YJ"];
        const filteredList = list.filter((element) => productIdList.includes(element.Id));
        return filteredList;
    }
}