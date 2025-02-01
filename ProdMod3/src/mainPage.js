const URL_API_BASE = "https://fakestoreapi.com";

async function getAllProducts() {
  const url = `${URL_API_BASE}/products`;
  try {
    const response = await fetch(url);

    console.log(response.status);
    
    if(!response.ok) {
      throw new Error ("Fallo en la url", response.status)
    }
    const result = await response.json();
    console.log(result);
    
  } catch (error) {
    console.log("Algo ha ido mal", error);
    
  }
}

getAllProducts();