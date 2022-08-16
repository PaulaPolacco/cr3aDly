const DOMbotonVerCarrito = document.querySelector('#verCar');
const actualizarCarritoContador = () => {
    let cantidad = 0;
    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let producto =  JSON.parse(localStorage.getItem(key));
        cantidad += parseInt(producto.cantidad);
      }
      DOMbotonVerCarrito.innerHTML = `Ver carrito (${cantidad})`;
}
const vaciarCarro = () => {
    window.localStorage.clear();
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Carrito vaciado!',
        showConfirmButton: false,
        timer: 1500
      });
      actualizarCarritoContador();
}
const verCar = () => {
    const DOMbotonVaciarCarro = document.getElementsByClassName('swal2-cancel');
    const DOMbotonPagarCarro = document.getElementsByClassName('swal2-confirm');
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
    DOMbotonPagarCarro[0].addEventListener('click', (e) => {
        window.open('https://link.mercadopago.com.ar/cr3adly','popUpWindow','height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
    });
    DOMbotonVaciarCarro[0].addEventListener('click', vaciarCarro);
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
    actualizarCarritoContador();
};
DOMbotonVerCarrito.addEventListener('click',verCar);
actualizarCarritoContador();