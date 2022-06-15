Init();
function Init() {
    agregarAccionTostify();
}

function agregarAccionTostify() {
    const btn = document.getElementById('btnToastify');
    btn.addEventListener("click", () => {

        Toastify({
            text: "Agregado al carrito",
            duration: 2500,
            position: 'right top',
            style: {
                background: 'linear-gradient(to right, #579684, #A3BEB5)',
            }
        }).showToast();
    })
}