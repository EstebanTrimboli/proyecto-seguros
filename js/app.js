// Constructores
function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function () {

    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':    // en el caso de la marca 1
            cantidad = base * 1.15;
            break;

        case '2':   // en el caso de la marca 2
            cantidad = base * 1.05;
            break;

        case '3':   // en el caso de la marca 3
            cantidad = base * 1.35;
            break;
    
        default:
            break;
    
    }

    // Leer el año
    const diferencia = new Date().getFullYear() - this.year;
    // A cantidad le reasigno el resultado de: cantidad menos un 3% por cada año de antigüedad 
    cantidad -= ((diferencia * 3) * cantidad) / 100;
    
    if (this.tipo === 'basico') {
        cantidad *= 1.3; // Seguro básico se agrega un 30% a la cantidad base
    } else {
        cantidad *= 1.5;  // Seguro completo se agrega un 50% a la cantidad base
    }

    return cantidad
}

function UI() {}

UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear();
  const min = max - 23;

  const selectYear = document.querySelector("#year");

  for (let i = max; i >= min; i--) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
};

UI.prototype.mostrarMensaje = (mensaje, tipoMensaje) => {
  const div = document.createElement("div");
  if (tipoMensaje === "error") {
    div.classList.add("error");
  } else {
    div.classList.add("correcto");
  }

  div.classList.add("mensaje", "mat-10");
  div.textContent = mensaje;

  const formulario = document.querySelector("#cotizar-seguro");
  // insertamos el div antes del elemento con id='resultado'
  formulario.insertBefore(div, document.querySelector("#resultado"));

  setTimeout(() => {
    div.remove();
  }, 3000);
}

UI.prototype.mostrarResultado = (seguro, total) => {
    // Crear el resultado
const div = document.createElement('div');
//div.classList.add('mt-10');

div.innerHtml = `
   <p class="header">Tu Resumen</p>
   <p class="font-bold">Total: ${total}</p>
`;

  const resultadoDiv = document.querySelector('#resultado');
  resultadoDiv.appendChild(div);
}

// Instanciamos el proto UI
const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
  ui.llenarOpciones(); //Llena el select con los años
});

eventListeners();

function eventListeners() {
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.addEventListener("submit", cotizarSeguro);
}

function cotizarSeguro(e) {
  e.preventDefault();

  // Leer marca seleccionada
  const marca = document.querySelector("#marca").value;
  // Leer año seleccionado
  const year = document.querySelector("#year").value;
  // Leer tipo seleccionado      (la etiqueta es un input con un name="tipo", de la cuál seleccionamos sólo el botón que está tildado)
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  // Validación
  if (marca === "" || year === "" || tipo === "") {
    ui.mostrarMensaje("Todos los campos son obligatorios", "error");
    return;
  }
  ui.mostrarMensaje("Cotizando", "correcto");

  //Instanciamos el seguro, que toma los datos introducidos en el formulario
const seguro = new Seguro(marca, year, tipo);

// Asignamos el resultado de cotizarSeguro a la variable total
const total = seguro.cotizarSeguro();

// Llamo al prototype que va a imprimir el resultado
ui.mostrarResultado(seguro, total);
}