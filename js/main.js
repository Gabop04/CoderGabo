const plantilla = [
    { id: 1, nombre: "Lamine Yamal", posicion: "Delantero", goles: 14 },
    { id: 2, nombre: "Robert Lewandowski", posicion: "Delantero", goles: 22 },
    { id: 3, nombre: "Pedro González", posicion: "Mediocampista", goles: 7 },
    { id: 4, nombre: "Joan García", posicion: "Portero", goles: 0 }
];

let jugadores = [...plantilla];

// Selección de elementos
const formJugador = document.getElementById("form-jugador");
const inputBuscador = document.getElementById("buscador");
const contenedorJugadores = document.getElementById("contenedor-jugadores");
const avisos = document.getElementById("avisos");

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
// Uso createElement y appendChild
function generarCardJugador(jugador) {
    const card = document.createElement("div");
    card.className = "card";

    const j = document.createElement("h3");
    j.textContent = jugador.nombre;

    const pPosicion = document.createElement("p");
    pPosicion.textContent = "Posición: " + jugador.posicion;

    const pGoles = document.createElement("p");
    pGoles.textContent = "Goles: " + jugador.goles;

    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn-eliminar";
    btnEliminar.textContent = "Eliminar";

    // Evento de clic sobre el botón creado
    btnEliminar.addEventListener("click", () => {
        eliminarJugador(jugador.id);
    });

    // Ensamblar la tarjeta
    card.appendChild(j);
    card.appendChild(pPosicion);
    card.appendChild(pGoles);
    card.appendChild(btnEliminar);

    contenedorJugadores.appendChild(card);
}

// Validar formulario 
function validarFormulario() {
    avisos.innerHTML = "";
    avisos.className = "";
    const nombre = document.getElementById("nombre").value.trim();
    const posicion = document.getElementById("posicion").value;
    const goles = document.getElementById("goles").value;
    const listaErrores = [];
    const soloLetras = /^[a-záéíóúñ\s]+$/i;
    if (!nombre || !soloLetras.test(nombre)) {
        listaErrores.push("Ingrese un nombre válido (solo letras).");
    }
    if (!posicion) {
        listaErrores.push("Seleccione una posición.");
    }
    if (goles === "" || goles < 0) {
        listaErrores.push("Ingrese una cantidad de goles correcta (0 o mayor).");
    }
    if (listaErrores.length > 0) {
        avisos.className = "eliminado";
        const ul = document.createElement("ul");
        listaErrores.forEach(error => {
            const li = document.createElement("li");
            li.textContent = error;
            ul.appendChild(li);
        });
        avisos.appendChild(ul);
        return false;
    }
    return true;
}
// Agrega jugador a la lista
function generarJugador() {
    const nombre = document.getElementById("nombre").value.trim();
    const posicion = document.getElementById("posicion").value;
    const goles = parseInt(document.getElementById("goles").value);
    const nuevoJugador = {
        id: Date.now(),
        nombre: nombre,
        posicion: posicion,
        goles: goles
    };
    jugadores.push(nuevoJugador);
    renderizarPlantilla(jugadores);
    avisos.className = "exito";
    avisos.textContent = "¡Jugador " + nombre + " agregado con éxito!";
    formJugador.reset();
}
// Eliminar jugador por id
function eliminarJugador(id) {
    const jugador = jugadores.find(j => j.id === id);
    jugadores = jugadores.filter(j => j.id !== id);
    const termino = inputBuscador.value.toLowerCase();
    const filtrados = jugadores.filter(j =>
        j.nombre.toLowerCase().includes(termino) ||
        j.posicion.toLowerCase().includes(termino)
    );
    renderizarPlantilla(filtrados);
    if (jugador) {
        avisos.className = "eliminado";
        avisos.textContent = "Jugador " + jugador.nombre + " eliminado.";
    }
}
// Evento Submit del formulario
formJugador.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validarFormulario()) {
        generarJugador();
    }
});
// Evento de teclado para filtrar
inputBuscador.addEventListener("input", () => {
    const termino = inputBuscador.value.toLowerCase();
    const filtrados = jugadores.filter(j =>
        j.nombre.toLowerCase().includes(termino) ||
        j.posicion.toLowerCase().includes(termino)
    );
    renderizarPlantilla(filtrados);
});

renderizarPlantilla(jugadores);