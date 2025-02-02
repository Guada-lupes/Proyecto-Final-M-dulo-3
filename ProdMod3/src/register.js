const URL_API_BASE = "https://reqres.in";

//Petición Post para registrar un nuevo usuario

async function register(email, password) {
  const url = `${URL_API_BASE}/api/register`;
  console.log(email, password);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      console.log(response.status);

      throw new Error("Fallo en la url");
    } else {
      const result = await response.json();
      console.log(result);

      return response.status;
    }
  } catch (error) {
    console.error("Algo ha ido mal", error);
    return null;
  }
}
//Función para escuchar los valores de los inputs, comprobar su validez y enviarlos como parámetros a la función asíncrona register. Si recibimos respuesta correcta no redirige a la welcome web.
function userRegister() {
  document
    .getElementById("register-form")
    .addEventListener("submit", async (evento) => {
      console.log(evento.target);

      evento.preventDefault();
      const email = evento.target.email.value;
      const password = evento.target.password.value;

      //Validación para el email
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Por favor, introduce un email válido.");
        return;
      }
      //Validación para la contraseña. Sólo puedo poner contraseñas que contemple la API, por eso esta será laúnica comprobación.
      if(password.length < 4){alert("La contraseña debe tener al menos 4 caracteres");
      return;}

      const token = await register(email, password);
      console.log(typeof token);

      if (token === 200) {
        console.log(token);

        alert("Te has registrado correctamente");
        window.location.href = "./welcome.html";
        console.log("Registro correcto");
      } else {
        alert("Nombre de usuario no disponible");
        console.log("Registro fallido");
        evento.target.reset();
      }
    });
}

//Con la carga de la página  ejecutamos register
document.addEventListener("DOMContentLoaded", () => {
  userRegister();
});