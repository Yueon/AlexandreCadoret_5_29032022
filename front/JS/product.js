import { getProduct } from "./api.js";

console.log("window Location:", window.location);

//On récupère l'ID du produit
const paramsUrl = new URLSearchParams(window.location.search)
  const urlId = paramsUrl.get('id')
  console.log(urlId)

window.onload = async () => {
  const product = await getProduct(urlId)
  console.log(product)
  createElements(product)
}

function createElements(product){

    //On implémente le HTML
    const imgHtml = document.getElementsByClassName('item__img');
    const titleHtml = document.getElementById('title');
    const priceHtml = document.getElementById('price');
    const descriptionHtml = document.getElementById('description');

    imgHtml.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"/>`;
    titleHtml.innerHTML += `${product.name}`;
    priceHtml.innerHTML += `${product.price}`;
    descriptionHtml.innerHTML += `${product.description}`;

    //On implémente les options
    const optionHtml = document.getElementById('colors');
      product.colors.forEach(function(options){
        console.log('colors :', options)
      optionHtml.innerHTML += `<option value="${options}">${options}</option>`
      })
}
