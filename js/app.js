
//Constructores
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

// Realizar cotización con los datos
Seguro.prototype.cotizarSeguro = function() {
    /*
        1 = Americano  1.15
        2 = Asiático  1.05
        3 = Europeo  1.35
    */

    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15  
            break;
        case '2':
            cantidad = base * 1.05
            break;
        case '3':
            cantidad = base * 1.35
            break;
        default:
            break;
    }

    // Leer el año
    const diferencia = new Date().getFullYear() - this.year;

    // Cada año que la diferencia es mayor, el costo va a reducirse un 3%
    cantidad -= ((diferencia * 3) * cantidad ) / 100;

    /*
        Si el seguro es básico se multiplica por un 30% más
        Si el seguro es completo se multiplica por un 50% más
    */

    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    } else if (this.tipo === 'completo') {
        cantidad *= 1.5
    }
    
    return cantidad;
}   

function UI() {}

//Llenar las opciones de años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(), min = max - 22;

    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

//Muestra alerta en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add('error'); 
    } else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //Insertar html
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));  //insertBefore, el primer parámetro es lo que se insertara y el segundo ande de quien se insertara

    setTimeout(() => {
        div.remove();
    }, 3000); //Después de tres segundos se elimina el div
}

//Instanciar UI
const ui = new UI();



document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones(); //Llena el select con los años..
})

eventListener();
function eventListener() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit' , cotizarSeguro)
}

function cotizarSeguro(e) {
    e.preventDefault();

    //Leer marca seleccionada
    const marca = document.querySelector('#marca').value;

    //Leer año seleccionada
    const year = document.querySelector('#year').value;

    //Leer tipo de cobertura seleccionada
    const tipo = document.querySelector('input[name="tipo"]:checked').value; // Selector de CSS, para leer input de tipo radio en JS

    //Validación de campos vacíos
    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostrarMensaje('Cotizando... ', 'exito');

    // Instanciar el seguro
    const seguro = new Seguro(marca, year, tipo)
    seguro.cotizarSeguro();

    // Utilizar el prototype que va a cotizar
}