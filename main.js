// Defino la clase
class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    // Modifica e informa el estado del objeto
    aplicarDescuento(porcentaje) {
        let descuento = (this.precio * porcentaje) / 100;
        this.precio = this.precio - descuento;
        alert("Descuento aplicado a " + this.nombre + " Precio actualizado : $" + this.precio);
    }
}

//  Objetos reales y los guardo en un array
const productos = [
    new Producto(1, "Monitor", 200, 5),
    new Producto(2, "Teclado", 50, 10),
    new Producto(3, "Mouse", 30, 8),
    new Producto(4, "Audifonos", 80, 4)
];

// Función para recorrer la lista de objetos y mostrarlos en consola
function verTodo(lista) {
    console.log("--- Lista de Productos en Stock ---");
    for (let prod of lista) {
        console.log("ID: " + prod.id + " | " + prod.nombre + " | Precio: $" + prod.precio + " | Stock: " + prod.stock);
    }
}

// Flujo interactivo 

verTodo(productos);

// Busco un producto por su nombre
let buscar = prompt("Qué producto quieres buscar en el inventario? (Monitor, Teclado, Mouse, Audifonos)");

if (buscar) {
    let encontrado = productos.find(p => p.nombre.toLowerCase() === buscar.toLowerCase());

    if (encontrado) {
        alert("Sí está " + encontrado.nombre + " vale $" + encontrado.precio + " y quedan " + encontrado.stock + " unidades.");
        
        let respuestaDescuento = confirm("Quieres aplicarle un 10% de descuento a este producto?");
        if (respuestaDescuento) {
            encontrado.aplicarDescuento(10); 
        }
    } else {
        alert("Ese producto no está en el inventario.");
    }
} 
// Agregar un nuevo producto 
let nuevoNombre = prompt("Ingrese el nombre de un nuevo producto para agregar:");
if (nuevoNombre) {
    let nuevoPrecio = parseInt(prompt("Ingrese el precio del producto:"));
    let nuevoStock = parseInt(prompt("Ingrese el stock disponible:"));

    // New para crear el objeto desde la clase y push para meterlo al array
    let nuevoProducto = new Producto(productos.length + 1, nuevoNombre, nuevoPrecio, nuevoStock);
    productos.push(nuevoProducto);
    
    alert(nuevoProducto.nombre + "Fue agregado con éxito!");
}

// Verificación final en consola
verTodo(productos);
