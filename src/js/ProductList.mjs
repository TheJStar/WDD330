import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
            <a href="product_pages/?product=${product.Id}">
            <img
                src="${product.Image}"
                alt="Image of ${product.Name.split("-")[0]}"
            />
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
    async init () {
        const list = this.productJsonFilter(await this.dataSource.getData(this.category), "Id", ["989CG", "880RT"]);

        this.renderList(list);
    }
    productJsonFilter(list, key, excludeList) {
        // ignores items from the objects in list if the value of the KEY is not in excludeList
        let returnlist = [];

        list.forEach(element => {
            if (!excludeList.includes(element[key])) {
                returnlist.push(element);
            };
        });

        return returnlist;
    }
    async renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list)
    }
}