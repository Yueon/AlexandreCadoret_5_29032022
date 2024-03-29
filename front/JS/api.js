const url = "http://localhost:3000/api/products";


export function getProducts() {
  return fetch(url)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(function () {
      window.location.href = '404.html';
    });
}


export function getProduct(urlId) {
  return fetch(`${url}/${urlId}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(function () {
      window.location.href = '404.html';
    });
}