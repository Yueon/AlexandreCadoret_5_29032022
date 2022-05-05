const htmlPanier = document.getElementById("cart__items")

// on récupère les donnés du localstorage

const panier = JSON.parse(localStorage.getItem('produits'));
console.log('localStorage : ',panier);

////////////////////// Afficher les produits //////////////////////
createElements(panier)


function createElements(panier){
    
    for(let product of panier)
    htmlPanier.innerHTML += 
    `<article class="cart__item" data-id="${product._id}" data-color="${product.colors}">
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
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`
}

////////////////////// Total Panier Prix + Quantite //////////////////////

const htmlTotalPanierQuantity = document.getElementById("totalQuantity");
const htmlTotalPanierPrice = document.getElementById("totalPrice");

//on créé des tableaux vide
let totalPanier = [];
let totalQuantity = [];

//on créé une boucle pour ajouter chaque prix/quantité au tableau
for ( let product of panier){
    totalPanier.push(product.totalPrice)
    totalQuantity.push(product.number * 1)
};
console.log('Prix Total', totalPanier);
console.log('Quantite Total', totalQuantity);

//on additionne les différentes quantité
const totalPrice = totalPanier.reduce(function(accumulateur,currentValue){
    return (accumulateur + currentValue);

});
const quantityTotal = totalQuantity.reduce(function(accumulateur,currentValue){
    return (accumulateur + currentValue);
});
console.log('Total panier : ', totalPrice);
console.log('Total Quantite : ', quantityTotal);

//on les rajoute au localstorage
localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
localStorage.setItem("quantityTotal", JSON.stringify(quantityTotal));

//on les implante dans le HTML
htmlTotalPanierPrice.innerHTML += `${totalPrice}`;
htmlTotalPanierQuantity.innerHTML += `${quantityTotal}`;


const htmlBouttonSupprimer = document.querySelector('.deleteItem');
        htmlBouttonSupprimer.addEventListener('click', function(e) {
            e.preventDefault()
            localStorage.removeItem("produits")
            window.location.reload()
});