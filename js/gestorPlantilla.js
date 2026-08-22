class GestorPlantilla {
    constructor() {
        this.jugadores = [];
    }

    // Carga de datos asíncrona con fetch, async/await y try-catch-finally
    async cargarDatosIniciales() {
        try {
            const datosStorage = localStorage.getItem("jugadores");

            if (datosStorage) {
                this.jugadores = JSON.parse(datosStorage);
            } else {
                const response = await fetch("./data.json");
                if (!response.ok) {
                    throw new Error(`Error en la petición: ${response.status}`);
                }
                const data = await response.json();
                this.jugadores = data;
                this.guardarStorage();
            }
            return { exito: true, mensaje: "Plantilla cargada con éxito" };
        } catch (error) {
            console.error("Hubo un problema al cargar:", error.message);
            return { exito: false, mensaje: "Error al cargar la plantilla" };
        }
    }

    guardarStorage() {
        localStorage.setItem("jugadores", JSON.stringify(this.jugadores));
    }

    agregarJugador(jugador) {
        this.jugadores.push(jugador);
        this.guardarStorage();
    }

    eliminarJugador(id) {
        const jugadorEncontrado = this.jugadores.find(j => j.id === id);
        this.jugadores = this.jugadores.filter(j => j.id !== id);
        this.guardarStorage();
        return jugadorEncontrado;
    }

    filtrarJugadores(termino) {
        const busqueda = termino.toLowerCase();
        return this.jugadores.filter(j =>
            j.nombre.toLowerCase().includes(busqueda) ||
            j.posicion.toLowerCase().includes(busqueda)
        );
    }
}