const calcularIva = (precio) => precio * 0.21;

const calcularTotal = function(precioBase, impuesto) {
    return precioBase + impuesto;
};

function mostrarDetalleCompra(nombreProducto, totalFinal) {
    console.log("--- Detalle de la Operación en Consola ---");
    console.log("Producto comprado: " + nombreProducto);
    console.log("Total con IVA: $" + totalFinal);
    
    alert("¡Compra exitosa!\nProducto: " + nombreProducto + "\nTotal a pagar (con IVA): $" + totalFinal);
}

let continuar = true;

alert("Bienvenido al Simulador de Compras");

while (continuar) {
    let producto = prompt("Ingrese el nombre del producto que desea comprar (o escriba 'salir' para finalizar):");

    if (producto === null || producto.toLowerCase() === 'salir') {
        continuar = false;
        alert("Gracias por usar el simulador. ¡Hasta pronto!");
    } else {
        let precio = parseFloat(prompt("Ingrese el precio base de: " + producto));

        if (isNaN(precio) || precio <= 0) {
            alert("Por favor, ingrese un precio válido mayor a 0.");
        } else {
            let ivaCalculado = calcularIva(precio); 
            let precioFinal = calcularTotal(precio, ivaCalculado); 

            mostrarDetalleCompra(producto, precioFinal);
        }
    }
}
