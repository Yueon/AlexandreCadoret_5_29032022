import { getProduct } from "./api.js";

console.log("window Location:", window.location);

window.onload = async () => {
  const paramsUrl = new URLSearchParams(window.location.search)
  const urlId = paramsUrl.get('id')
  console.log(urlId)
  const product = await getProduct(id)
  console.log(product)
  createElements(product)
}

function createElements(product){

    //On implémente le HTML
    const imgHtml = document.getElementByClassName('item__img');
    const titleHtml = document.getElementById('title');
    const priceHtml = document.getElementById('price');
    const descriptionHtml = document.getElementById('description');

    imgHtml.innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`
    titleHtml.innerHTML += `${product.name}`
    priceHtml.innerHTML += `${product.price}`
    descriptionHtml.innerHTML += `${product.description}`
}
