class Producto{
    constructor(id,nombre, precio, tipo, stock, obs, img){
        this.id = parseInt(id);     //luego autogenerar
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.tipo = tipo.toUpperCase(); // puede ser general, customizado, personalizado
        this.stock = parseInt(stock);
        this.observado = parseInt(obs); // para destacados
        this.img = img;
    }

}

function formaPago(){
    let pago;
    do {
        pago = parseInt(prompt("ingrese forma de pago: \n 1-Efectivo(-10%) \n 2-Transferencia(-5%) \n 3-crédito(+7%)"));
    } while (pago < 1 || pago > 3);
    console.log(pago);
    return pago;
}

function calcularPrecioFinal(tipo,valor){
    switch (tipo){
        case 1: valor = valor*0.9; break;
        case 2: valor = valor*0.95; break;
        default: valor = valor+(valor*0.7); break;
    }
    alert(`El precio final de la compra es ${valor}`);
}

function actualizarDestacados(){
    console.log(productos.sort((a,b) => b.observado - a.observado));
    let destacados = productos.sort((a,b) => b.observado - a.observado).slice(0,3);
    console.log(destacados);
    let i=1;
    for (const destacado of destacados){
        let contenedorDestacado = document.getElementById(`destacado${i}`);
        contenedorDestacado.innerHTML = `<img src=${destacado.img} alt=${destacado.nombre} class="d-block  imagenesDestacados">`;
        i+=1;
    }
}

function verMas(id) {
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
        let prod = productos.find(prod => prod.id === id)
        prod.observado += 1;
        console.log(`Producto: ${prod.nombre} - observado: ${prod.observado}`);
        actualizarDestacados();
    }

} 
  
function verCar(){
    let detalle = "";
    let total = 0;
    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let producto =  JSON.parse(localStorage.getItem(key));
        total += parseInt(producto.precio)*parseInt(producto.cantidad);
        detalle += localStorage.getItem(key);
      }
      alert("Detalle: \n"+detalle + "\n Total = "+ total);
}

//calcular pagos de productos
let continua = true;
let tipoPago;
let monto;
const addCar = (clave, nombre, precio) => {
    let producto = JSON.parse(localStorage.getItem(clave));
    let cantidad = 1;
    if(producto){
       cantidad = producto.cantidad + 1;
    }
    localStorage.setItem(clave, JSON.stringify({nombre, precio, cantidad}));
};
// crear los productos a vender y listarlos en la galeria
const productos = [];
productos.push(new Producto(1,"Llavero porta celu",250, "general",20,0,"images/galeria/llaveros.png"));
productos.push(new Producto(2,"Maceta",600, "general",5,0,"images/galeria/macetas.jpg"));
productos.push(new Producto(3,"Soporte para Celular",500, "general",15,0,"images/galeria/porta_celus.png"));
productos.push(new Producto(4,"Soporte para Notebook",1000, "general",3,0,"images/galeria/soporte_notebook.jpg"));
productos.push(new Producto(5,"Aspa Ventilador",300, "personalizado",4,0,"images/galeria/aspa_ventilador.jpg"));
productos.push(new Producto(6,"Juego de Ajedrez",2500, "general",1,0,"images/galeria/ajedrez.png"));
productos.push(new Producto(7,"Porta Joystick x 2",800, "general",10,0,"images/galeria/porta_joystick.png"));
productos.push(new Producto(8,"Soporte para Auriculares",700, "general",6,0,"images/galeria/soporte_auriculares.jpg"));
productos.push(new Producto(9,"Florero",700, "general",8,0,"images/galeria/florero.jpg"));

listado = document.getElementById('listaProductos');
for(const producto of productos){
    
    let div = document.createElement("div");
    let storage = `{${producto.id},${producto.nombre},${producto.precio}`;
    console.log(producto.nombre)
    
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
