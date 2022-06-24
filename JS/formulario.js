
//Función que envia a consola los datos de la pagina "Contacto" en un objeto

function enviar (){
    let cliente = {
        nombreCliente: document.getElementById("nombre").value,
        apellidoCliente: document.getElementById("apellido").value,
        emailCliente: document.getElementById("email").value,
        comentarioCliente: document.getElementById("comentario").value
    }
    /* console.log(cliente) */

    var nombreCliente= document.getElementById("nombre").value
    var apellidoCliente= document.getElementById("apellido").value
    var emailCliente= document.getElementById("email").value
    var comentarioCliente = document.getElementById("comentario").value

    if (emailCliente == ""){
    alert("El email es obligatorio")
    document.getElementById("email").focus()
    }
    else{
        document.getElementById("nombre").value="";
        document.getElementById("apellido").value="";
        document.getElementById("email").value="";
        document.getElementById("comentario").value="";
     document.getElementById("nombre").focus();
    }
    
    /* CONVERTIR LOS DATOS EN OBJETO PARA JSON */
    JSON.stringify(cliente)
    /* GUARDAR LOS DATOS EN LOCALSTORAGE */
    guardarLocalStorage(cliente);
}

let guardarLocalStorage = function (usuario) {
    localStorage.setItem("Datos Cliente:", JSON.stringify(usuario) )
}