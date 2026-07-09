const menuBtn = document.querySelector("#menu-toggle");
const menu = document.querySelector("#nav-links");


menuBtn.addEventListener("click",()=>{

    menu.classList.toggle("active");
    menuBtn.classList.toggle("active");

});

const links = document.querySelectorAll(".nav-links a");

links.forEach(link=>{

    link.addEventListener("click",()=>{

        menu.classList.remove("active");
        menuBtn.classList.remove("active");

    });

});

document.getElementById('miFormulario').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const formulario = event.target;
    const boton = document.getElementById('botonEnviar');
    const estado = document.getElementById('mensajeEstado');
    
    boton.disabled = true;
    boton.innerText = "Enviando...";
    estado.style.color = "black";
    estado.innerText = "Procesando envío...";

    // Enviamos directamente un objeto FormData nativo sin JSON.stringify
    // Esto es lo que FormSubmit espera recibir para poder leer los textos
    fetch(formulario.action, {
        method: formulario.method,
        headers: {
            'Accept': 'application/json'
        },
        body: new FormData(formulario) 
    })
    .then(response => {
        if (response.ok) {
            estado.style.color = "green";
            estado.innerText = "¡Mensaje enviado con éxito! Me pondré en contacto pronto.";
            formulario.reset(); // Limpia los campos del formulario
        } else {
            throw new Error('Error en la respuesta del servidor');
        }
    })
    .catch(error => {
        console.error(error);
        estado.style.color = "red";
        estado.innerText = "Hubo un problema al enviar. Intenta de nuevo más tarde.";
    })
    .finally(() => {
        boton.disabled = false;
        boton.innerText = "Enviar Mensaje";
    });
});