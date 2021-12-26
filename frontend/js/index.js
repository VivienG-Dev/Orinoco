// Fonction auto appelée (auto-exécutable) au chargement de la page
(async function () {
  const products = await getProducts();
  displayProducts(products);
})();

// Permet d'utiliser fetch n'importe ou en l'utilisant au besoin comme un parametre dans une autre fonction
function getProducts() {
  return fetch("http://localhost:3000/api/teddies")
    .then((res) => res.json())
    .then((products) => products)
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Permet d'afficher les produits préalablement choisis dans la fonction getProducts
function displayProducts(products) {
  // let output = "";
  products.forEach((product) => {
    // Mise en forme du prix des produits en euros
    const price = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(product.price / 100);

    let divProduct = document.createElement("article");
    let linkProduct = document.createElement("a");
    let divFlex = document.createElement("div");
    let divPadding = document.createElement("div");
    let divCenter = document.createElement("div");
    let divImage = document.createElement("img");
    let divText = document.createElement("div");
    let divTitle = document.createElement("h2");
    let divPrice = document.createElement("span");
    let divDesc = document.createElement("p");

    divProduct.setAttribute("class", "w-full md:w-4/12 px-0 md:px-4 lg:hover:scale-100 xl:hover:scale-105 transform transition ease-out duration-500")
    linkProduct.setAttribute("href", "article.html?id=" + product._id)
    divFlex.setAttribute("class", "relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg")
    divPadding.setAttribute("class", " px-4 py-5 flex-auto")
    divCenter.setAttribute("class", "text-center inline-flex items-center justify-center mb-5 w-full")
    divImage.setAttribute("class", "rounded-lg object-cover h-64 w-full")
    divImage.setAttribute("src", product.imageUrl)
    divImage.setAttribute("alt", product.name)
    divText.setAttribute("class", "flex justify-between items-center mb-4")
    divTitle.setAttribute("class", "text-xl font-semibold")
    divPrice.setAttribute("class", "p-4 text-center inline-flex items-center justify-center w-81 h-5 rounded-lg font-semibold bg-primary")
    divDesc.setAttribute("class", "mt-2 mb-4 text-gray-600")

    document.getElementById("content").appendChild(divProduct)
    divProduct.appendChild(linkProduct)
    linkProduct.appendChild(divFlex)
    divFlex.appendChild(divPadding)
    divPadding.appendChild(divCenter)
    divCenter.appendChild(divImage)
    divPadding.appendChild(divText)
    divText.appendChild(divTitle)
    divText.appendChild(divPrice)
    divPadding.appendChild(divDesc)

    divTitle.textContent = product.name
    divPrice.textContent = price
    divDesc.textContent = product.description


    // output += `
    //     <article class="w-full md:w-4/12 px-0 md:px-4 lg:hover:scale-100 xl:hover:scale-105 transform transition ease-out duration-500">
    //       <a href="article.html?id=${product._id}">
    //         <div class="
    //             relative
    //             flex flex-col
    //             min-w-0
    //             break-words
    //             bg-white
    //             w-full
    //             mb-8
    //             shadow-lg
    //             rounded-lg
    //           ">
    //         <div class="px-4 py-5 flex-auto">
    //           <div class="
    //                 text-center
    //                 inline-flex
    //                 items-center
    //                 justify-center
    //                 mb-5
    //                 w-full
    //               ">
    //             <img class="rounded-lg object-cover h-64 w-full" src="${product.imageUrl}" alt="${product.name}">
    //           </div>
    //           <div class="flex justify-between items-center mb-4">
    //             <h2 class="text-xl font-semibold">${product.name}</h2>
    //             <span class="
    //             p-4
    //             text-center
    //             inline-flex
    //             items-center
    //             justify-center
    //             w-81
    //             h-5
    //             rounded-lg
    //             font-semibold
    //             bg-primary">${price}</span>
    //           </div>
    //           <p class="mt-2 mb-4 text-gray-600">
    //             ${product.description}
    //           </p>
    //         </div>
    //       </div>
    //       </a>
    //     </article>
    //     `;
  });
  // Implémentation de la variable output dans la page index.html
  // document.getElementById("content").innerHTML = output;
}