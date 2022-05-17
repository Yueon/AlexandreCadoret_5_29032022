import { getProducts, getProduct } from "./api.js";

//On va chercher les données de L'API

window.onload = async () => {
  const products = await getProducts()
  console.log("les produits de l'api",products)
}

// on récupère les donnés du localstorage

const panier = JSON.parse(localStorage.getItem('produits'));
console.log('localStorage : ',panier);

////////////////////// Afficher les produits //////////////////////

//On implémente le HTML
const htmlPanier = document.getElementById("cart__items")
createElements(panier)

function createElements(panier){
    
    for(let product of panier)
    htmlPanier.innerHTML += 
    `<article class="cart__item" data-id="${product.id}" data-color="${product.colors}">
        <div class="cart__item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${product.colors}</p>
                <p>${product.price}</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.number}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" >Supprimer</p>
                </div>
            </div>
        </div>
    </article>`
}

////////////////////// Total Panier Prix + Quantite //////////////////////

const htmlTotalPanierQuantity = document.getElementById("totalQuantity");
//const htmlTotalPanierPrice = document.getElementById("totalPrice");

//on créé des tableaux vide
//let totalPanier = [];
let totalQuantity = [];

//on créé une boucle pour ajouter chaque prix/quantité au tableau
for ( let product of panier){
    //totalPanier.push(product.totalPrice)
    totalQuantity.push(parseInt(product.number))
};
//console.log('Prix Total', totalPanier);
//console.log('Quantite Total', totalQuantity);

//on additionne les différentes quantité
//const totalPrice = totalPanier.reduce(function(accumulateur,currentValue){
    //return (accumulateur + currentValue);

//});
const quantityTotal = totalQuantity.reduce(function(accumulateur,currentValue){
    return (accumulateur + currentValue);
});
//console.log('Total panier : ', totalPrice);
//console.log('Total Quantite : ', quantityTotal);

//on les rajoute au localstorage
//localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
localStorage.setItem("quantityTotal", JSON.stringify(quantityTotal));

//on les implante dans le HTML
//htmlTotalPanierPrice.innerHTML += `${totalPrice}`;
htmlTotalPanierQuantity.innerHTML += `${quantityTotal}`;

////////////////////// Boutton supprimer //////////////////////

const htmlBouttonSupprimer = document.querySelectorAll('.deleteItem');
//console.log("bouton supprimer", htmlBouttonSupprimer)
htmlBouttonSupprimer.forEach(bouton => {
        bouton.addEventListener("click", function(e) {
        e.preventDefault()
        //console.log("event e",e)
        const produitEl = e.target.closest("article.cart__item");
        console.log("element du boutton", produitEl)
        removeFromPanier(produitEl);
        window.location.reload()
           });        
});

function removeFromPanier(produitEl){
    let panier = getPanier();
    let index = panier.filter(p => p.id == produitEl.dataset.id && p.colors == produitEl.dataset.color);
    console.log("couleur de l'element",produitEl.dataset.color)
    console.log("contenue du panier",panier)
    panier.splice(index, 1);
    localStorage.setItem("produits", JSON.stringify(panier));
  };

function getPanier(){
let panier = localStorage.getItem("produits");
    if(panier == null){
        return [];
    }else{
    //console.log('Il y a déjà des produits dans le localStrorage')
        return JSON.parse(panier);
    }
};


const changerQuantiter = document.querySelectorAll('.itemQuantity');
changerQuantiter.forEach(bouton => {
    bouton.addEventListener("change", function(e) {
    e.preventDefault()
    console.log("event e",e)
    const produitEl = e.target.closest("article.cart__item");
    console.log("element du boutton", produitEl)
    changerLaQuantiter(produitEl)
       });

function changerLaQuantiter(produitEl){
        let panier = getPanier();
        let indexEl = panier.findIndex((p) => p.id == produitEl.dataset.id && p.colors == produitEl.dataset.color);
        //console.log("couleur de l'element",produitEl.dataset.color)
        //console.log("contenue du panier",panier)
        console.log("index",indexEl)
        let nouvelleQuantiter = produitEl.getElementsByClassName('itemQuantity');
        console.log("nouvelle quantiter",nouvelleQuantiter[0].value)
        panier[indexEl].number = nouvelleQuantiter[0].value

        console.log('nouveau panier', panier)
        //remplacer la valeur quantiter du localStorage avec la nouvelle

        localStorage.setItem("produits", JSON.stringify(panier));
      }
    })

    //récup les ID de tout les produits du localstrorage

let tousLesId = [];
let totalPrix = [];

function getPanierId(){
    let panier = getPanier();
    console.log("contenue du panier", panier)
////////////Boucle qui ne marche pas////////////
    panier.forEach(produits => {
        tousLesId.push(produits.id)
        console.log("Les ID de Tout les produits du panier",produits.id)
    }); 
    const trouverProduitDeApi = trouverProduitDansApi();
};
        
function trouverProduitDansApi(tousLesId, produits) {
    let toutLesProduitAvecPrix = [];
    tousLesId.forEach(function(index){  
    toutLesProduitAvecPrix.push(getProduct(index))
}
)
console.log("tous les prix",toutLesProduitAvecPrix)
}
        

const recupererId = getPanierId();
