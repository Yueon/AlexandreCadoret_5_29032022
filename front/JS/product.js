import { getProduct } from "./api.js";

console.log("window Location:", window.location);
let product
//On récupère l'ID du produit
const paramsUrl = new URLSearchParams(window.location.search)
  const urlId = paramsUrl.get('id')
  console.log(urlId)

window.onload = async () => {
  product = await getProduct(urlId)
  console.log(product)
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
          console.log(Event)
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
            price: product.price,
            totalPrice: product.price * optionQuantity,
            imageUrl: product.imageUrl,
            imageAlt: product.altTxt,
          }
          console.log('produit ajouté au panier :', objectProduct)
          
let produitSaveLocalStorage = JSON.parse(localStorage.getItem("produits"));

const ajoutProduitLocalStorage = function(){
  produitSaveLocalStorage.push(objectProduct);
  localStorage.setItem("produits", JSON.stringify(produitSaveLocalStorage));
}

if(produitSaveLocalStorage){
  ajoutProduitLocalStorage();
}else {
  produitSaveLocalStorage = [];
  ajoutProduitLocalStorage();
}
        

/*const ajoutAuPanier = addPanier(objectProduct)

function savePanier(panier){
  localStorage.setItem("produits", JSON.stringify(objectProduct));
  }
        
function getPanier(){
  let panier = localStorage.getItem("produits");
    if(panier == null){
      return [];
    }else{
      return console.log('oui'), JSON.parse(panier);
      }
    }
        
function addPanier(objectProduct){
  let panier = getPanier();
  let foundProduct = panier.findIndex((item) => item.produit._id === product._id && item.produit.colors === optionColor);
    if(foundProduct > -1) {
      foundProduct++;
      console.log('quantité')
    }else{
      panier.push(objectProduct);
      console.log('quantité non')
     }
    savePanier(panier);
}*/

/*function removeFromPanier(objectProduct){
  let panier = getPanier();
  panier = panier.filter(p => p.id != objectProduct.id);
  savePanier(objectProduct);
}*/

/*function changeQuantity(objectProduct, quantity){
  let panier = getPanier();
  let foundProduct = panier.find(p => p.id == objectProduct.id);
    if(foundProduct != undefined){      
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0) {
          removeFromPanier(foundProduct);
        } else {
        savePanier(objectProduct);
    }
  }
}*/
        }
);








/*
const i = cart.findIndex((item) => item.product._id === product._id && item.optionColor === optionColor)

if(i > -1) {
  console.log("Déjà dans le panier, ajustement")
  } else {
  console.log("Nouveau produit dans le panier")
})
}

*/