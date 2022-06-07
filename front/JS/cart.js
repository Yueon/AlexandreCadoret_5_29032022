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
let tousLesIdAvecQuantiter = [];
let toutLesPrix = 0;
let tousLesPrixAvecQuantiter = [];

async function getPanierId(){
    let panier = getPanier();
    console.log("contenue du panier", panier)
panier.forEach(produits => {
    tousLesId.push(produits.id)
    tousLesIdAvecQuantiter.push({id: produits.id, qty: produits.number})
})
trouverProduitDansApi(products, tousLesId);
console.log("Tous les id avec quantiter",tousLesIdAvecQuantiter)
};

//On recupère le prix de chaque produit qu'on met dans un tableau
function trouverProduitDansApi(products, tousLesId) {
    products.forEach(function(product){
        tousLesId.forEach(function(index){
            if(product._id === index){
                toutLesPrix=toutLesPrix+product.price
            }
        })
    })
//console.log("tous les prix",toutLesPrix)
//console.log("tous les Id",tousLesId)


products.forEach(function(product){
    tousLesIdAvecQuantiter.forEach(function(index){
        if(product._id === index.id){
            console.log("index",index.qty)
            console.log("prix",product.price)
            //calculer les prix
            tousLesPrixAvecQuantiter+=(product.price*index.qty)
        }
    })
})
console.log("tous les prix avec quantité",tousLesPrixAvecQuantiter)

};

const htmlTotalPanierQuantity = document.getElementById("totalQuantity");
const htmlTotalPanierPrice = document.getElementById("totalPrice");

//on créé une boucle pour ajouter chaque prix/quantité au tableau
for ( let product of panier){
    totalQuantity.push(parseInt(product.number))
};
console.log('Quantite Total', totalQuantity);

const quantityTotal = totalQuantity.reduce(function(accumulateur,currentValue){
    return (accumulateur + currentValue);
});
//console.log('Total panier : ', totalPrice);
console.log('Total Quantite : ', quantityTotal);

//on les implante dans le HTML
htmlTotalPanierPrice.innerHTML += `${totalPrice}`;
htmlTotalPanierQuantity.innerHTML += `${quantityTotal}`;



//////////////////////Formulaire//////////////////////

//regex
const regexLettre = function(value){
    return /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i.test(value);
};

const regexEmail = function(value){
    return /^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,60}$/i.test(value);
};

const regexAdresse = function(value){
    return /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i.test(value);
};

//définition des textes d'erreurs
function erreurChampManquantVide(e){
    document.querySelector(`#${e}`).textContent = "";
}

function erreurChampManquant(e){
    document.querySelector(`#${e}`).textContent = "Ce champ n'est pas valide"
}

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
        console.log("contactClient",contactClient)

        //On contrôle les différents champs

        function firstNameControl(){
            const prenom = contactClient.firstName;
            if(regexLettre(prenom)){
                erreurChampManquantVide(firstNameErrorMsg)
                return true;
            }else{
                erreurChampManquant(firstNameErrorMsg)
                return false;
                //message erreur
            }
        };
    
        function lastNameControl(){
            const nom = contactClient.lastName;
            if(regexLettre(nom)){
                erreurChampManquantVide(lastNameErrorMsg)
                return true;
            }else{
                erreurChampManquant(lastNameErrorMsg)
                return false;
            }
        };
    
        function emailControl(){
            const email = contactClient.email;
            if(regexEmail(email)){
                erreurChampManquantVide(emailErrorMsg)
                return true;
            }else{
                erreurChampManquant(emailErrorMsg)
                return false;
            }
        };
    
        function addressControl(){
            const address = contactClient.address;
            if(regexAdresse(address)){
                erreurChampManquantVide(addressErrorMsg)
                return true;
            }else{
                erreurChampManquant(addressErrorMsg)
                return false;
            }
        };
    
        function cityControl(){
            const ville = contactClient.city;
            if(regexLettre(ville)){
                erreurChampManquantVide(cityErrorMsg)
                return true;
            }else{
                erreurChampManquant(cityErrorMsg)
                return false;
            }
        };
        ///Contrôle validité formulaire avant envoi dans localStorage
        if(lastNameControl() && firstNameControl() && emailControl() && addressControl() && cityControl()){
        //On appelle la fonction de POST
        localStorage.setItem("contactClient", JSON.stringify(contactClient));
        }else{
            console.log(`ERR : Le formulaire n'est pas bien rempli`);
        };
    });

//1-Ecoutez si les champs sont ok d'après la regex 
//2-si non => message d'erreur

