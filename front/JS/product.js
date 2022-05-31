import { getProduct } from "./api.js";
import { savePanier } from "./utils.js";
import { getPanier } from "./utils.js";

let product

//On récupère l'ID du produit
const paramsUrl = new URLSearchParams(window.location.search)
  const urlId = paramsUrl.get('id')
  console.log(urlId)

window.onload = async () => {
  product = await getProduct(urlId)
  createElements(product)
}

function createElements(product){

    //On implémente le HTML
    const imgHtml = document.getElementsByClassName('item__img');
    const titleHtml = document.getElementById('title');
    const priceHtml = document.getElementById('price');
    const descriptionHtml = document.getElementById('description');

    imgHtml[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"/>`;
    titleHtml.innerHTML += `${product.name}`;
    priceHtml.innerHTML += `${product.price}`;
    descriptionHtml.innerHTML += `${product.description}`;

    //On implémente les options
    const optionHtml = document.getElementById('colors');
      product.colors.forEach(function(options){
      optionHtml.innerHTML += `<option value="${options}">${options}</option>`
      })
}

    //on récupère les produits sélectionner par l'utilisateur

document
  .getElementById('addToCart')
  .addEventListener("click", function(Event){
    let optionColor = document.getElementById('colors').value
    console.log('couleur choisie :', optionColor)
    let optionQuantity = document.getElementById('quantity').value
    console.log('quantité choisie :', optionQuantity)

    if(optionQuantity > 0 && optionColor.length > 0) {
    }else {
    console.log('quantité non sélectionné')
    }
        
//on place les valeurs dans un objet

let objectProduct = {
  id: product._id,
  colors: optionColor,
  number: optionQuantity,
  name : product.name,
  imageUrl: product.imageUrl,
  imageAlt: product.altTxt,
}
console.log('produit ajouté au panier :', objectProduct)

// On ajoute les produits dans le localStorage

const ajoutAuPanier = addPanier(objectProduct)
        
function addPanier(objectProduct){
  let panier = getPanier();
  panier = [].concat(panier);
  console.log(panier);
  let foundProduct = panier.findIndex((item) => item.id === objectProduct.id && item.colors === objectProduct.colors);
    if(foundProduct > -1) {
      console.log('id du produit', foundProduct)
      panier[foundProduct].number = parseInt(panier[foundProduct].number) + parseInt(objectProduct.number);
      console.log("quantite ajouté", objectProduct.number)
      console.log("quantite total", panier[foundProduct].number)
    }else{
      panier.push(objectProduct);
      console.log("nouveau produit", panier)
     }
    savePanier(panier);
}});