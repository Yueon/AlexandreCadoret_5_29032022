// mettre les fonctions utiliser sûr plusieurs pages

export function savePanier(panier) {
    localStorage.setItem("produits", JSON.stringify(panier));
}

export function getPanier() {
    let panier = localStorage.getItem("produits");
    if (panier == null) {
        return [];
    } else {
        console.log('Il y a déjà des produits dans le localStrorage')
        return JSON.parse(panier);
    }
}


