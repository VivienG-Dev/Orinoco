let products = JSON.parse(localStorage.getItem("products"));

(async function () {
  await displayCart();
  deleteItem();
  clearCart();
  decrementQuantity();
  incrementQuantity();
  totalPrice();
  dataForm();
})();

// Affichage des items dans le DOM
function displayCart() {
  // Selection de l'id ou va être injecté le contenu
  const content = document.getElementById("content");

  // Condition d'affichage du panier
  if (products === null || products == 0) {
    let output = `
              <article>
                <div
                  class="
                    relative
                    min-w-0
                    break-words
                    bg-white
                    w-full
                    mb-8
                    py-5
                    px-4
                    shadow-lg
                    rounded-lg
                  "
                >
                  <p
                    id="article_body"
                    class="text-center text-lg lg:text-xl font-semibold"
                  >
                    Le panier est vide
                  </p>
                </div>
              </article>
    `;

    content.innerHTML = output;
  } else {
    let output = [];
    products.forEach((item) => {
      output += `
      <article>
        <div class="
              relative
              min-w-0
              break-words
              bg-white
              w-full
              mb-6
              shadow-lg
              rounded-lg
            ">
          <div class="px-4 pt-5 flex justify-around">
            <div class="flex w-full justify-around">
              <div class="text-center">
                <label for="">Nom</label>
                <h2 class="text-lg lg:text-xl font-semibold">
                ${item.nomProduit}
                </h2>
              </div>
              <div class="text-center">
                <label for="">Couleur</label>
                <p class="text-lg lg:text-xl font-semibold">${
                  item.couleurProduit
                }</p>
              </div>
              <div class="text-center">
                <label for="">Quantité</label>
                <p class="quantity text-lg lg:text-xl font-semibold">${
                  item.quantity
                }</p>
                <button class="minus text-lg font-bold px-2 rounded-md bg-gray-400 hover:bg-gray-500 text-white">-</button>
                <button class="plus text-lg font-bold px-2 rounded-md bg-gray-500 hover:bg-gray-700 text-white">+</button>
              </div>
              <div class="text-center">
                <label for="">Prix</label>
                <p class="test text-lg lg:text-xl font-semibold">${
                  item.prixProduit * item.quantity
                }€</p>
              </div>
            </div>
          </div>
          <div class="px-4 py-5 flex items-center justify-center lg:flex">
            <a href="/" class="btn-delete text-indigo-600 hover:text-indigo-900">Supprimer</a>
          </div>
        </div>
      </article>
        `;
    });
    content.innerHTML = output;
  }
}

// Afficher le total des articles 
function updateTotalQuantity() {
  const displayQty = document.querySelector(".total-qty");

  // On prépare une variable contenant 0
  let total = 0;
  // On utilise la fonction map afin de créer un nouveau tableau pour récupérer/additionner les quantiés
  products.map(data => {
    total += data.quantity;
  })
  // Affichage du total dans le bouton panier
  displayQty.innerText = `(${total})`;
  // document.querySelector('.quantity').innerHTML = `${products[i].quantity}`;
};

// Modifier et sauvegarder la quantité d'un produit déjà dans le panier
const decrementQuantity = () => {
  let plusBtn = document.querySelectorAll(".minus");
  let quantity = document.querySelectorAll('.quantity');
  let totalProduct = document.querySelectorAll('.test');
  plusBtn = [...plusBtn];
  quantity = [...quantity];
  totalProduct = [...totalProduct];

  for (let i = 0; i < plusBtn.length; i++) {
    plusBtn[i].addEventListener("click", (e) => {
      e.preventDefault();
      if (products[i].quantity > 1) {
        products[i].quantity -= 1;
      }
      localStorage.setItem("products", JSON.stringify(products));
      totalPrice();
      updateTotalQuantity();
      quantity[i].innerText = `${products[i].quantity}`;
      totalProduct[i].innerText = `${products[i].prixProduit * products[i].quantity}€`;
    });
  }
};

// Modifier et sauvegarder la quantité d'un produit déjà dans le panier
const incrementQuantity = () => {
  let plusBtn = document.querySelectorAll(".plus");
  let quantity = document.querySelectorAll('.quantity');
  let totalProduct = document.querySelectorAll('.test');
  plusBtn = [...plusBtn];
  quantity = [...quantity];
  totalProduct = [...totalProduct];

  for (let i = 0; i < plusBtn.length; i++) {
    plusBtn[i].addEventListener("click", (e) => {
      e.preventDefault();
      if (products[i].quantity >= 1 && products[i].quantity < 10) {
        products[i].quantity += 1;
      }
      localStorage.setItem("products", JSON.stringify(products));
      totalPrice();
      updateTotalQuantity();
      quantity[i].innerText = `${products[i].quantity}`;
      totalProduct[i].innerText = `${products[i].prixProduit * products[i].quantity}€`;
    });
  }
};

// Supprimer un produit
function deleteItem() {
  let deleteBtn = document.querySelectorAll(".btn-delete");

  // On transforme la nodeList (incompatible) en tableau (ES6 method)
  deleteBtn = [...deleteBtn];

  // On supprime l'objet de l'utilisateur
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", (e) => {
      e.preventDefault();
      // Modification du contenu du tableau en retirant un seul élément ciblés (0, 1, 2...)
      products.splice([i], 1);

      // On update le localStorage à chaque changement
      localStorage.setItem("products", JSON.stringify(products));

      // reload la page sans perdre les données du formulaire
      window.location.reload();
    });
  }
}

