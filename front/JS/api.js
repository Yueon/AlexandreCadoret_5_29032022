const url = "http://localhost:3000/api/products";


export function getProducts(){
  return fetch(url)
  .then(function(res){
    if (res.ok) {
      return res.json();
    }
  })
  .catch(function(err) {
    console.log(err)
    // Une erreur est survenue faire un truc
  });
}


export function getProduct(urlId){
  return fetch(`${url}/${urlId}`)
  .then(function(res){
    if (res.ok) {
      return res.json();
    }
  }) 
  .catch(function(err) {
    console.log(err)
    // Une erreur est survenue faire un truc
  });
}