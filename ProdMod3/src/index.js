const URL_API_BASE = "https://reqres.in";

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
  }
}

// {
//   "email": "eve.holt@reqres.in",
//   "password": "cityslicka"
// }

function userLogin() {
  document
    .getElementById("login-form")
    .addEventListener("submit", async (evento) => {
      evento.preventDefault();
      const email = evento.target.email.value;
      const password = evento.target.password.value;
      
      const token = await login(email, password);
      if (token) {
        window.location.href = "../public/welcome.html";
        console.log("login correcto");
      } else {
        console.log("login fail");
      }
    });
}
document.getElementById("register-button").addEventListener("click", () => {
  window.location.href = "../public/register.html";
});

userLogin();
