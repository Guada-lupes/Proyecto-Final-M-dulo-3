const URL_API_BASE = "https://reqres.in";

//Petición POST para hacer login
async function login(email, password) {
  const url = `${URL_API_BASE}/api/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log(response.status);

    if (!response.ok) {
      throw new Error("Fallo en la url");
    }
    const result = await response.json();
    console.log(result);
    console.log(result.token);
    return result.token;
  } catch (error) {
    console.error("Algo ha ido mal", error);
    return null
  }
}

//Función para guardar los inputs y pasarlos como parámetros a la función login
function userLogin() {
  document
    .getElementById("login-form")
    .addEventListener("submit", async (evento) => {
      evento.preventDefault();
      const email = evento.target.email.value;
      const password = evento.target.password.value;

      //Validación para el email, comprobamos a través de una expresión regular que el email tiene punto, letras despues del punto y el arroba
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Por favor, introduce un email válido.");
        return;
      }

      //Validación para la contraseña. Sólo puedo poner contraseñas que contemple la API, por eso esta será la única comprobación.
      if(password.length < 4){alert("La contraseña debe tener al menos 4 caracteres");
      return;}  
      
      const token = await login(email, password);
      if (token) {

        window.location.href = "../public/welcome.html";
        console.log("Login correcto");
      } else {
        console.log("Login fallido");
        alert("El usuario no existe");
        evento.target.reset()
      }
    });
}

//Este boton para Registrarse nos redirigirá a la web de registro
document.getElementById("register-button").addEventListener("click", () => {
  window.location.href = "../public/register.html";
});


//Con la carga de la página  ejecutamos login
document.addEventListener("DOMContentLoaded", () => {
  userLogin();
});

