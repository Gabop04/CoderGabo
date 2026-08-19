const plantilla = [
    { id: 1, nombre: "Lamine Yamal", posicion: "Delantero", goles: 14 },
    { id: 2, nombre: "Robert Lewandowski", posicion: "Delantero", goles: 22 },
    { id: 3, nombre: "Pedro González", posicion: "Mediocampista", goles: 7 },
    { id: 4, nombre: "Joan García", posicion: "Portero", goles: 0 }
];

let jugadores = [];

// Selección de elementos del DOM
const formJugador = document.getElementById("form-jugador");
const inputBuscador = document.getElementById("buscador");
const contenedorJugadores = document.getElementById("contenedor-jugadores");
const avisos = document.getElementById("avisos");

// Control de errores con try, catch, finally al cargar 
function cargarDatosIniciales() {
    try {
        const datosStorage = localStorage.getItem("jugadores");
        // Operador ?? para asignar si no hay nada guardado
        jugadores = datosStorage ? JSON.parse(datosStorage) : [...plantilla];
    } catch (error) {
        console.error("Error al leer los datos:", error);
        // Si hay error, restauramos la plantilla base en el catch
        jugadores = [...plantilla];
        avisos.className = "eliminado";
        avisos.textContent = "Error al cargar los datos guardados. Se restauró la plantilla base.";
    } finally {
        // El bloque finally se ejecuta siempre
        renderizarPlantilla(jugadores);
    }
}

// Temporizador asíncrono con setTimeout()
setTimeout(() => {
    avisos.className = "exito";
    avisos.textContent = "Notificación: Mercado de pases abierto.";
}, 3000);

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

    // Evento de clic sobre el botón creado
    btnEliminar.addEventListener("click", () => {
        eliminarJugador(id);
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

    // Guardar en localstorage
    localStorage.setItem("jugadores", JSON.stringify(jugadores));

    renderizarPlantilla(jugadores);
    avisos.className = "exito";
    avisos.textContent = "¡Jugador " + nombre + " agregado con éxito!";
    formJugador.reset();
}

// Eliminar jugador por id
function eliminarJugador(id) {
    // Encadenamiento opcional 
    const jugadorEncontrado = jugadores.find(j => j.id === id);
    const nombreBorrado = jugadorEncontrado?.nombre;

    jugadores = jugadores.filter(j => j.id !== id);

    // Guardar en localstorage
    localStorage.setItem("jugadores", JSON.stringify(jugadores));

    const termino = inputBuscador.value.toLowerCase();
    const filtrados = jugadores.filter(j =>
        j.nombre.toLowerCase().includes(termino) ||
        j.posicion.toLowerCase().includes(termino)
    );
    renderizarPlantilla(filtrados);

    // Operador ternario para el aviso
    avisos.className = "eliminado";
    avisos.textContent = nombreBorrado ? "Jugador " + nombreBorrado + " eliminado." : "Jugador eliminado.";
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

// Ejecución inicial
cargarDatosIniciales();