import { getProduct } from "./api.js";
import { savePanier } from "./utils.js";
import { getPanier } from "./utils.js";

let product
let quantiteInput = document.getElementById("quantity");
let colorSelect = document.getElementById("colors");

//On récupère l'ID du produit
const paramsUrl = new URLSearchParams(window.location.search)
  const urlId = paramsUrl.get('id')
  console.log(urlId)

window.onload = async () => {
  product = await getProduct(urlId)
  console.log(product)
  createErrorMsgHTMLElement()
  if (product === undefined){
    return window.location.href = '404.html';
  }
  createElements(product)
}
//////////////////////On place les infos Produits//////////////////////
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
//////////////////////Ajouts des produits au panier//////////////////////
//on récupère les produits et leurs options sélectionner par l'utilisateur
document
  .getElementById('addToCart')
  .addEventListener("click", function(Event){
    let optionColor = document.getElementById('colors').value
    console.log('couleur choisie :', optionColor)
    let optionQuantity = document.getElementById('quantity').value
    console.log('quantité choisie :', optionQuantity)
    //si au moin une de ces valeurs n'est pas acceptée (ajout au panier invalide)
    checkValidationProduit(optionColor, optionQuantity);
  });

// On ajoute les produits dans le localStorage

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
};
//////////////////////Gestion erreur//////////////////////
//on créer une div pour les messages d'erreur des option du canapé
function createErrorMsgHTMLElement() {
  let errorElementColors = document.createElement("div");
  let errorElementQuantite = document.createElement("div");
  errorElementQuantite.setAttribute("id", "error-msg-quantite");
  errorElementColors.setAttribute("id", "error-msg-colors");
  colorSelect.after(errorElementColors);
  quantiteInput.after(errorElementQuantite);
}
//fonction pour caché les messages d'erreur
function hideError() {
  let errorElementColors = document.getElementById("error-msg-colors");
  errorElementColors.innerText = "";
  let errorElementQuantite = document.getElementById("error-msg-quantite");
  errorElementQuantite.innerText = "";
}
//message d'erreur pour la couleur choisie
function displayErrorC(msg) {
  let errorElementColors = document.getElementById("error-msg-colors");
  errorElementColors.innerText = msg;
}
//message d'erreur pour la quantité séléctionner
function displayErrorQ(msg) {
  let errorElementQuantite = document.getElementById("error-msg-quantite");
  errorElementQuantite.innerText = msg;
}
//fonction pour vérifier si les options du canapé commander sont bien remplie
function checkValidationProduit(optionColor, optionQuantity) {
  hideError()
  if (optionColor === "") {
    displayErrorC('veillez séléctionner une couleur')
    document.querySelector("#addToCart").style.color = "rgb(255, 0, 0)";
  }
  if(optionQuantity < 1 || optionQuantity >100){
    displayErrorQ('veillez choisir un nombre entre 1 et 100')
    document.querySelector("#addToCart").style.color = "rgb(255, 0, 0)";
  }
  else if (optionColor != "" && optionQuantity > 0 && optionQuantity <101){
    document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)";
    document.querySelector("#addToCart").textContent = "Produit ajouté !";
    //on place les valeurs dans un objet
    let objectProduct = {
      id: product._id,
      colors: optionColor,
      number: optionQuantity,
      name : product.name,
      imageUrl: product.imageUrl,
      imageAlt: product.altTxt,
      price: product.price
    }
    console.log('produit ajouté au panier :', objectProduct)
    const ajoutAuPanier = addPanier(objectProduct)
  }
}