// Vider entièrement le panier
function clearCart() {
  let clearBtn = document.querySelector(".btn-clearCart");

  clearBtn.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.clear();

    window.location.reload();
  });
}

// Calcul du prix total
function totalPrice() {
  // On prépare un array vide pour y placer le prix total
  let totalPrice = [];
  const content = document.getElementById("total-price");
  // On utilise la fonction reducer() afin de d'additionner les valeurs (içi le prix) des items
  const reducer = (previousValue, currentValue) => previousValue + currentValue;

  // Condition si le tableau d'objet "products" est null (vide) on affiche 0€, sinon on calcule et affiche le prix
  if (products == null || products == null) {
    return (content.innerText = "Prix Total : 0€");
  }

  // On utilise forEach récupérer le prix des items.
  products.forEach((item) => {
    let prix = item.prixProduit * item.quantity;
    totalPrice.push(prix);
  });
  totalPrice = totalPrice.reduce(reducer, 0);

  // On ajoute le prix total dans le localStorage pour la page de confirmation
  localStorage.setItem("Total", `${totalPrice}`);

  // On affiche le prix dans le DOM
  content.innerText = `Prix Total : ${totalPrice}€`;
}

// Récupérer les données du formulaire et les envoyer dans le localStorage
function dataForm() {
  const paymentBtn = document.getElementById("form");

  paymentBtn.addEventListener("submit", (e) => {
    e.preventDefault();

    // On cible tous les elements du formulaire précisant afin de récupérer les données de l'utilisateur
    let firstName = document.getElementById("first-name");
    let lastName = document.getElementById("last-name");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let email = document.getElementById("email");

    // Nouvelles variables afin d'appliquer la fonction trim() aux données du formulaire.
    // trim() permettant de supprimer les espaces au début et à la fin
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const addressValue = address.value.trim();
    const cityValue = city.value.trim();
    const emailValue = email.value.trim();

    // Permettre de rajouter tous les values des inputs dans un tableau pour vérification finale
    let toBeChecked = [];
    // Vérification des input présent à l'intérieur du formulaire
    if (firstNameValue === "") {
      setError(firstName, "Le prénom est requis");
    } else if (firstName.value.length >= 255) {
      setError(firstName, "Maximum 255 caractères");
      firstName.value = "";
    } else {
      setSuccess(firstName);
      toBeChecked.push(firstNameValue);
    }

    if (lastNameValue === "") {
      setError(lastName, "Le nom est requis");
    } else if (lastName.value.length >= 255) {
      setError(lastName, "Maximum 255 caractères");
      lastName.value = "";
    } else {
      setSuccess(lastName);
      toBeChecked.push(lastNameValue);
    }

    if (addressValue === "") {
      setError(address, "L'adresse est requise");
    } else if (address.value.length >= 255) {
      setError(address, "Maximum 255 caractères");
      address.value = "";
    } else {
      setSuccess(address);
      toBeChecked.push(addressValue);
    }

    if (cityValue === "") {
      setError(city, "La ville est requise");
    } else if (city.value.length >= 255) {
      setError(city, "Maximum 255 caractères");
      city.value = "";
    } else {
      setSuccess(city);
      toBeChecked.push(cityValue);
    }

    if (emailValue === "") {
      setError(email, "L'email est requis");
    } else if (!isValidEmail(emailValue)) {
      setError(email, "L'email n'est pas valide");
    } else {
      setSuccess(email);
      toBeChecked.push(emailValue);
    }

    // Tableau de comparaison entre les valeurs de l'utilisateur et celles neccessaires pour la vérification finale
    const isChecked = [
      firstNameValue,
      lastNameValue,
      addressValue,
      cityValue,
      emailValue,
    ];

    // Si tous les inputs sont envoyés dans le tableau "toBeChecked" et correspondent au tableau "isChecked" et si le panier n'est pas vide alors on la variable order est remplie et on lance la requête fetch
    if (
      JSON.stringify(toBeChecked) === JSON.stringify(isChecked) &&
      products !== null
    ) {
      // On cible l'ID des produits du panier
      const productsID = products.map((product) => {
        return product.idProduit;
      });

      // On ajoute les données du formulaire en ajoutant les values des champs dans un objet + le "tableau d'ID" des produits de l'utilisateur en provenance direct du localStorage
      const order = {
        contact: {
          firstName: firstNameValue,
          lastName: lastNameValue,
          address: addressValue,
          city: cityValue,
          email: emailValue,
        },
        products: productsID,
      };

      // On envoie les données de la variable "order" vers le serveur avec fetch et la méthode post.
      // Entête de la requête
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json; charset=utf-8" },
      };

      // fetch pour envoyer les données au localStorage et rediriger vers la page de confirmation
      fetch("http://localhost:3000/api/teddies/order", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          localStorage.removeItem("products");
          localStorage.setItem("orderId", data.orderId);
          document.location.href = `confirmation.html`;
        })
        .catch((error) => {
          alert("Il y a eu une erreur : " + error);
        });
    }
  });
}

// Permet d'afficher visuellement si un input n'a pas été validé
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerHTML = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

// Permet d'afficher visuellement si un input a été validé
const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerHTML = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

// Validation de l'email avec une expression régulière
const isValidEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLocaleLowerCase());
};
