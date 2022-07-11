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

function forma_pago(){
    let pago;
    do {
        pago = parseInt(prompt("ingrese forma de pago: \n 1-Efectivo(-10%) \n 2-Transferencia(-5%) \n 3-crédito(+7%)"));
    } while (pago < 1 || pago > 3);
    console.log(pago);
    return pago;
}
function comprar(productos){
    let prod;
    let msj = "";
    let id = 0

    productos.forEach(prod => msj += `\n ${id++} ${prod.nombre} precio: ${prod.precio} disponibles: ${prod.stock}`);
    do {
        prod = parseInt(prompt("Elija el producto a comprar: \n"+ msj));
    } while (prod < 0 || prod > productos.length);

    productos[prod].stock -= 1; 
    console.log(productos[prod].precio);
    console.log(productos[prod].stock);
    return productos[prod].precio;
}
function calcularPrecioFinal(tipo,valor){
    switch (tipo){
        case 1: valor = valor*0.9; break;
        case 2: valor = valor*0.95; break;
        default: valor = valor+(valor*0.7); break;
    }
    alert(`El precio final de la compra es ${valor}`);
}
function Continua(){
   let resp= prompt("Desea calcular otro valor? s/n");
   if (resp.toLocaleLowerCase()==='s'){
       return true;
   }
   else{
       return false;
   }
}
function actualizarDestacados(){
    console.log(productos.sort((a,b) => b.observado - a.observado));
    let destacados = productos.sort((a,b) => b.observado - a.observado).slice(0,3);
    console.log(destacados);
    let i=1;
    for (const destacado of destacados){
        let contenedor_destacado = document.getElementById(`destacado${i}`);
        contenedor_destacado.innerHTML = `<img src=${destacado.img} alt=${destacado.nombre} class="d-block  imagenesDestacados">`;
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
//calcular pagos de productos
let continua = true;
let tipo_pago;
let monto;
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
    div.innerHTML =  `<img src="${producto.img}" alt = "${producto.nombre}" class="imagenesGaleria">
                      <p>${producto.nombre}</p>
                      <p>Precio: $00.00 <span id="dots">...</span></p>
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
                       <button onclick="verMas(${producto.id})" id="moreBtn${producto.id}">+ Descripción</button`;
    listado.append(div);
}
actualizarDestacados();
/* alert("Bienvenido al simulador de compra de Cr3aDly");
continua = Continua();
while (continua){
    monto = comprar(productos);
    tipo_pago = forma_pago();
   
    calcularPrecioFinal(tipo_pago, monto);
    continua = Continua();
}
alert("Ud ha salido del simulador de compra de Cr3aDly. Recargue para volver a empezar"); */