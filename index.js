let productosaux; // para que quede consistente la parte de destacados
const DOMbotonBuscar = document.querySelector('#buscarGaleria');
const actualizarDestacados = async() => {
    let destacados = productosaux.sort((a,b) => b.obs - a.obs).slice(0,3);
    let i=1;
    for (const destacado of destacados){
        let contenedorDestacado = document.getElementById(`destacado${i}`);
        contenedorDestacado.innerHTML = `<img src=${destacado.img} alt=${destacado.nombre} class="d-block  imagenesDestacados">`;
        i+=1;
    }
}
const verMas = async(id) => {
    let dots = document.getElementById("dots");
    let moreText = document.getElementById(`more${id}`);
    let btnText = document.getElementById(`moreBtn${id}`);
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
        actualizarDestacados();
    }
} 
// solicita los productos a productService para listarlos en la galeria
const cargarProductos = async (event) => {
    let productos;
    if (event){//entro por submit
        event.preventDefault();
        listado.innerHTML = "";
        let search = document.getElementById("imputBuscar").value;
        productos = await buscarProductos(search);
    }else{productos = await traerProductos();}
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
const cargarProductosBuscados = async () =>{};
cargarProductos()
DOMbotonBuscar.addEventListener('submit',cargarProductos);




