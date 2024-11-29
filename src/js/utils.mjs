// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  if (!Array.isArray(data)) {
    data = [data]; // Wrap the single item in an array
  }
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// get item details
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product
}
// generates content with HTML template 
export async function renderListWithTemplate(template, parentElement, list, position="afterbegin", clear=false) {
  if (clear) {
    parentElement.insertAdjacentHTML(position, ``); 
  } else {
    const html = list.map(template);
    parentElement.insertAdjacentHTML(position, html.join(""));
  }
}
// change the value of an element based on a LocalStorage variable
export function changeValueFromKeyList(key) {
  const element = document.querySelector(".item-count")
  if (getLocalStorage(key) == null)  {
    element.textContent = ""
  } else {
    
    element.textContent = getLocalStorage(key).length
  }
}

export function renderWithTemplate(template, parentElement, date, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

export async function loadHeaderFooter(callback) {
  //Load the header and footer templates in from our partials
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  // Grab the header and footer elements out of the DOM.
  const headerElement = document.getElementById("header");
  const footerElement = document.getElementById("footer");

  // Render the header and footer
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
  changeValueFromKeyList("so-cart")
}

async function loadTemplate(path) {
  const responce = await fetch(path);
  const template = await responce.text();
  return template;
}

export function alertMessage(message, scroll = true) {
  // create element to hold our alert
  const alert = document.createElement("div");

  // add a class to style the alert
  alert.classList.add("alert");

  // set the contents. You should have a message
  // and an X or something the user can click on to remove
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener("click", function(e) {
    if (e.target.innerText == "X") {
      main.removeChild(this);
    }
  });

  // add the alert to the top of main
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  // we may not always want to do this...so default to scroll=true,
  // but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);
}
export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  
  if (alerts != null) {
    alerts.forEach((alert) => alert.remove());
  }
  
}