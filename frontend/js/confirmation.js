(async function () {
  displayOrder();
})();

// Affichage de l'id et du prix total de la commande
function displayOrder() {
  const price = localStorage.getItem("Total");
  const orderId = new URL(location.href).searchParams.get('orderId') || 'ERREUR'

  // Selection de l'id ou va être injecté le contenu
  const content = document.getElementById("content");

  if (orderId != 'ERREUR') {
    let output = `Félicitation ! Votre commande numéro : ${orderId} a bien été enregistrée pour un total de ${price}€`;
    content.innerText = output;
    localStorage.clear();
  } else {
    let output = `Vous n'avez pas de commande`;
    content.innerText = output;
  }
}