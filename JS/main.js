const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}


//Incorporacion de Fetch

document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
    if(localStorage.getItem('carrito')) { //si existe algo en el carrito
        carrito = JSON.parse(localStorage.getItem('carrito')) //llenamos con lo que hay en el local storage
        addCardToCarrito()
    }
})

cards.addEventListener('click', e => {
    addCarrito(e)
})

items.addEventListener('click', e => {
    btnAccion(e)
})

const fetchData = async () => {
    try {
        const res = await fetch ('../products.json')
        const data = await res.json()
        /* console.log(data) */
        addCard(data)
    }
    catch (error){
        console.log(error)
    }
}


//Creación de las tarjetas de los productos, traídos del array del .json
const addCard = data => {
    data.forEach(producto => {
        templateCard.querySelector('img').setAttribute ("src", producto.productImage) 
        templateCard.querySelector('h6').textContent = producto.productsNomber
        templateCard.querySelector('p').textContent = producto.productPrice
        templateCard.querySelector('.btn-primary').dataset.id = producto.id 

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}


const addCarrito = e => {
    /* console.log(e.target)
    console.log(e.target.classList.contains('btn-primary')) */
    if (e.target.classList.contains('btn-primary')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}


const setCarrito = objeto => {
    /* console.log(objeto) */
    const producto = {
        id: objeto.querySelector('.btn-primary').dataset.id,
        title: objeto.querySelector('h6').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
    if (carrito.hasOwnProperty (producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    //coloco productos al carrito
    carrito[producto.id] = {...producto}
    addCardToCarrito()
}


//Agregado de los productos al carrito
const addCardToCarrito = () => {
    /* console.log(carrito) */
    items.innerHTML= ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    addFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito)) //guardamos la coleccion de objetos
}



const addFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = '<th scope="row" colspan="5">Carrito vacio - no tienes productos agregados :( <img src="../img/empty_cart.png" alt="imagen de carrito vacio"></th>'
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0 )
    
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById ('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito ={}
        addCardToCarrito()
    })
}


const btnAccion = e => {
    console.log(e.target)
    //accion de aumentar cantidad de producto
    if (e.target.classList.contains('btn-info')){
       /* console.log( carrito[e.target.dataset.id]) */
        const producto =  carrito[e.target.dataset.id]
        producto.cantidad=  carrito[e.target.dataset.id].cantidad + 1
        carrito[e.target.dataset.id] = {...producto}
        addCardToCarrito()
    }

    if (e.target.classList.contains('btn-danger')){
        //accion de disminuir cantidad de producto
        const producto =  carrito[e.target.dataset.id]
        producto.cantidad--
        //cuando el valor sea 0 se elimine de la lista
        if(producto.cantidad === 0) {
            delete carrito [e.target.dataset.id]
        }
        addCardToCarrito()
    }
    e.stopPropagation()
}