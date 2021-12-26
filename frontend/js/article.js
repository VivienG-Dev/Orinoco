(async function () {
  const productId = paramUrl("id");
  const productData = await getProductData(productId);
  if(productData){
    displayProduct(productData);
    getColors(productData);
    saveProduct(productData);
    getQuantity();
  }
})();

// Extraction de l'ID du produit, à partir de l'URL
function paramUrl(param) {
  return new URL(location.href).searchParams.get(param);
}

// Permet d'utiliser fetch n'importe ou en l'utilisant au besoin comme un parametre dans une autre fonction
function getProductData(productId) {
  return fetch(`http://localhost:3000/api/teddies/${productId}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => {
      let divError = document.createElement("div");
      let divTitle = document.createElement("h2");
      let divDesc = document.createElement("p");
      let product = document.getElementById('product');
    
      divError.setAttribute("class", "w-full lg:w-6/12 px-4 pt-32")
      divTitle.setAttribute("class", "text-4xl font-semibold")
      divDesc.setAttribute("class", "text-lg leading-relaxed m-4 text-gray-600")
    
      product.remove();
      document.getElementById("content").appendChild(divError)
      divError.appendChild(divTitle)
      divError.appendChild(divDesc)


      divTitle.textContent = "Erreur"
      divDesc.textContent = "Aucun produits n'est disponible pour le moment"
    });
}

// Récupération d'un produit en passant par l'ID de ce même produit et fetch afin de l'afficher dans la page article.html
function displayProduct(data) {
  console.log(data)
  // Mise en forme du prix des articles en euros
  const price = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(data.price / 100);

  // Ajout des éléments récupérés avec fetch dans le DOM
  let itemName = document.querySelector(".itemName");
  itemName.append(`${data.name}`);

  let itemPrice = document.querySelector(".itemPrice");
  itemPrice.append(`${price}`);

  let itemDescription = document.querySelector(".itemDescription");
  itemDescription.append(`${data.description}`);

  let itemImage = document.querySelector(".itemImage");
  itemImage.src = data.imageUrl;
  itemImage.alt = data.name;
}

// Ajout d'une quantité limite (10) lors du choix de l'utilisateur (en principe la limite est décidé dans le back-end)
function getQuantity() {
  let quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let output = "";
  quantity.forEach((item) => {
    output += `<option value="${item}">${item}</option>`;
  });
  document.getElementById("quantity").innerHTML = output;
}

// Récupération des couleurs de l'article pour affichage dans le DOM
function getColors(data) {
  let output = "";
  data.colors.forEach((color) => {
    output += `<option value="${color}">${color}</option>`;
  });
  document.getElementById("colors").innerHTML = output;
}

// Sauvegarder le choix de l'utilisateur dans le local storage
function saveProduct(data) {
  // Mise en forme du prix des articles en euros
  let price = new Intl.NumberFormat("fr-FR").format(data.price / 100);

  const envoyerPanier = document.getElementById("sendCart");
  envoyerPanier.addEventListener("click", (e) => {
    e.preventDefault();

    // Affiche la fenêtre au clique
    modal();

    // Variables afin de sauvegarder le choix de l'utilisateur sur la couleur et la quantité
    const selectColor = document.getElementById("colors");
    let valueColor = selectColor.options[selectColor.selectedIndex].value;

    const selectQty = document.getElementById("quantity");
    let valueQty = selectQty.options[selectQty.selectedIndex].value;

    // Ajout des données de l'utilisateur dans un objet afin de préparer l'envoi dans le localStorage
    let product = {
      idProduit: `${data._id}`,
      nomProduit: `${data.name}`,
      quantity: parseFloat(valueQty),
      couleurProduit: valueColor,
      prixProduit: parseFloat(price),
    };

    let products = JSON.parse(localStorage.getItem("products")) || [];
    let arrayProducts = [];

    if (products == null || products == 0) {
      products.push(product);
      localStorage.setItem("products", JSON.stringify(products));
    } else {
      products.map((data) => {
        if (
          product.idProduit == data.idProduit &&
          product.couleurProduit == data.couleurProduit &&
          product.quantity + data.quantity < 10
        ) {
          product.quantity += data.quantity;
        } else {
          arrayProducts.push(data);
        }
      });
      arrayProducts.push(product);
      localStorage.setItem("products", JSON.stringify(arrayProducts));
    }
  });
}

// Fonction permettant l'activation d'une fenêtre de confirmation après une mise en panier
function modal() {
  // On active directement la fenêtre au click "Ajouter au panier"
  toggleModal();

  // On cible tous les boutons permettant de fermer la fenêtre et on active la fonction toggleModal() au click
  const closemodal = document.querySelectorAll(".modal-close");
  for (var i = 0; i < closemodal.length; i++) {
    closemodal[i].onclick = function () {
      toggleModal();
      window.location.reload();
    };
  }

  // Option supplémentaire, on utilise keydown pour activer la fonction toggleModal() et ainsi fermer la fenêtre
  // e.keyCode est "Deprecated" mais permet une relative compatibilité avec IE
  document.onkeydown = function (e) {
    e = e || window.event;
    if (e.keyCode === 27 || e.key === "Escape" || e.key === "Esc") {
      toggleModal();
    }
  };

  // Pour permettre d'ajouter/enlever les class necessaires à l'activation de la fenêtre
  function toggleModal() {
    const body = document.querySelector("body");
    const modal = document.querySelector(".modal");
    modal.classList.toggle("opacity-0");
    modal.classList.toggle("pointer-events-none");
    body.classList.toggle("modal-active");
  }
}
