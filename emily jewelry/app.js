// Lista de productos
const productos = [
    {
        nombre: "Portajoyas Esqueleto",
        descripcion: "Directamente desde el otro mundo, con detalles únicos.",
        precio: 50000,
        imagen: "imágenes/WhatsApp Image 2024-10-10 at 11.25.58 PM (1).jpeg"
    },
    {
        nombre: "Portajoyas Mano",
        descripcion: "Diseño clásico y elegante.",
        precio: 30000,
        imagen: "imágenes/WhatsApp Image 2024-10-10 at 11.25.58 PM.jpeg"
    },
    {
        nombre: "Portajoyas Moderno",
        descripcion: "Estilo moderno y minimalista.",
        precio: 45000,
        imagen: "imágenes/WhatsApp Image 2024-10-10 at 11.25.57 PM.jpeg"
    }
];

let carrito = []; // Inicializamos el carrito vacío

// Función para mostrar productos en el carrito
function mostrarCarrito() {
    const carritoDiv = document.getElementById('listaCarrito');
    carritoDiv.innerHTML = ''; // Limpiar el carrito antes de mostrar productos nuevos

    carrito.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');

        const nombre = document.createElement('h3');
        nombre.textContent = producto.nombre;
        productoDiv.appendChild(nombre);

        const precio = document.createElement('p');
        precio.textContent = `Precio: $${producto.precio}`;
        productoDiv.appendChild(precio);

        // Botón para eliminar del carrito
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => {
            carrito.splice(index, 1); // Eliminar el producto del carrito
            mostrarCarrito(); // Mostramos el carrito actualizado
            actualizarCarrito(); // Guardar el carrito actualizado en localStorage
        };
        productoDiv.appendChild(btnEliminar);

        carritoDiv.appendChild(productoDiv);
    });

    // Actualizar total
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    document.getElementById('total').textContent = total;
}

// Función para actualizar localStorage con el carrito actual
function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Mostrar detalles del producto en un modal
function mostrarDetallesProducto(producto) {
    document.getElementById('nombreProducto').textContent = producto.nombre;
    document.getElementById('imagenProducto').src = producto.imagen;
    document.getElementById('descripcionProducto').textContent = producto.descripcion;
    document.getElementById('precioProducto').textContent = `Precio: $${producto.precio}`;

    document.getElementById('modal').style.display = 'block'; // Mostrar el modal
}

// Función para agregar al carrito desde el modal
function agregarAlCarritoDesdeModal() {
    const producto = {
        nombre: document.getElementById('nombreProducto').textContent,
        precio: parseInt(document.getElementById('precioProducto').textContent.replace(/\D/g, '')), // Extraer el precio
    };
    carrito.push(producto);
    mostrarCarrito();
    actualizarCarrito(); // Guardar el carrito después de agregar el producto
    document.getElementById('modal').style.display = 'none'; // Cerrar el modal
}

// Cerrar el modal al hacer clic en la "X"
document.getElementById('cerrarModal').onclick = function() {
    document.getElementById('modal').style.display = 'none';
};

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Función para mostrar productos
function mostrarProductos(productosFiltrados) {
    const catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = ''; // Limpiar el catálogo antes de mostrar productos nuevos

    productosFiltrados.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');

        const img = document.createElement('img');
        img.src = producto.imagen;
        img.alt = producto.nombre;
        productoDiv.appendChild(img);

        const nombre = document.createElement('h3');
        nombre.textContent = producto.nombre;
        productoDiv.appendChild(nombre);

        const descripcion = document.createElement('p');
        descripcion.textContent = producto.descripcion;
        productoDiv.appendChild(descripcion);

        const precio = document.createElement('p');
        precio.textContent = `Precio: $${producto.precio}`;
        productoDiv.appendChild(precio);

        // Botón de agregar al carrito
        const btnAgregar = document.createElement('button');
        btnAgregar.textContent = 'Agregar al carrito';
        btnAgregar.onclick = () => {
            carrito.push(producto); // Agregamos el producto al carrito
            mostrarCarrito(); // Mostramos el carrito actualizado
            actualizarCarrito(); // Guardar el carrito actualizado en localStorage
        };
        productoDiv.appendChild(btnAgregar);

        catalogo.appendChild(productoDiv);
    });
}

// Mostrar todos los productos inicialmente
mostrarProductos(productos);

// Mostrar el carrito al cargar la página
mostrarCarrito();

// Función para filtrar productos por precio
function filtrarPorPrecio() {
    const precioMaximo = document.getElementById('filtroPrecio').value;
    const productosFiltrados = productos.filter(producto => producto.precio <= precioMaximo);
    mostrarProductos(productosFiltrados);
}

// Función para buscar productos por nombre
function buscarProducto() {
    const nombreBuscado = document.getElementById('busqueda').value.toLowerCase();
    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(nombreBuscado)
    );
    mostrarProductos(productosFiltrados);
}

// Función para simular la finalización de la compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos para comprar.");
    } else {
        alert("¡Gracias por tu compra!"); // Mensaje de éxito
        carrito = []; // Limpiar el carrito
        mostrarCarrito(); // Actualizar la vista del carrito
        localStorage.removeItem('carrito'); // Limpiar el carrito de localStorage
    }
}

// Cargar el carrito desde localStorage cuando la página se carga
window.onload = function() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito(); // Mostrar el carrito recuperado
    }
};
