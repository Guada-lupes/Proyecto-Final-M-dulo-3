const URL_API_BASE = "https://reqres.in";

async function register(email, password){
    const url = `${URL_API_BASE}/api/register`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({email, password})
        })
        if(!response.ok){
            console.log(response.status);
            
            throw new Error ("Fallo en la url")
        }
        else{
            const result = await response.json();
            console.log(result);
            
            return result.id
        }
    } catch (error) {
        console.error("Algo ha ido mal", error)
    }
}

//register("eve.holt@reqres.in", "pistol");

function userRegister(){
document.getElementById("register-form").addEventListener("submit", async (evento)=>{
    evento.preventDefault();
    const email = evento.target.email.value;
    const password = evento.target.password.value;

    const token = await register(email, password);

    if(token) {
        window.location.href = "./welcome.html";
        console.log("registro correcto");
        
    }
        console.log("register fail");

})
}
userRegister();