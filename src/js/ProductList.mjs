import { renderListWithTemplate, addToNav } from "./utils.mjs";

//return a template literal string for each of the templates needed
function productCardTemplate(product) {
    return `<li class="product-card">
            <a href="../product_pages/?product=${product.Id}">
            <img src=${product.Images.PrimaryMedium}
              alt=${product.Name} />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">$${product.ListPrice}</p>
            </a>
        </li>
        `
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData(this.category);
        addToNav([["Home", "/"], [this.category, ""]]);
        this.renderList(list);
        document.querySelector(".title").innerHTML = `${this.category.charAt(0).toUpperCase() + this.category.slice(1)}`;
    }
    renderList(list) {
        //list = this.filterList(list);
        renderListWithTemplate(productCardTemplate, this.listElement, list)
    }
    filterList(list, key, includeList) {
        // filter the list of products to just the four (4) needed ones
        const productIdList = includeList;
        const filteredList = list.filter((element) => productIdList.includes(element[key]));
        return filteredList;
    }
}