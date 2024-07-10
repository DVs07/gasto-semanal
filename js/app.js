// Variables y selectores
let presupuesto;
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');
const btnSwitch = document.querySelector('#btn-switch-theme');
const html = document.querySelector('#htmlPage');
const nav = document.querySelector('.navbar');
const primeraSeccion = document.querySelector('#primero');
const segundoSeccion = document.querySelector('#segundo');
const footer = document.querySelector('.footer');
const texto = document.querySelectorAll('.texto');
// const h2 = document.body.querySelectorAll('h2');

// Eventos
eventenListener();
function eventenListener() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);

    btnSwitch.addEventListener('change', cambiarTema);

}

// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];

        this.calcularRestante();
    }

    calcularRestante() {
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        console.log(gastado);

        this.restante = this.presupuesto - gastado;
    }

    eliminarGasto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);

        this.calcularRestante();
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
        formulario.appendChild(divMensaje);

        // Quitar el alert despues de 3 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    };

    mostrarListaGastos(gastos) {
        // Eliminar el HTML previo
        this.limpiarHTML();
    gastos.forEach(gasto => {
            // console.log(gasto);
            const {nombreGasto, cantidad, id} = gasto;
            // // Crear un li para cada gasto
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-around align-items-center';
            nuevoGasto.dataset.id = id;

            // // Insertar el HTML del gasto
            nuevoGasto.innerHTML = `<span class="text-center p-1 rounded alert alert-dark col-6 col-sm-6">${nombreGasto}</span>  <span class="text-center p-1 rounded alert alert-light col-1 col-sm-1">$</span> <span class="text-center p-1 rounded alert alert-light col-3 col-sm-3">${cantidad}</span>`;


            // // Boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('alert','col-1', 'col-sm-1');
            nuevoGasto.appendChild(btnBorrar);
            btnBorrar.innerHTML = `<i class="fa fa-trash-o" aria-hidden="true"></i>`;

            // Evento para borrar el gasto
            btnBorrar.onclick = () => {
                eliminarGasto(id);
            }
            
            // Agregar el HTML
            gastoListado.appendChild(nuevoGasto);
        });
    }

    limpiarHTML() {
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestoObj) {
        const {presupuesto, restante} = presupuestoObj;
        const restanteDiv = document.querySelector('.restante');
        // Comprobar 25% de presupuesto restante
        if ((presupuesto / 4) > restante) {
            restanteDiv.classList.remove('alert-success','alert-warning','border', 'border-secondary-subtle');
            restanteDiv.classList.add('alert-danger');
        } else if ((presupuesto / 2) > restante) {
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        } else{
            restanteDiv.classList.remove('alert-danger','alert-warning');
            restanteDiv.classList.add('alert-success');
        }
        
        if(restante <= 0) {
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error');
            formulario.querySelector('button[type="submit"]').disabled = true;
            formulario.querySelector('button[type="submit"]').classList.add('btn-disabled');
        }else{
            formulario.querySelector('button[type="submit"]').disabled = false;
            formulario.querySelector('button[type="submit"]').classList.remove('btn-disabled');
        }
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

    // Mensaje de gasto agregado correctamente
    ui.imprimirAlerta('Gasto agregado correctamente');

    // Imprimir los gastos
    const {gastos, restante} = presupuesto;

    ui.mostrarListaGastos(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
    // Reiniciar el formulario
    formulario.reset();
}

// Funcion para eliminar gastos
function eliminarGasto(id){
    // Elimina el gasto por el ID, el gasto se elimina del arreglo de gastos. 
    presupuesto.eliminarGasto(id);

    // Elimina los gastos del HTML
    const {gastos, restante} = presupuesto;
    ui.mostrarListaGastos(gastos);

    // Actualiza el restante
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
}

function cambiarTema() {
    if(btnSwitch.checked) {
        html.setAttribute('data-bs-theme', 'dark');
        nav.classList.add('border-bottom'),
        nav.classList.add('border-dark-subtle');
        primeraSeccion.classList.add('border');
        primeraSeccion.classList.add('border-dark-subtle');
        segundoSeccion.classList.add('border');
        segundoSeccion.classList.add('border-dark-subtle');
        // texto.classList.add('text-light');
        texto.forEach(e =>{
            e.classList.add('text-light');
        })
    } else {
        html.setAttribute('data-bs-theme', 'light');
        nav.classList.remove('border-bottom'),
        nav.classList.remove('border-dark-subtle');
        primeraSeccion.classList.remove('border');
        primeraSeccion.classList.remove('border-dark-subtle');
        segundoSeccion.classList.remove('border');
        segundoSeccion.classList.remove('border-dark-subtle');
        texto.forEach(e =>{
            e.classList.remove('text-light');
        })
    }
}