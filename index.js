class Producto{
    constructor(nombre, precio, tipo, stock){
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
        this.tipo = tipo.toUpperCase(); // puede ser general, customizado, personalizado
        this.stock = parseInt(stock);
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
//calcular pagos de productos
let continua = true;
let tipo_pago;
let monto;
// crear los productos a vender
const productos = [];
productos.push(new Producto("llavero",250, "general",20));
productos.push(new Producto("maceta",600, "general",5));
productos.push(new Producto("soporteCelu",500, "general",15));
productos.push(new Producto("soporteNotebook",1000, "general",3));
productos.push(new Producto("aspaVentilador",300, "personalizado",4));
productos.push(new Producto("ajedrez",2500, "general",1));
productos.push(new Producto("portaJoystick",800, "general",10));
productos.push(new Producto("soporteAuriculares",700, "general",6));
productos.push(new Producto("florero",700, "general",8));

alert("Bienvenido al simulador de compra de Cr3aDly");
while (continua){
    monto = comprar(productos);
    tipo_pago = forma_pago();
   
    calcularPrecioFinal(tipo_pago, monto);
    continua = Continua();
}
alert("Ud ha salido del simulador de compra de Cr3aDly. Recargue para volver a empezar");