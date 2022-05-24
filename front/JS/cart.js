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

////////////////////// Total Quantite //////////////////////

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

//////////////////////Total Panier Prix//////////////////////

//récup les ID de tout les produits du localstrorage

let tousLesId = [];
let totalPrix = [];
let toutLesProduitAvecPrix = [];

async function getPanierId(){
    let panier = getPanier();
    console.log("contenue du panier", panier)
////////////Boucle OK////////////
panier.forEach(produits => {
    tousLesId.push(produits.id)
    console.log("Les ID de Tout les produits du panier",tousLesId)
})
const products = await getProducts()
const trouverProduitDeApi = trouverProduitDansApi(products, tousLesId);
};

////////////Boucle qui ne marche pas////////////
function trouverProduitDansApi(products, tousLesId) {
    tousLesId.forEach(function(index){
    toutLesProduitAvecPrix.push(getProducts(index))
}
)
console.log("tous les prix",toutLesProduitAvecPrix)
};      

const recupererId = getPanierId();



/*
//////////////////////Formulaire//////////////////////

//Les données du client sont stockées dans un tableau
let contactClient = [];
localStorage.contactClient = JSON.stringify(contactClient);
//On cible les éléments input, certains ont la même classe car ils réagiront de la même façon aux regex
//On cible les input prénom, nom et ville
let prenom = document.querySelector("#firstName");
prenom.classList.add("regex_texte");
let nom = document.querySelector("#lastName");
nom.classList.add("regex_texte");
let ville = document.querySelector("#city");
ville.classList.add("regex_texte");
//On cible l'input adresse
let adresse = document.querySelector("#address");
adresse.classList.add("regex_adresse");
//On cible l'input email
let email = document.querySelector("#email");
email.classList.add("regex_email");
//On cible les éléments qui on la classe regex_texte
let regexTexte = document.querySelectorAll(".regex_texte");

/////Regex/////
let regexLettre = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i;
let regexChiffreLettre = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
let regexEmail = /^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,60}$/i;

//Ecoute si ces champs sont ok d'après la regex
regexTexte.forEach((regexTexte) =>
    regexTexte.addEventListener("input", (e) => {
        //valeur sera egal a la valeur de l'input
        valeur = e.target.value;
        let regexNormal = valeur.search(regexLettre);
        if (regexNormal === 0) {
            contactClient.firstName = prenom.value;
            contactClient.lastName = nom.value;
            contactClient.city = ville.value;
        }
        if (
            contactClient.city !== "" &&
            contactClient.lastName !== "" &&
            contactClient.firstName !== "" &&
            regexNormal === 0
        ) {
            contactClient.regexNormal = 3;
        } else {
            contactClient.regexNormal = 0;
        }
        localStorage.contactClient = JSON.stringify(contactClient);
    })
);*/
//le champ écouté via la regex regexLettre fera réagir, grâce à texteInfo, la zone concernée
/*texteInfo(regexLettre, "#firstNameErrorMsg", prenom);
texteInfo(regexLettre, "#lastNameErrorMsg", nom);
texteInfo(regexLettre, "#cityErrorMsg", ville);*/


//1-Ecoutez si les champs sont ok d'après la regex pour email et adresse
//2-texteInfo pour la zone concernée
//3-fonction d'affichage individuel des paragraphes sous input 

