const gestor = new GestorPlantilla();
// Selección de elementos del DOM
const formJugador = document.getElementById("form-jugador");
const inputBuscador = document.getElementById("buscador");
const contenedorJugadores = document.getElementById("contenedor-jugadores");
// Carga inicial 
async function cargarApp() {
    contenedorJugadores.innerHTML = "<p>Cargando plantilla...</p>";
    const respuesta = await gestor.cargarDatosIniciales();
    if (!respuesta.exito) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: respuesta.mensaje
        });
    }
    renderizarPlantilla(gestor.jugadores);
}

// Renderizar lista completa de jugadores
function renderizarPlantilla(lista) {
    contenedorJugadores.innerHTML = "";
    if (lista.length === 0) {
        const mensajeVacio = document.createElement("p");
        mensajeVacio.textContent = "No hay jugadores registrados en la lista.";
        contenedorJugadores.appendChild(mensajeVacio);
        return;
    }
    lista.forEach(jugador => {
        generarCardJugador(jugador);
    });
}

function generarCardJugador(jugador) {
    // Desestructuración del objeto jugador
    const { id, nombre, posicion, goles } = jugador;
    const card = document.createElement("div");
    card.className = "card";
    const j = document.createElement("h3");
    j.textContent = nombre;
    const pPosicion = document.createElement("p");
    pPosicion.textContent = "Posición: " + posicion;
    const pGoles = document.createElement("p");
    pGoles.textContent = "Goles: " + goles;
    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn-eliminar";
    btnEliminar.textContent = "Eliminar";
    // Evento sobre el botón eliminar
    btnEliminar.addEventListener("click", () => {
        eliminarJugador(id);
    });
    // Hace la tarjeta del jugador
    card.appendChild(j);
    card.appendChild(pPosicion);
    card.appendChild(pGoles);
    card.appendChild(btnEliminar);
    contenedorJugadores.appendChild(card);
}

// Validar formulario 
function validarFormulario() {
    const nombre = document.getElementById("nombre").value.trim();
    const posicion = document.getElementById("posicion").value;
    const goles = document.getElementById("goles").value;
    const soloLetras = /^[a-záéíóúñ\s]+$/i;
    if (!nombre || !soloLetras.test(nombre)) {
        Swal.fire({
            icon: "warning",
            title: "Nombre inválido",
            text: "Ingrese un nombre válido (solo letras)."
        });
        return false;
    }
    if (!posicion) {
        Swal.fire({
            icon: "warning",
            title: "Falta la posición",
            text: "Por favor seleccione una posición."
        });
        return false;
    }
    if (goles === "" || goles < 0) {
        Swal.fire({
            icon: "warning",
            title: "Goles inválidos",
            text: "Ingrese una cantidad de goles correcta (0 o mayor)."
        });
        return false;
    }
    return true;
}

// Agrega jugador a la lista
function generarJugador() {
    const nombre = document.getElementById("nombre").value.trim();
    const posicion = document.getElementById("posicion").value;
    const goles = parseInt(document.getElementById("goles").value);
    const nuevoJugador = new Jugador(Date.now(), nombre, posicion, goles);
    gestor.agregarJugador(nuevoJugador);
    renderizarPlantilla(gestor.jugadores);
    Swal.fire({
        icon: "success",
        title: "¡Jugador agregado!",
        text: `Jugador ${nombre} agregado con éxito a la plantilla.`,
        timer: 2000,
        showConfirmButton: false
    });

    formJugador.reset();
}
// Eliminar jugador por id
function eliminarJugador(id) {
    const jugadorEliminado = gestor.eliminarJugador(id);
    const nombreBorrado = jugadorEliminado?.nombre;
    const filtrados = gestor.filtrarJugadores(inputBuscador.value);
    renderizarPlantilla(filtrados);
    Swal.fire({
        icon: "info",
        title: "Jugador eliminado",
        text: nombreBorrado ? `Se eliminó a ${nombreBorrado}.` : "Jugador eliminado.",
        timer: 2000,
        showConfirmButton: false
    });
}
// Evento formulario
formJugador.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validarFormulario()) {
        generarJugador();
    }
});
// Evento para filtrar
inputBuscador.addEventListener("input", () => {
    const filtrados = gestor.filtrarJugadores(inputBuscador.value);
    renderizarPlantilla(filtrados);
});
// Ejecución
cargarApp();