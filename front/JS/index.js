




//On va chercher les données de L'API
fetch("http://localhost:3000/api/products")
  .then(function(res){
    if (res.ok) {
      return res.json();
    }
  })

//On prends les produits
  .then(function(value){
    console.log(value)
    console.log("nombre de produit", value.length)

    for(let produit of value){
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
                          })





  .catch(function(err) {
    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message)
    // Une erreur est survenue
  });

