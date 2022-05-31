import { getProducts, getProduct } from "./api.js";

//On va chercher les données de L'API
let products = [];
window.onload = async () => {
    products = await getProducts()
  console.log("les produits de l'api",products)
  const recupererId = getPanierId();
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

////////////////////// Option changer la quantiter //////////////////////

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

//////////////////////Total Panier Prix/Quantite//////////////////////

//récup les ID de tout les produits du localstrorage
//on créé des tableaux vide
let totalQuantity = [];
let tousLesId = [];
let toutLesPrix = [];

async function getPanierId(){
    let panier = getPanier();
    console.log("contenue du panier", panier)
panier.forEach(produits => {
    tousLesId.push(produits.id)
})
trouverProduitDansApi(products, tousLesId);
};

//On recupère le prix de chaque produit qu'on met dans un tableau
function trouverProduitDansApi(products, tousLesId) {
products.forEach(function(product){
    tousLesId.forEach(function(index){
        if(product._id === index){
            toutLesPrix.push(product.price)
        }
    })
})
};

const htmlTotalPanierQuantity = document.getElementById("totalQuantity");
const htmlTotalPanierPrice = document.getElementById("totalPrice");

//on créé une boucle pour ajouter chaque prix/quantité au tableau
for ( let product of panier){
    totalQuantity.push(parseInt(product.number))
};
console.log('Quantite Total', totalQuantity);
console.log("tous les prix",toutLesPrix)

//on additionne les différentes quantité
/*const totalPrice = toutLesPrix.reduce(function(accumulateur,currentValue){
    return (accumulateur + currentValue);

});*/
const quantityTotal = totalQuantity.reduce(function(accumulateur,currentValue){
    return (accumulateur + currentValue);
});
//console.log('Total panier : ', totalPrice);
console.log('Total Quantite : ', quantityTotal);

//on les rajoute au localstorage
//localStorage.setItem("quantityTotal", JSON.stringify(quantityTotal));

//on les implante dans le HTML
//htmlTotalPanierPrice.innerHTML += `${totalPrice}`;
htmlTotalPanierQuantity.innerHTML += `${quantityTotal}`;



//////////////////////Formulaire//////////////////////

//regex
const regexLettre = function(value){
    return /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i;
};

const regexEmail = function(value){
    return /^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,60}$/i;
};

const regexAdresse = function(value){
    return /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
};

//définition des textes d'erreurs


//On récupère les données du formulaire
document
    .getElementsByClassName("cart__order__form")
    [0].addEventListener("submit", function(e){
        e.preventDefault();
        ///On stocke les valeurs dans un objet
        const contactClient = {
            firstName : document.getElementById("firstName").value,
            lastName : document.getElementById("lastName").value,
            email : document.getElementById("email").value,
            address : document.getElementById("address").value,
            city : document.getElementById("city").value,
        }
        localStorage.contactClient = JSON.stringify(contactClient);
    });


//1-Ecoutez si les champs sont ok d'après la regex pour email et adresse
//2-texteInfo pour la zone concernée

