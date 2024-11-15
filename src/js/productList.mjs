import renderListWithTemplate from "./utils.mjs";

export default class ProductListing {

    constructor(category, dataSource, listElement) {

        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {

        // our dataSource will return a Promise...so we can use await to resolve it.
        const list = await this.dataSource.getData();
        //filtered by id to display only four
        const filteredList = this.filterProducts(list, ["880RR", "985RF", "985PR", "344YJ"]);
        this.renderList(filteredList)

    }
     //   render before doing the stretch
    // renderList(filteredList) {
    //     const htmlStrings = filteredList.map(productCardTemplate);
    //     this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
    // }

    filterProducts(products, requiredIds) {
        return products.filter(product => requiredIds.includes(product.Id));
    }

    renderList(filteredList){
        const parentElement = this.listElement;
        renderListWithTemplate(productCardTemplate, parentElement, filteredList)
    }

    
}

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
        </li>`
}