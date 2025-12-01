// Definición de productos (simulando una base de datos)
const productos = [
    { id: 1, nombre: "Laptop Ultraligera", precio: 850.00, imagen: "https://via.placeholder.com/280x180?text=Laptop" },
    { id: 2, nombre: "Teclado Mecánico", precio: 75.50, imagen: "https://via.placeholder.com/280x180?text=Teclado" },
    { id: 3, nombre: "Mouse Inalámbrico", precio: 25.00, imagen: "https://via.placeholder.com/280x180?text=Mouse" },
    { id: 4, nombre: "Monitor Curvo 27''", precio: 320.99, imagen: "https://via.placeholder.com/280x180?text=Monitor" }
];

let carrito = [];
const catalogoEl = document.getElementById('catalogoProductos');
const contadorCarritoEl = document.getElementById('contadorCarrito');
const listaCarritoEl = document.getElementById('listaCarrito');
const totalCarritoEl = document.getElementById('totalCarrito');
const modal = document.getElementById("carritoModal");
const btn = document.getElementById("verCarritoBtn");
const span = document.getElementsByClassName("close-btn")[0];

// 1. Cargar productos en el catálogo
function cargarCatalogo() {
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p>$${producto.precio.toFixed(2)}</p>
            <button class="agregar-btn" onclick="agregarAlCarrito(${producto.id})">
                <i class="bi bi-cart-plus"></i> Agregar
            </button>
        `;
        catalogoEl.appendChild(card);
    });
}

// 2. Agregar producto al carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (producto) {
        const itemExistente = carrito.find(item => item.id === productoId);
        
        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        
        actualizarCarrito();
    }
}

// 3. Actualizar la interfaz del carrito
function actualizarCarrito() {
    // Contador en el Header
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contadorCarritoEl.textContent = totalItems;

    // Lista del Modal
    listaCarritoEl.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const itemTotal = item.precio * item.cantidad;
        total += itemTotal;
        
        const li = document.createElement('li');
        li.textContent = `${item.nombre} x ${item.cantidad} - $${itemTotal.toFixed(2)}`;
        listaCarritoEl.appendChild(li);
    });

    // Total General
    totalCarritoEl.textContent = total.toFixed(2);
}

// 4. Funcionalidad del Modal
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    cargarCatalogo();
    actualizarCarrito();
});