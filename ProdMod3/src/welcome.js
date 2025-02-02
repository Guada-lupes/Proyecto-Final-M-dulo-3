const URL_API_BASE = "https://fakestoreapi.com";

/* ---------------------------------PETICIONES----------------------------------------------- */

//Petición GET de todos los productos a la API
async function getAllProducts() {
  const url = `${URL_API_BASE}/products`;
  try {
    const response = await fetch(url);
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

//Petición GET de un producto a traves de su id
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
    return null
  }
}

//Peticion DELETE para borrar producto
async function deleteProduct() {
  const id = this.parentElement.id;
  const url = `${URL_API_BASE}/products/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Fallo en la url: ${response.status}`);
    }
    const result = await response.json();
    //Si la petición es exitosa, eliminamos el producto del DOM
    document.getElementById(`${id}`).remove();
    console.log(`${result.title} ha sido eliminado`);
    alert(`El producto ${result.title} ha sido eliminado correctamente`);
  } catch (error) {
    console.error("Algo ha ido mal", error);
  }
}

//Peticion PUT para modificar datos
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

    if (!response.ok) {
      throw new Error(`Fallo en la url: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Algo ha ido mal", error);
    return null;
  }
}

/* ------------------------------------------DOM------------------------------------------------- */

//Renderizar las tarjetas con la información de los productos
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

    //Botón para modificar las características del producto
    const modifyButton = document.createElement("button");
    modifyButton.setAttribute("type", "click");
    modifyButton.textContent = "Modificar";
    modifyButton.addEventListener("click", modifyProduct);
    cardContainer.appendChild(modifyButton);
    //Botón para eliminar el producto
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "click");
    deleteButton.addEventListener("click", deleteProduct);
    deleteButton.textContent = "Eliminar";
    cardContainer.appendChild(deleteButton);

    cardsContainer.appendChild(cardContainer);
  });
}

  //Formulario para modificar las características del producto
  function modifyProductForm(product) {
    console.log("hola");
//Recuperamos el cardContainer del producto con su id y creamos un formulario dentro
    const cardContainer = document.getElementById(product.id);
    const form = document.createElement("form");
    form.setAttribute("data-id", product.id);
    cardContainer.appendChild(form);

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

    // Añadimos al form un evento que se activará al hacer click en enviar y ejecutará submitChanges
    form.addEventListener("submit", submitChanges);
  }


/* ------------------------------MANEJADORES DE EVENTOS ------------------------------------------------*/

//Esta funcion va a guardar los valores de todos los input en un objeto y enviarlos como parámetros a la petición PUT para modificar las caracterísiticas
async function submitChanges(evento) {
  evento.preventDefault();
  const id = this.dataset.id;

  const title = evento.target.title.value;
  const price = evento.target.price.value;
  const description = evento.target.description.value;
  const category = evento.target.category.value;
  const image = evento.target.image.value;

  const newData = {};

  //Comprobamos qué inputs contiene valores, para no enviar elementos vacios
  if (title) {
    newData.title = title;
  }
  if (price) {
    newData.price = price;
  }
  if (description) {
    newData.description = description;
  }
  if (category) {
    newData.category = category;
  }
  if (image) {
    newData.image = image;
  }
//Objeto que se enviará
  console.log(newData);

  //Llamamos a la función que ejecuta la petición PUT
  const response = await putChanges(newData, id);

  if (response) {
    console.log(
      "Los cambios han sido solicitados correctamente"
    );
    alert(
      `Se han producido los siguientes cambios:${JSON.stringify(
        response
      )}. Una vez verifiquemos estos cambios, serán efectivos en la plataforma.`
    );
//Eliminamos el formulario
    evento.target.innerHTML= "";
  } else {
    console.log("No se han podido realizar los cambios");
  }
}

//Esta función se activa con el evento del botón MODIFICAR, accderá al id del producto y hará una petición a la API de todas sus características para ejecutar la función modifyProductForm que desplegará un formulario con los inputs para modificar el producto.
function modifyProduct() {
  const productIdToModify = Number(this.parentElement.id);

  const getProduct = async (id) => {
    const product = await getProductById(id);
    console.log(product);
    modifyProductForm(product);
  };
  getProduct(productIdToModify);}

//Cargar todos los productos con la carga de la pagina
document.addEventListener("DOMContentLoaded", () => {
  getAllProducts();
});

//Botón para volver a la pantalla de inicio
document.getElementById("log-out-button").addEventListener("click", () => {
  window.location.href = "../index.html";
});
