const URL_API_BASE = "https://fakestoreapi.com";

//Petición de todos los productos a la API
async function getAllProducts() {
  const url = `${URL_API_BASE}/products`;
  try {
    const response = await fetch(url);
    console.log(response.status);
    if (!response.ok) {
      throw new Error(`Fallo en la url`);
    }
    const result = await response.json();
    console.log(result);
    console.log(response.status);
    productsCards(result);
  } catch (error) {
    console.error("Algo ha ido mal", error);
  }
}

//Petición de un producto a traves de su id

async function getProductById(id) {
  const url = `${URL_API_BASE}/products/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Fallo en la url: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Algo ha ido mal", error);
  }
}

//Renderizar las tarjetas con la infOrmación de los productos
function productsCards(data) {
  const cardsContainer = document.getElementById("products-container");

  data.forEach((product) => {
    const cardContainer = document.createElement("div");
    cardContainer.id = product.id;

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
    modifyButton.addEventListener("click", modifyProduct);
    cardContainer.appendChild(modifyButton);
    //botón borrar
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "click");
    deleteButton.addEventListener("click", deleteProduct);
    deleteButton.textContent = "Eliminar";

    cardContainer.appendChild(deleteButton);

    cardsContainer.appendChild(cardContainer);
  });
}

//borrar producto

function deleteProduct() {
  console.log("hola");
  const productIdToRemove = this.parentElement.id;
  document.getElementById(`${productIdToRemove}`).remove();
  console.log(`${productIdToRemove} ha sido eliminado`);
}

//modificar producto

function modifyProduct() {
  const productIdToModify = Number(this.parentElement.id);

  const getProduct = async (id) => {
    const product = await getProductById(id);
    console.log(product);
    modifyProductForm(product);
  };
  getProduct(productIdToModify);

  //Creamos una tarjeta con los datos de la tarjeta a modificar

  function modifyProductForm(product) {
    console.log("hola");

    const cardContainer = document.getElementById(product.id);
    const form = document.createElement("form");
    form.setAttribute("data-id", product.id);
    cardContainer.appendChild(form);

    const id = document.createElement("input");
    id.setAttribute("type", "text");
    id.setAttribute("placeholder", "id");
    id.name = "id";
    form.appendChild(id);

    const title = document.createElement("input");
    title.setAttribute("type", "text");
    title.setAttribute("placeholder", "Título");
    title.name = "title";
    form.appendChild(title);

    const price = document.createElement("input");
    price.setAttribute("type", "text");
    price.setAttribute("placeholder", "Precio");
    price.name = "price";
    form.appendChild(price);

    const description = document.createElement("input");
    description.setAttribute("type", "text");
    description.setAttribute("placeholder", "Descripción");
    description.name = "description";
    form.appendChild(description);

    const category = document.createElement("input");
    category.setAttribute("type", "text");
    category.setAttribute("placeholder", "Categoría");
    category.name = "category";
    form.appendChild(category);

    const image = document.createElement("input");
    image.setAttribute("type", "text");
    image.setAttribute("placeholder", `Url`);
    image.name = "image";
    form.appendChild(image);

    const button = document.createElement("button");
    button.setAttribute("type", "click");
    button.textContent = "Enviar";
    form.appendChild(button);

    form.addEventListener("submit", submitChanges);
  }
}

//Esta funcion va a guardar los valores de todos los input en un objeto
async function submitChanges(evento) {
  evento.preventDefault();
  const id = this.dataset.id;

  const title = evento.target.title.value;
  const price = evento.target.price.value;
  const description = evento.target.description.value;
  const category = evento.target.category.value;
  const image = evento.target.image.value;

  const newData = { title, price, description, category, image };

const response = await putChanges(newData, id);
  
  if (response === 200) {
    console.log("Los cambios se han realizado correctamente");
  }else{
    console.log("No se han podido realizar los cambios");
  }

}

//peticion put de modificar datos
async function putChanges(data, id) {
  const url = `${URL_API_BASE}/products/${id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(response);
    
    if (!response.ok) {
      throw new Error(`Fallo en la url: ${response.status}`);
    }
    const result = await response.json();

    console.log(result);
    
    console.log(`Esta es la respuesta${response}`);
    console.log(`Esta es el resultado: ${result}`);
    console.log(`Este es el estatus: ${response.status}`);

    return response.status;
  } catch (error) {
    console.error("Algo ha ido mal", error);
    return null
  }
}

//Cargar todos los productos con la carga de la pagina
document.addEventListener("DOMContentLoaded", () => {
  console.log("El DOM ha cargado correctamente");
  getAllProducts();
});

document.getElementById("log-out-button").addEventListener("click", () => {
  window.location.href = "../index.html";
});
