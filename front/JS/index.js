import { getProducts } from "./api.js";



console.log("window Location:", window.location);

//On va chercher les données de L'API

window.onload = async () => {
  const products = await getProducts()
  console.log(products)
  createElements(products)
}

function createElements(products){
  for(let produit of products){
    console.log("details de chaque produit :", produit)
  

    //On implémente le HTML
    const itemsHtml = document.getElementById('items');

    itemsHtml.innerHTML += `<a href ="./product.html?id=${produit._id}">
                              <article>
                                  <img src="${produit.imageUrl}" alt="${produit.altTxt}, ${produit.name}">
                                  <h3 class="productName">${produit.name}</h3>
                                  <p class="productDescription">${produit.description}</p>
                              </article>
                            </a>`;
                            }
}