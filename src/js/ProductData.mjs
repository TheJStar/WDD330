//const baseURL = import.meta.env.VITE_SERVER_URL
const baseURL = "https://wdd330-backend.onrender.com:3000/checkout";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
    //this.category = category;
    //this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result; 
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(orderObject) {
    const options = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(orderObject)
    }
    return await fetch(baseURL, options).then(convertToJson);
  }
}

async function checkout(orderObject) {
  const options = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(orderObject)
  }
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}