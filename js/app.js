// Variables y selectores
let presupuesto;
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// Eventos
eventenListener();
function eventenListener() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

}

// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        const {presupuesto, restante} = cantidad;
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }
}

// Instanciar
const ui = new UI();


// Funciones
function preguntarPresupuesto() {

    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');

    // Valiadar el presupuesto ingresado
    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }
    
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto);
}