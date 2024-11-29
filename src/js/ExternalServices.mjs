//const baseURL = import.meta.env.VITE_SERVER_URL;
//const baseURL = "http://wdd330-backend.onrender.com/checkout";
const baseURL = "http://server-nodejs.cit.byui.edu:3000/";

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: 'servicesError', message: data };
  }
}

export default class ExternalServices {
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
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}