// Variables y selectores
let presupuesto;
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// Eventos
eventenListener();
function eventenListener() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);

}

// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        // console.log(gasto);
        this.gastos = [...this.gastos, gasto];
        // console.log(this.gastos);
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        const {presupuesto, restante} = cantidad;

        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;

        
    }
    imprimirAlerta(mensaje, tipoMensaje){
        //  crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        // Agregar clase de bootstrap segun el tipo de error
        if (tipoMensaje === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el DOM
        // document.querySelector('.primario').insertBefore(divMensaje, formulario);
        formulario.appendChild(divMensaje);

        // Quitar el alert despues de 3 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    };

    mostrarListaGastos(gastos) {
    gastos.forEach(gasto => {
            // console.log(gasto);
            const {nombreGasto, cantidad, id} = gasto;

            // Crear un li para cada gasto
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            // Insertar el HTML del gasto
            nuevoGasto.innerHTML = `${nombreGasto} <span class="badge badge-primary badge-pill">$ ${cantidad}</span>`;


            // Boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            nuevoGasto.appendChild(btnBorrar);
            btnBorrar.innerHTML = 'Borrar &times';

            // Agregar el HTML
            gastoListado.appendChild(nuevoGasto);
        });
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
    // console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto);
}


function agregarGasto(e) {
    e.preventDefault();

    // Leer los datos del formulario
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    // Validar
    if (nombreGasto === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no valida, recuerda que debe ser un numero positivo', 'error');
        return;
    }

    console.log('Se agrego el gasto');

    // Generar un nuevo gasto
    const gasto = {nombreGasto, cantidad, id: Date.now()};

    // Agregarlo al arreglo de gastos
    presupuesto.nuevoGasto(gasto);
    // console.log(gasto);

    // Mensaje de gasto agregado correctamente
    ui.imprimirAlerta('Gasto agregado correctamente');

    // Imprimir los gastos
    const {gastos} = presupuesto;

    ui.mostrarListaGastos(gastos);

    // Reiniciar el formulario
    formulario.reset();
}