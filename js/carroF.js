// Creación de la "base de datos"
let baseDeDatos = [
    { id: 0, nombre: "Monitor", precio: 120000, imagen: "./img/monitor.png" },
    { id: 1, nombre: "Mouse", precio: 50000, imagen: "./img/mouseGamer.png" },
    { id: 2, nombre: "MousePad", precio: 10000, imagen: "./img/mousepad.png" },
    { id: 3, nombre: "Procesador", precio: 90000, imagen: "./img/procesador.png" },
    { id: 4, nombre: "Tarjeta gráfica", precio: 300000, imagen: "./img/tarjetaGrafica.png" },
    { id: 5, nombre: "Placa Madre", precio: 120000, imagen: "./img/placaMadre.png" },
    { id: 6, nombre: "Fuente de poder", precio: 60000, imagen: "./img/fuentePoder.png" },
    { id: 7, nombre: "Ram", precio: 16000, imagen: "./img/ram.png" }
];

// Variables del carrito
let carrito = [];
const divisa = '$CLP';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMbotonPagar = document.querySelector('#boton-pagar'); // Añadido el botón Pagar

// Funciones del carrito

/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
function renderizarProductos() {
    if (DOMitems) {
        DOMitems.innerHTML = ''; // Limpia el contenido antes de renderizar
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`;
            // Boton
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'));
    renderizarCarrito();
}

/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {
    if (DOMcarrito) {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        DOMtotal.textContent = calcularTotal();
    }
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    renderizarCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0);
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
}

/**
 * Genera el voucher de la compra en una nueva pestaña
 */
function generarVoucher() {
    const ventana = window.open('', '_blank');
    ventana.document.write('<html><head><title>Voucher de Compra</title></head><body>');
    ventana.document.write('<h1>Gracias por comprar en Techzone!</h1>');
    ventana.document.write('<h2>Detalles de la compra:</h2>');
    ventana.document.write('<ul>');

    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        ventana.document.write(`<li>${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}</li>`);
    });

    ventana.document.write('</ul>');
    ventana.document.write(`<p>Total: ${calcularTotal()}${divisa}</p>`);
    ventana.document.write('</body></html>');
    ventana.document.close();
}

// Eventos del carrito
if (DOMbotonVaciar) {
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
}

if (DOMbotonPagar) {
    DOMbotonPagar.addEventListener('click', generarVoucher);
}

// Inicio del carrito
renderizarProductos();
renderizarCarrito();

//-----------------------------------------------------------

// Funciones para ir por páginas
function irLogin() {
    location.href = "html/login.html";
}

function irLoginAdmin() {
    location.href = "login.html";
}

//----------------------------------------------

// Funciones ADMIN
const objProducto = {
    id: "",
    nombre: "",
    precio: 0,
    imagen: ""
};

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const precioInput = document.querySelector('#precio');
const btnAgregar = document.querySelector('#btnAgregar');

if (formulario) {
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e) {
    e.preventDefault();

    if (nombreInput.value === '' || precioInput.value === '') {
        alert("ERROR: ¡Debes llenar todos los campos!");
        return;
    }

    if (editando) {
        editarProducto();
        editando = false;
    } else {
        objProducto.id = Date.now();
        objProducto.nombre = nombreInput.value;
        objProducto.precio = parseFloat(precioInput.value);
        agregarProducto();
    }
}

function agregarProducto() {
    baseDeDatos.push({ ...objProducto });
    mostrarProductos();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objProducto.id = '';
    objProducto.nombre = '';
    objProducto.precio = 0;
}

function mostrarProductos() {
    const divProductos = document.querySelector('.div-productos');
    limpiarHTMLAdmin();

    baseDeDatos.forEach(producto => {
        const { id, nombre, precio, imagen } = producto;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${precio} - ${imagen}`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarProducto(producto);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarProducto(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divProductos.appendChild(parrafo);
        divProductos.appendChild(hr);
    });
}

function cargarProducto(producto) {
    const { id, nombre, precio } = producto;

    nombreInput.value = nombre;
    precioInput.value = precio;

    objProducto.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;
}

function editarProducto() {
    objProducto.nombre = nombreInput.value;
    objProducto.precio = parseFloat(precioInput.value);

    baseDeDatos = baseDeDatos.map(producto => {
        if (producto.id === objProducto.id) {
            producto.nombre = objProducto.nombre;
            producto.precio = objProducto.precio;
        }
        return producto;
    });

    limpiarHTMLAdmin();
    mostrarProductos();

    formulario.reset();
    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    editando = false;
}

function eliminarProducto(id) {
    baseDeDatos = baseDeDatos.filter(producto => producto.id !== id);
    limpiarHTMLAdmin();
    mostrarProductos();
}

function limpiarHTMLAdmin() {
    const divProductos = document.querySelector('.div-productos');
    while (divProductos.firstChild) {
        divProductos.removeChild(divProductos.firstChild);
    }
}

// Inicializar la lista de productos al cargar la página
mostrarProductos();



