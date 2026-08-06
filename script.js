document.getElementById('miFormulario').addEventListener('submit', function(event) {
    event.preventDefault();

    const formulario = event.target;
    const boton = document.getElementById('botonEnviar');
    const estado = document.getElementById('mensajeEstado');

    boton.disabled = true;
    boton.innerText = "Enviando...";
    estado.style.color = "black";
    estado.innerText = "Procesando envío...";

    const formData = new FormData(formulario);
    const objeto = Object.fromEntries(formData.entries());
    const json = JSON.stringify(objeto);

    fetch(formulario.action, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        const data = await response.json();
        if (response.ok && data.success) {
            estado.style.color = "green";
            estado.innerText = "¡Mensaje enviado con éxito! Me pondré en contacto pronto.";
            formulario.reset();
        } else {
            throw new Error(data.message || 'Error en la respuesta del servidor');
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

//menu responsive //Hazme un menu responsive para el header, que al hacer click en el icono de hamburguesa se despliegue el menu y al hacer click en cualquier link del menu se cierre el menu.

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

// Asegúrate de cambiar 'boton-entrar' por el ID real de tu botón
const boton = document.getElementById('boton-entrar');
const preloader = document.getElementById('preloader');
const mainContent = document.querySelector('main');
const footer = document.querySelector('footer');
let header = document.querySelector('header');
const seccionHero = document.getElementById('hero');
let yaEntro = false; // Variable para controlar si ya se ejecutó la función

function ejecutarEntrada() {
    // Es mejor poner el freno al principio para evitar que se ejecute el display si ya entró
    if (yaEntro) return; 
    yaEntro = true;
    
    // Mostramos el contenido
    mainContent.style.display = 'block';
    header.style.display = 'block';
    footer.style.display = 'block';

    // 1. Iniciamos el viaje bajando hacia el Hero
    setTimeout(() => {
        seccionHero.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 50);
    
    // 2. Esperamos a que la animación de bajar termine completamente (800ms es más seguro)
    setTimeout(() => {
        // Borramos el preloader
        preloader.style.display = 'none'; 

        // ¡AQUÍ ESTÁ LA MAGIA!
        // Como el preloader (que ocupaba toda la pantalla inicial) ya no existe, 
        // el #hero pasa a ser la parte más alta de la página. 
        // Reiniciamos la cámara a 0,0 al instante para que no caiga en "Sobre mí".
        window.scrollTo(0, 0);

        // Activamos tu lógica del menú sticky
        let ultimoScroll = 0;
        header = document.querySelector("header");
        
        window.addEventListener("scroll", () => {
            const scrollActual = window.scrollY;
            
            // Si baja y pasó el menú
            if (scrollActual > ultimoScroll && scrollActual > 80) {
                header.classList.add("scroll-abajo");
            } 
            // Si sube
            else {
                header.classList.remove("scroll-abajo");
            }
            ultimoScroll = scrollActual;
        });

    }, 800); // Subimos el tiempo a 800ms para asegurar que el scrollIntoView haya terminado
}

// 2. Evento para el click del mouse
window.addEventListener('load', () => {
    
    // Ejecutamos la función después de 3000 milisegundos (3 segundos)
    setTimeout(() => {
        ejecutarEntrada();
    }, 1500); 
    
});



