function commande() {
    sessionStorage.clear();
    localStorage.clear();
    let numcommande = new URLSearchParams(document.location.search).get("commande");
    document.querySelector("#orderId").innerHTML = `<br>${numcommande}<br>Merci pour votre achat`;
}
commande();