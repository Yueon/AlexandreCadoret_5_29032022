import { getProducts } from "./api.js";
import { savePanier } from "./utils.js";
const htmlPanier = document.getElementById("cart__items")
let products = [];
let panier;



//On va chercher les données de L'API
window.onload = async () => {
    panier = getPanier();

    for(let product of panier){
        product.number = product.number * 1
    }

    products = await getProducts()
    if (products === undefined){
        return window.location.href = '404.html';
      }
    // On récupère les iD
    getPanierId(); 
    // On crée les éléments
    createElements()  
    // On calcule le total
    calculTotal()
    // On ajoute les évènements
    eventChangeQuantity()
    eventSupprimerProduit()
}

// Récupère le panier du LS et retourne le panier
function getPanier(){
    let panier = JSON.parse(localStorage.getItem("produits"));
    
    if(panier === null || panier.length === 0){
        htmlPanier.innerHTML += 
        `<div id=panierVide">
                <p>Le panier est vide</p>
            </div>`
        return [];
    }else{
       
        return panier;
    }
};

//on récupère le panier et on place l'id et la quantité de chaque produit dans un tableau
async function getPanierId(){   
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

////////////////////// Afficher les produits //////////////////////
//On implémente le HTML
function createElements(){

    console.log("LS - panier",panier)
    console.log("BDD - products",products)

    let panierComplet = [];

    // Pour chaque produit du panier LS
    // On va comparer chaque produit PRODUCTS et voir si l'id correspond
    // Dans ce cas, on recrée un produit tout neuf avec toutes les valeurs que l'on veut
    panier.forEach(function(p){
        products.forEach(function(product){
            if(p.id === product._id){
                //calculer les prix
                panierComplet.push({
                    name: product.name,
                    colors: p.colors,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    id: product._id,
                    number: p.number
                })
            }
        })
    })
    console.log("Panier reforgé - panierComplet",panierComplet)

    // On utilise le nouveau panier
    for(let product of panierComplet)
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

function eventSupprimerProduit(){
////////////////////// Boutton supprimer //////////////////////
const htmlBouttonSupprimer = document.querySelectorAll('.deleteItem');
//console.log("bouton supprimer", htmlBouttonSupprimer)
htmlBouttonSupprimer.forEach(bouton => {
        bouton.addEventListener("click", function(e) {
        e.preventDefault()
        console.log("event e",e)
        const produitEl = e.target.closest("article.cart__item");
        removeFromPanier(produitEl);
        window.location.reload()
           });
});
}


function removeFromPanier(produitEl){
    
    let index = panier.filter(p => p.id == produitEl.dataset.id && p.colors == produitEl.dataset.color);
    panier.splice(index, 1);
    savePanier(panier);
};


function eventChangeQuantity() {
    let changerQuantiter = document.querySelectorAll('.itemQuantity');
    //on créer une div pour les messages d'erreur du changement de quantité
    changerQuantiter.forEach(function(e){
        let errorElementQuantite = document.createElement("div");
        errorElementQuantite.setAttribute("class", "error-msg-modif-quantite");
        e.after(errorElementQuantite);
    });
    
    changerQuantiter.forEach(bouton => {
        bouton.addEventListener("change", function(e) {
        e.preventDefault()
        console.log("event e",e)
        //on selectionne le produit sur lequel on change la quantiter
        const produitEl = e.target.closest("article.cart__item");
        //si la quantiter est entre 1 et 100 on appel la fonction 'changerLaQuantiter' sinon on affiche un message d'erreur
        if (produitEl.getElementsByClassName('itemQuantity')[0].value > 0 && produitEl.getElementsByClassName('itemQuantity')[0].value < 101){
            console.log("element du boutton", produitEl)
            produitEl.getElementsByClassName('error-msg-modif-quantite')[0].innerText = ""
            changerLaQuantiter(produitEl)
            window.location.reload()
        }else{
            produitEl.getElementsByClassName('error-msg-modif-quantite')[0].innerText = "Veillez choisir une quantité entre 1 et 100"
        }
        })
    });
    
}

////////////////////// Option changer la quantiter //////////////////////


function changerLaQuantiter(produitEl){
    //on cherche dans le panier le produit qui corresponds a celui dont on veut modifier la quantiter
    
    let indexEl = panier.findIndex((p) => p.id == produitEl.dataset.id && p.colors == produitEl.dataset.color);
    let nouvelleQuantiter = produitEl.getElementsByClassName('itemQuantity');
    panier[indexEl].number = nouvelleQuantiter[0].value
    //remplacer la valeur quantiter du localStorage avec la nouvelle
    localStorage.setItem("produits", JSON.stringify(panier));
}
//////////////////////Total Panier Prix/Quantite//////////////////////

//récup les ID de tout les produits du localstrorage
//on créé des tableaux vide
let totalQuantity = [0];
let tousLesIdAvecQuantiter = [];
let totalPrice = 0;


function calculTotal(){
//on créé une boucle pour ajouter les quantités au tableau
for ( let product of panier){
    totalQuantity.push(parseInt(product.number))
};

//on additionne les quantités du tableau entre elle
const quantityTotal = totalQuantity.reduce(function(accumulateur,currentValue){
    return (accumulateur + currentValue);
})

//on les implante dans le HTML
const htmlTotalPanierQuantity = document.getElementById("totalQuantity");
htmlTotalPanierQuantity.innerHTML += `${quantityTotal}`;
}







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
function erreurChampManquant(el, msg){
    document.getElementById(el).innerText = msg
};

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
                erreurChampManquant('firstNameErrorMsg', "")
                return true;
            }else{
                erreurChampManquant('firstNameErrorMsg', "Ce champ est non valide");
                return false;
            }
        };
    
        function lastNameControl(){
            const nom = contact.lastName;
            if(regexLettre(nom)){
                erreurChampManquant('lastNameErrorMsg',"")
                return true;
            }else{
                erreurChampManquant('lastNameErrorMsg', "Ce champ est non valide")
                return false;
            }
        };
    
        function emailControl(){
            const email = contact.email;
            if(regexEmail(email)){
                erreurChampManquant('emailErrorMsg',"")
                return true;
            }else{
                erreurChampManquant('emailErrorMsg', "Ce champ est non valide")
                return false;
            }
        };
    
        function addressControl(){
            const address = contact.address;
            if(regexAdresse(address)){
                erreurChampManquant('addressErrorMsg',"")
                return true;
            }else{
                erreurChampManquant('addressErrorMsg', "Ce champ est non valide");
                return false;
            }
        };
    
        function cityControl(){
            const ville = contact.city;
            if(regexLettre(ville)){
                erreurChampManquant('cityErrorMsg', "")
                return true;
            }else{
                erreurChampManquant('cityErrorMsg', "Ce champ est non valide");
                return false;
            }
        };
        ///Contrôle validité formulaire avant envoi dans localStorage
        if(lastNameControl() && firstNameControl() && emailControl() && addressControl() && cityControl()){
        //On appelle la fonction de POST
        console.log("v")
        envoiPaquet(contact)
        }
});

//////////////////////Post//////////////////////

async function envoiPaquet(contact) {
    //on place les id des produits dans un tableau
    let products = [];
   
    panier.forEach(produits => {
        products.push(produits.id)
    })
    console.log("Id des produits du panier", products)
    // envoi à la ressource api
    const order = await fetch(`http://localhost:3000/api/products/order`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          contact,
          products
      })
    })
    .then((res) => {
        return res.json()
    })
    .catch(function() {
        window.location.href = '404.html';
      });
      window.location.href = `/front/html/confirmation.html?commande=${order.orderId}`;
      console.log("order",order)
};