import { getLocalStorage } from "./utils.mjs"
import ProductData from "./ProductData.mjs";

const services = new ProductData();

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.Itemtotal = 0;
        this.totalPrice = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);

        this.calculateSummary();
        this.calculateOrderSubtotal();
    }

    // calculate and display the total amount of the items in the cart,
    // and the number of items.
    calculateSummary() {
        this.Itemtotal = this.list.reduce((total, item) => total + item.Quantity, 0);
    }

    // calculate the subtotal and tax amounts. 
    // Then use them to along with the cart total to figure out the order total
    calculateOrderSubtotal() {
        // Tax: Use 6% sales tax.
        this.totalPrice = this.list.reduce((total, item) => total + item.ListPrice, 0);
        this.tax = (this.totalPrice * 0.06);

        this.displayOrderSubtotal();
    }

    displayOrderSubtotal() {
        const subtotal = document.getElementById("num-items");
        const tax = document.getElementById("tax");

        subtotal.innerText = `$${this.totalPrice.toFixed(2)}`;
        tax.innerText = `$${this.tax.toFixed(2)}`;
    }

    // calculate the shipping and full amounts. 
    // Then use them to along with the cart total to figure out the order total
    calculateOrderTotal() {
        // Shipping: Use $10 for the first item 
        // plus $2 for each additional item after that.
        if (this.Itemtotal != 0) {
            this.shipping = 10 + (this.Itemtotal - 1) * 2;
            this.orderTotal = this.shipping + this.tax + this.totalPrice;
        } else {
            this.shipping = 0;
            this.orderTotal = this.shipping + this.tax + this.totalPrice;
        }
        
        this.displayOrderTotal();
    }

    // once the totals are all calculated display them in the order summary page
    displayOrderTotal() {
        const shipping = document.getElementById("shipping");
        const total = document.getElementById("total");
        const zipcode = document.getElementById("zipcode");
        
        if (zipcode.value != "") {
            shipping.innerText = `$${this.shipping.toFixed(2)}`;
            total.innerText = `$${this.orderTotal.toFixed(2)}`;
        } else {
            shipping.innerText = "";
            total.innerText = "";
        }
        
    }

    async checkout() {
        const formElement = document.forms["checkout"];
        const json = dataToJSON(formElement);

        json.orderTotal = this.orderTotal;
        json.shipping = this.shipping;
        json.tax = this.tax;
        json.Itemtotal = this.Itemtotal;
        json.items = packageItems(this.list);
        try {
            const res = await services.checkout(json);
            console.log(res);
        } catch(err) {
            console.log(err);
        }
    }
}

// used to prepare the items list part of this object
function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: item.Quantity
        };
});   
return simplifiedItems
}

function dataToJSON(formElement) {
    const formData = new FormData(formElement);
    let convertedJSON = {};

    formData.forEach(function(value, key) {
       convertedJSON[key] = value; 
    });

    return convertedJSON;
}