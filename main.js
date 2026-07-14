const productos = ["Monitor", "Teclado", "Mouse", "Audifonos", "Case"];

function verTodo(lista) {
    console.log("--- Lista de productos ---");
    for (let produc of lista) {
        console.log("Producto: " + produc);
    }
}

let buscar = prompt("¿Qué producto querés buscar?");

if (buscar) {
    let estaEnLista = productos.includes(buscar);

    if (estaEnLista) {
        let pos = productos.indexOf(buscar);
        alert("Sí está! Está en la posición: " + pos);
        
        let nuevo = prompt("Ingresa el nuevo nombre para cambiarlo:");
        if (nuevo) {
            productos.splice(pos, 1, nuevo);
            alert("Producto cambiado con éxito");
        }
    } else {
        alert("Ese producto no está en el inventario");
    }
}

let productoFinal = prompt("Ingresa un nuevo producto para agregar al final del stock:");
if (productoFinal) {
    productos.push(productoFinal);
    alert("¡" + productoFinal + " agregado al final!");
}

let productoUrgente = prompt("Ingresa un producto con alta prioridad (se agregará al principio):");
if (productoUrgente) {
    productos.unshift(productoUrgente);
    alert("¡" + productoUrgente + " agregado al principio!");
}

let confirmarBorrado = confirm("¿Deseas eliminar el último producto de la lista para empaquetarlo?");
if (confirmarBorrado) {
    let borrado = productos.pop();
    alert("Se eliminó este producto: " + borrado);
}

verTodo(productos);