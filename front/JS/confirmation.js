//On récupère la réponse du serveur renvoyée par POST
const order = JSON.parse(localStorage.getItem('order'));
console.log('Réponse serveur :', order)