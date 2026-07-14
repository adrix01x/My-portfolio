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