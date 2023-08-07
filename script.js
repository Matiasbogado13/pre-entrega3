
const itemsDisponibles = [
    { id: 1, nombre: "Vino 1", precio: 10.000 },
    { id: 2, nombre: "Vino 2", precio: 20.000 },
    { id: 3, nombre: "Vino 3", precio: 15.000 },
];

// Array para almacenar los items agregados al carrito
let carrito = [];

// Variable para llevar el control del precio total del carrito
let total = 0;

// Función para agregar un item al carrito
function agregarItemAlCarrito(itemID) {
    const itemEncontrado = itemsDisponibles.find(item => item.id === itemID);
    if (itemEncontrado) {
        carrito.push(itemEncontrado);
        total += itemEncontrado.precio;
    }
}

// Función para mostrar los items del carrito en la lista HTML
function mostrarCarritoEnHTML() {
    const itemsList = document.getElementById("items-list");
    itemsList.innerHTML = "";
    carrito.forEach(item => {
        const li = document.createElement("li");
        li.innerText = `${item.nombre} - $${item.precio.toFixed(3)}`;
        itemsList.appendChild(li);
    });
    document.getElementById("total-price").innerText = `$${total.toFixed(3)}`;
}

// Función para realizar el proceso de compra
function realizarCompra() {
    // Aquí puedes agregar lógica adicional, como enviar la información del carrito a un servidor, vaciar el carrito, etc.
    
    carrito = [];
    total = 0;
    mostrarCarritoEnHTML();
    guardarCarritoEnLocalStorage(); // Guardar carrito vacío en el almacenamiento local
}

// Función para guardar el carrito en el almacenamiento local
function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("total", JSON.stringify(total));
}

// Función para cargar el carrito desde el almacenamiento local
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }

    const totalGuardado = localStorage.getItem("total");
    if (totalGuardado) {
        total = JSON.parse(totalGuardado);
    }
}

// Agregar EventListeners una vez que se haya cargado el contenido
document.addEventListener("DOMContentLoaded", () => {
    cargarCarritoDesdeLocalStorage();
    mostrarCarritoEnHTML();

    const buttons = document.querySelectorAll(".btn-add-to-cart");
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            const itemID = parseInt(event.target.dataset.itemId);
            agregarItemAlCarrito(itemID);
            guardarCarritoEnLocalStorage();
            mostrarCarritoEnHTML();
        });
    });

    const btnCheckout = document.getElementById("btn-checkout");
    btnCheckout.addEventListener("click", (event) => {
        event.preventDefault(); 
        realizarCompra();
    });
});







