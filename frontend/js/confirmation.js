(async function () {
  displayOrder();
})();

// Affichage de l'id et du prix total de la commande
function displayOrder() {
  const orderId = localStorage.getItem("orderId");
  const price = localStorage.getItem("Total");

  // Selection de l'id ou va être injecté le contenu
  const content = document.getElementById("content");

  // Condition d'affichage du panier
  if (orderId === null || orderId == 0) {
    let output = `Vous n'avez pas de commande`;
    content.innerText = output;
  } else {
    let output = `Félicitation ! Votre commande numéro : ${orderId} a bien été enregistrée pour un total de ${price}€`;
    content.innerText = output;
    localStorage.clear();
  }
}