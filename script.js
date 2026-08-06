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

// 1. Creamos la función con toda tu lógica interna
function ejecutarEntrada() {
    mainContent.style.display = 'block';
    header.style.display = 'block';
    footer.style.display = 'block';

     if (yaEntro) return;
    yaEntro = true;
    

    setTimeout(() => {
        seccionHero.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 50);
    
    // Forzamos el inicio arriba para evitar errores de cálculo en celulares
    window.scrollTo(0, 0);

    setTimeout(() => {
        preloader.style.display = 'none'; 

        let ultimoScroll = 0;
        header = document.querySelector("header");
        window.addEventListener("scroll", () => {
            const scrollActual = window.scrollY;
            // 1. Si el usuario baja el scroll y ya pasó el menú, lo ocultamos
            if (scrollActual > ultimoScroll && scrollActual > 80) {
                header.classList.add("scroll-abajo");
            } 
            // 2. Si el usuario sube el scroll, lo volvemos a mostrar
            else {
                header.classList.remove("scroll-abajo");
            }
            // Guardamos la posición actual para la siguiente comparación
            ultimoScroll = scrollActual;
        });

    }, 500);
}

// 2. Evento para el click del mouse
boton.addEventListener('click', ejecutarEntrada);

window.addEventListener('keydown', (evento) => {
    // Si presiona Enter y NO ha entrado todavía al sitio, ejecuta la función
    if (evento.key === 'Enter' && !yaEntro) {
        evento.preventDefault(); // Evita que la página parpadee o haga un scroll extraño
        ejecutarEntrada();
    }
});



