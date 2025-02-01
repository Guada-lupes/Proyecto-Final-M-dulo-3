const URL_API_BASE = "https://fakestoreapi.com";

//Petición de todos los productos a la API
async function getAllProducts() {
  const url = `${URL_API_BASE}/products`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Fallo en la url`);
      console.log(response.status);
    }
    const result = await response.json();
    console.log(result);
    console.log(response.status);
    productsCards(result)
  } catch (error) {
    console.error("Algo ha ido mal", error);
  }
}

//Renderizar las tarjetas con la infOrmación de los productos
function productsCards(data) {
  const cardsContainer = document.getElementById("products-container");

  console.log("hola");
  
  data.forEach((product) => {
    const cardContainer = document.createElement("div")

    //Tarjetas con imagen, título y precio
    const img = document.createElement("img");
    img.setAttribute("src", product.image);
    img.setAttribute("width", "200px");
cardContainer.appendChild(img);
    const title = document.createElement("h1");
    title.textContent = product.title;
    cardContainer.appendChild(title);
    const price = document.createElement("p");
    price.textContent = product.price;
    cardContainer.appendChild(price);

    //boton modificar
    const modifyButton = document.createElement("button");
    modifyButton.setAttribute("type", "click");
    modifyButton.textContent = "Modificar";
    deleteButton.addEventListener("click", modifyProduct)
    cardContainer.appendChild(modifyButton);
//botón borrar
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "submit");
    deleteButton.addEventListener("submit", deleteProduct);
    deleteButton.textContent = "Eliminar";
    cardContainer.appendChild(deleteButton);

      cardsContainer.appendChild(cardContainer)
  }

);
}

//borrar producto

function deleteProduct() {
    
}

function modifyProduct() {}

document.addEventListener("DOMContentLoaded", () => {
  console.log("El DOM ha cargado correctamente");
  getAllProducts();
});

document.getElementById("log-out-button").addEventListener("click", () => {
  window.location.href = "../index.html";
});
