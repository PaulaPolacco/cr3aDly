  
const traerProductos = async () => {
    try {
        const resp = await fetch("https://cr3adly.000webhostapp.com/productos.json",{
            method: "GET",
            headers: {
            }});
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
const buscarProductos = async (search) => {
    try {
        const resp = await fetch("https://cr3adly.000webhostapp.com/productos.json",{
            method: "GET",
            headers: {
            }});
        const data = await resp.json();
        prod = data.filter(prod => prod.nombre.includes(search));
        return prod;
    } catch (error) {
        console.log(error);
    }
}; 

const actualizarObsProducto = async (id) => {
    try {
        const resp = await fetch("https://cr3adly.000webhostapp.com/productos.json",{
            method: "GET",
            headers: {
            }});
        const data = await resp.json();
        prod = data.find(prod => prod.id === id);
        prod.obs +=1;
        console.log(prod.obs);
        await postProducto(prod);
    } catch (error) {
        console.log(error);
    }
};

const postProducto = async (prod) => {
    fetch("../mock/productos.json", {
        method: "POST",
        body: JSON.stringify(prod),
        headers: {'Accept': 'application/json',
        "Content-type": "application/json; charset=UTF-8",
        },
        }).then(response => response.json())
        .then(data => console.log(data));
}