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
// add cards to elemets with specific template
export async function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  let html = "";

  if (clear) {
    parentElement.innerHTML = ""
  }

  list.forEach(product => {
      html += templateFn(product)
  });

  parentElement.insertAdjacentHTML(position, html);
}