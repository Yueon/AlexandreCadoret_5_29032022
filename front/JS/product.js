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
        console.log('colors :', options)
      optionHtml.innerHTML += `<option value="${options}">${options}</option>`
      })
}


/* 1-sur clic de ajout au panier save les données (id,couleur,nombre) dans un array en localstorage
    2- si ont ajoute un canap qui n'était pas dans le array (même id + même couleur) 
    on rajoute l'élément, sinon on incrémente juste la quantité du produit correspondant.

      1-créer fonction event click
      2-créer object (id, couleur, nombre)
      3-créer fonction ajout object dans localstorage
      4-créer fonction if,else check localstorage
    */


    document
        .getElementById('addToCart')
        .addEventListener("click", function(Event){
          console.log(Event)
          let optionColor = document.getElementById('colors').value
          console.log('couleur choisie :', optionColor)
          let optionQuantity = document.getElementById('quantity').value
          console.log('quantité choisie :', optionQuantity)

          if(optionQuantity > 0 && optionColor.length > 0) {
            console.log('produit ajouté au panier')
          }else {
            console.log('quantité non sélectionné')
          }

          let objectProduct = {
            id: product._id,
            colors: optionColor,
            Number: optionQuantity,
          }
          console.log('produit ajouté au panier :', objectProduct);
});

/*
const i = cart.findIndex((item) => item.productId === productId && item.productColor === productColor)

if(i > -1) {
  console.log("Déjà dans le panier, ajustement")
  } else {
  console.log("Nouveau produit dans le panier")
})
}

*/