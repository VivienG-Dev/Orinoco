(async function () {
  displayQty();
})();

// Affiche la quantité total du panier dans le header
function displayQty() {
  const products = JSON.parse(localStorage.getItem("products"));
  const displayQty = document.querySelector(".total-qty");

  // On prépare une variable contenant 0
  let total = 0;
  // On utilise la fonction map afin de créer un nouveau tableau pour récupérer/additionner les quantiés
  products.map(data => {
    total += data.quantity;
  })
  // Affichage du total dans le bouton panier
  displayQty.innerHTML = `(${total})`;
};
