import { getProducts, getProduct } from "./api.js";
const url = "http://localhost:3000";
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
let tousLesIdAvecQuantiter = [];
let totalPrice = 0;

//on récupère le panier et on place l'id et la quantité de chaque produit dans un tableau
async function getPanierId(){
    let panier = getPanier();
panier.forEach(produits => {
    tousLesIdAvecQuantiter.push({id: produits.id, qty: produits.number})
})
//on va chercher l'id du produit commander dans l'API pour pouvoir recupérer le prix, pour ensuite le multipler a la quantiter commander
products.forEach(function(product){
    tousLesIdAvecQuantiter.forEach(function(index){
        if(product._id === index.id){
            //calculer les prix
            totalPrice += product.price*index.qty
        }
    })
})
//on les implante dans le HTML
const htmlTotalPanierPrice = document.getElementById("totalPrice");
htmlTotalPanierPrice.innerHTML += `${totalPrice}`;
};

//on créé une boucle pour ajouter les quantités au tableau
for ( let product of panier){
    totalQuantity.push(parseInt(product.number))
};

//on additionne les quantités du tableau entre elle
const quantityTotal = totalQuantity.reduce(function(accumulateur,currentValue){
    return (accumulateur + currentValue);
});

//on les implante dans le HTML
const htmlTotalPanierQuantity = document.getElementById("totalQuantity");
htmlTotalPanierQuantity.innerHTML += `${quantityTotal}`;



//////////////////////Formulaire//////////////////////

//regex
const regexLettre = function(value){
    return /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/i.test(value);
};

const regexEmail = function(value){
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value);
};

const regexAdresse = function(value){
    return /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i.test(value);
};

//définition des textes d'erreurs
function erreurChampManquantVide(el){
    document.getElementById(el).innerText = "";
}

function erreurChampManquant(el){
    document.getElementById(el).innerText = "Ce champ n'est pas valide"
}

//On récupère les données du formulaire
document
    .getElementsByClassName("cart__order__form")
    [0].addEventListener("submit", function(e){
        e.preventDefault();
        ///On stocke les valeurs dans un objet
        const contact = {
            firstName : document.getElementById("firstName").value,
            lastName : document.getElementById("lastName").value,
            email : document.getElementById("email").value,
            address : document.getElementById("address").value,
            city : document.getElementById("city").value,
        }
        console.log("contactClient",contact)

        //On contrôle les différents champs

        function firstNameControl(){
            const prenom = contact.firstName;
            if(regexLettre(prenom)){
                erreurChampManquantVide('firstNameErrorMsg')
                return true;
            }else{
                erreurChampManquant('firstNameErrorMsg')
                return false;
            }
        };
    
        function lastNameControl(){
            const nom = contact.lastName;
            if(regexLettre(nom)){
                erreurChampManquantVide('lastNameErrorMsg')
                return true;
            }else{
                erreurChampManquant('lastNameErrorMsg')
                return false;
            }
        };
    
        function emailControl(){
            const email = contact.email;
            if(regexEmail(email)){
                erreurChampManquantVide('emailErrorMsg')
                return true;
            }else{
                erreurChampManquant('emailErrorMsg')
                return false;
            }
        };
    
        function addressControl(){
            const address = contact.address;
            if(regexAdresse(address)){
                erreurChampManquantVide('addressErrorMsg')
                return true;
            }else{
                erreurChampManquant('addressErrorMsg')
                return false;
            }
        };
    
        function cityControl(){
            const ville = contact.city;
            if(regexLettre(ville)){
                erreurChampManquantVide('cityErrorMsg')
                return true;
            }else{
                erreurChampManquant('cityErrorMsg')
                return false;
            }
        };
        ///Contrôle validité formulaire avant envoi dans localStorage
        if(lastNameControl() && firstNameControl() && emailControl() && addressControl() && cityControl()){
        //On appelle la fonction de POST
        envoiPaquet()
        }

//////////////////////Post//////////////////////

function envoiPaquet() {
    //on place les id des produits dans un tableau
    let produitsId = [];
    let panier = getPanier();
    panier.forEach(produits => {
        produitsId.push(produits.id)
    })
    console.log("Id des produits du panier", produitsId)
    //on regroupe l'objet contact et le tableau des id
    let commandeFinale = {
        contact : contact,
        produits : produitsId,
    };
    console.log("commande finale",commandeFinale)
    // envoi à la ressource api
    fetch(`http://localhost:3000/api/products/order`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commandeFinale)
    })
    .then((res) => {
        return res.json()
    })
    .catch(function(err) {
        console.log(err)
      });
}
});