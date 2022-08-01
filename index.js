let productosaux; // para que quede consistente la parte de destacados

const actualizarDestacados = async() => {
    let destacados = productosaux.sort((a,b) => b.obs - a.obs).slice(0,3);
    console.log(destacados);
    let i=1;
    for (const destacado of destacados){
        let contenedorDestacado = document.getElementById(`destacado${i}`);
        contenedorDestacado.innerHTML = `<img src=${destacado.img} alt=${destacado.nombre} class="d-block  imagenesDestacados">`;
        i+=1;
    }
}
const verMas = async(id) => {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById(`more${id}`);
    var btnText = document.getElementById(`moreBtn${id}`);
    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "+ Descripción";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "- Descripción";
        moreText.style.display = "block";
        // incremento el flag observado para que figure en Destacados
         let prod = productosaux.find(prod => prod.id === id)
        prod.obs += 1;
        console.log(`Producto: ${prod.nombre} - observado: ${prod.obs}`); 
        //await actualizarObsProducto(id);
        actualizarDestacados();
    }
} 
const verCar = () => {
    let detalle = "<ul>";
    let total = 0;
    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let producto =  JSON.parse(localStorage.getItem(key));
        total += parseInt(producto.precio)*parseInt(producto.cantidad);
        detalle += `<li> ${producto.nombre} $: ${producto.precio} - ${producto.cantidad} unidades </li>`;
      }
    detalle += "</ul>";
    Swal.fire({
        title: '<strong>Detalle de compra:</strong>',
        icon: 'info',
        html:
        detalle + "\n Total = "+ total,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Pagar',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
            '<i class="fa fa-thumbs-down"></i> Eliminar carrito',
        cancelButtonAriaLabel: 'Thumbs down'
    })
}
const addCar = (clave, nombre, precio) => {
    let producto = JSON.parse(localStorage.getItem(clave));
    let cantidad = 1;
    producto && (cantidad = producto.cantidad + 1);
    localStorage.setItem(clave, JSON.stringify({nombre, precio, cantidad}));
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 1500
      });
};
// solicita los productos a productService para listarlos en la galeria

const cargarProductos = async () => {
    let productos = await traerProductos();
    productosaux = productos;
    listado = document.getElementById('listaProductos');
    for(const producto of productos){
        let div = document.createElement("div");
        div.innerHTML =  `<img src="${producto.img}" alt = "${producto.nombre}" class="imagenesGaleria">
                        <p>${producto.nombre}</p>
                        <p>Precio: $${producto.precio} <span id="dots">...</span></p>
                        <ol class = "more" id="more${producto.id}">
                            <li>Tamaño 0x0 cm</li>
                            <li>Tiempo de impresión: 0 min</li>
                            <li>Cantidad de filamento: 0 gr</li>
                            <li>Colores disponibles<ul id="listaproductos_colores">
                                <li class="listaproductos_cuadrado green"> </li>
                                <li class="listaproductos_cuadrado fuchsia"> </li>
                                <li class="listaproductos_cuadrado"> </li>
                                <li class="listaproductos_cuadrado black"> </li>
                            </ul></li>
                        </ol>
                        <div>
                                <button onclick="verMas(${producto.id})" id="moreBtn${producto.id}">+ Descripción</button>
                                <button onclick="addCar(${producto.id}, '${producto.nombre}' ,${producto.precio})" id="buy${producto.id}">Comprar</button>
                        </div>`;
        listado.append(div);
    }
    actualizarDestacados(); 
}
 
cargarProductos()



