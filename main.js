class Jugador {
    constructor(id, nombre, posicion, goles, asistencias) {
        this.id = id;
        this.nombre = nombre;
        this.posicion = posicion;
        this.goles = goles;
        this.asistencias = asistencias;
    }
}

const plantilla = [
    new Jugador(1, "Lamine Yamal", "Delantero", 14, 16),
    new Jugador(2, "Robert Lewandowski", "Delantero", 22, 5),
    new Jugador(3, "Raphinha", "Delantero", 18, 12),
    new Jugador(4, "Pedro González", "Mediocampista", 7, 10),
    new Jugador(5, "Pau Cubarsí", "Defensa", 1, 2),
    new Jugador(6, "Joan García", "Portero", 0, 0)
];

// Opciones del menú ordenadas en un objeto
const acciones = {
    // Método .find()
    "1": () => {
        let busqueda = prompt("Nombre del jugador:");
        if (!busqueda) return;
        
        let encontrado = plantilla.find(j => j.nombre.toLowerCase().includes(busqueda.toLowerCase()));
        if (encontrado) {
            console.log("Resultado de búsqueda (find):", encontrado);
            alert("¡Jugador encontrado!\n" + encontrado.nombre + " (" + encontrado.posicion + ")\nGoles: " + encontrado.goles);
        } else {
            alert("No se encontró ningún jugador con ese nombre.");
        }
    },

    // Método .filter()
    "2": () => {
        let pos = prompt("Posición (Delantero, Mediocampista, Defensa, Portero):");
        if (!pos) return;

        let filtrados = plantilla.filter(j => j.posicion.toLowerCase() === pos.toLowerCase());
        if (filtrados.length > 0) {
            console.log("Resultado de filtrado por posición :", filtrados);
            alert(filtrados.map(j => "• " + j.nombre + " (" + j.goles + " goles)").join("\n"));
        } else {
            alert("No hay jugadores registrados en esa posición.");
        }
    },

    // Método .reduce()
    "3": () => {
        let totalGoles = plantilla.reduce((acc, j) => acc + j.goles, 0);
        console.log("Cálculo total de goles : " + totalGoles);
        alert(" Total de goles anotados por la plantilla: " + totalGoles);
    },

    // Método .map()
    "4": () => {
        let resumen = plantilla.map(j => "• " + j.nombre + " [" + j.posicion + "] - " + j.goles + " Goles");
        console.log("Resumen transformado de la plantilla :\n" + resumen.join("\n"));
        alert("El resumen completo de la plantilla se imprimió en la consola.");
    }
};

// Interacción del simulador
function iniciarSimulador() {
    let corriendo = true;

    while (corriendo) {
        let opcion = prompt(
            "=== SIMULADOR BARÇA 25/26 ===\n\n" +
            "1. Buscar jugador por nombre\n" +
            "2. Filtrar por posición\n" +
            "3. Total de goles del equipo\n" +
            "4. Ver resumen de la plantilla\n" +
            "5. Salir"
        );

        if (opcion === "5" || opcion === null) {
            corriendo = false;
            alert("¡Simulador finalizado!");
        } else if (acciones[opcion]) {
            acciones[opcion]();
        } else {
            alert("Opción no válida. Por favor, ingresá un número del 1 al 5.");
        }
    }
}

// Ejecución del simulador
iniciarSimulador();