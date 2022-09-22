//DEFINICIÓN DE VARIABLESlet
let metros,
  tasa,
  tasaConPlan,
  primaTecnica,
  costoIva,
  costoIvaAdicional,
  costoRf,
  costoIibb,
  capital,
  premioFinal,
  nombre,
  descripcion,
  coberturaSeleccionada;

//FUNCIONES
let bienvenida = function () {
  alert(
    "Los datos son correctos!!!, Bienvenido al cotizador de Integral de Comercio (Cobertura de Incendio) -->  By INSURANCE TECH"
  );
};

//Funciones - CÁLCULOS

function tasaPlan(tasa, planSeleccionado) {
  let tasas;

  if (planSeleccionado == 1) {
    tasas = tasa * 1;
  }
  if (planSeleccionado == 2) {
    tasas = tasa * 2;
  } else {
    tasas = tasa * 4;
  }
  return tasas;
}

function prima(tasaFinal, capital) {
  let primaCalculo;
  primaCalculo = (tasaFinal * capital) / 1000;
  return primaCalculo;
}

function iva(primaTecnica) {
  let ivaCalculo;
  ivaCalculo = 0.21 * primaTecnica;
  return ivaCalculo;
}

function ivaAdicional(primaTecnica) {
  let ivaAdicionalCalculo;
  ivaAdicionalCalculo = 0.03 * primaTecnica;
  return ivaAdicionalCalculo;
}

function rf(primaTecnica) {
  let rfCalculo;
  rfCalculo = 0.07 * primaTecnica;
  return rfCalculo;
}

function iibb(primaTecnica) {
  let iibbCalculo;
  iibbCalculo = 0.06 * primaTecnica;
  return iibbCalculo;
}

function premio(primaTecnica, costoIva, costoIvaAdicional, costoRf, costoIibb) {
  let premioCalculo;
  premioCalculo =
    primaTecnica + costoIva + costoIvaAdicional + costoRf + costoIibb;
  return premioCalculo;
}

// COBERTURAS DISPONIBLES
class Planes {
  constructor(id, nombre, descripcion, imagen, gratis) {
    this.id = id;
    this.nombre = nombre.toUpperCase();
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.gratis = gratis;
  }
  verificar() {
    console.log(`El id del pruducto: ${this.id}`);
  }
}

const responsabilidadCivil = new Planes(
  1,
  "SOLO RC",
  "Daños ocasionados a 3eros"
);

const totalTotal = new Planes(
  2,
  "TODO TOTAL",
  responsabilidadCivil.descripcion + " + Incendio Total",
  "Telemedicina Gratis"
);

const todoRiesgo = new Planes(
  3,
  "TODO RIESGO",
  totalTotal.descripcion + " + Incendio Parcial.",
  "Telemedicina Gratis"
);

//LISTADO DE COBERTURAS
let listaDePlanes = [todoRiesgo, totalTotal, responsabilidadCivil, Planes];

//METODO DE BUSQUEDA
let incluyeRc = listaDePlanes.includes(responsabilidadCivil, 0);
console.log(incluyeRc);

//METODO DE FILTRADO
let incluyeTr = listaDePlanes.filter((element) => element > todoRiesgo);

console.log(incluyeTr);

//contidad de planes
console.log(listaDePlanes.length);

//planes disponibles
console.log(listaDePlanes);

//filtrar
let estaPlan = listaDePlanes.filter((Element) => Element == "riesgo");
console.log(estaPlan.length);

//DESCRIPCIÓN DE LAS COBERTURAS

let responsabilidadCivilDescripcion = {
  contraTerceros: 25000000,
};

//PREGUNTAS DE SEGURIDAD PARA EL INGRESO
for (let cont = 1; cont <= 3; cont++) {
  let contrasena = prompt("Resuelva el siguiente cálculo => 5+7");

  if (contrasena == "12") {
    bienvenida();

    // SOLITUD DE INFORMACIÓN AL ASEGURADO
    do {
      metros = parseInt(
        prompt(
          "Ingrese la cantidad de metros cuadrados que tiene su comercio. Mínimo 20 mtrs cuadrados - Máx 300 mtrs cuadrados."
        )
      );
      if (isNaN(metros)) {
        alert("Solo debe incluir números");
      }
    } while (!(metros >= 20 && metros <= 300));

    if (metros > 0 && metros <= 300) {
      //DEFINICIÓN DE TASAS
      if (metros > 0 && metros <= 50) {
        tasa = 2;
      } else if (metros > 50 && metros <= 100) {
        tasa = 3;
      } else if (metros > 100 && metros <= 200) {
        tasa = 5;
      } else if (metros > 200 && metros <= 300) {
        tasa = 7;
      }

      do {
        capital = parseInt(
          prompt(
            "Ingrese el capital que desea asegurar con la cobertura de incendio. Mínimo $100.000"
          )
        );
        if (isNaN(capital)) {
          alert("Solo debe incluir números");
        }
      } while (!(capital >= 100000 || capital == 20));

      //OPCIONES DE PLANES

      const opciones = [
        " 1. Responsabilidad Civil",
        " 2. Todo Total",
        " 3. Todo Riesgo",
      ];

      for (let i = 0; i < opciones.length; i++) {
        console.log(`Los planes disponibles son: ${opciones[i]}`);
      }

      opciones.push(" ( Asistencia Médica GRATIS! ) ");
      console.log(opciones);

      //SELECCIÓN DE PLAN
      do {
        planSeleccionado = parseInt(
          prompt("Seleccione el plan que desea contratar ==>" + opciones)
        );
        if (isNaN(capital)) {
          alert("Solo debe incluir números");
        }
      } while (
        !(
          planSeleccionado == 1 ||
          planSeleccionado == 2 ||
          planSeleccionado == 3
        )
      );

      if (planSeleccionado == 1) {
        coberturaSeleccionada = "SOLO RC";
        alert(
          "El plan seleccionado es: " +
            responsabilidadCivil.nombre +
            " y posee las siguientes coberturas: " +
            responsabilidadCivil.descripcion
        );
      }
      if (planSeleccionado == 2) {
        coberturaSeleccionada = "TODO TOTAL";
        alert(
          "El plan seleccionado es: " +
            totalTotal.nombre +
            " y posee las siguientes coberturas: " +
            totalTotal.descripcion
        );
      } else {
        coberturaSeleccionada = "TODO RIESGO";
        alert(
          "El plan seleccionado es: " +
            todoRiesgo.nombre +
            " y posee las siguientes coberturas: " +
            todoRiesgo.descripcion
        );
      }

      //DEFINICIÓN DE TASA SEGÚN EL PLAN SELECCIONADO
      tasaFinal = tasaPlan(tasa, planSeleccionado);

      //DESGLOSE DE COSTOS
      primaTecnica = prima(tasaFinal, capital);

      costoIva = iva(primaTecnica);

      costoIvaAdicional = ivaAdicional(primaTecnica);

      costoRf = rf(primaTecnica);

      costoIibb = iibb(primaTecnica);

      premioFinal = premio(
        primaTecnica,
        costoIva,
        costoIvaAdicional,
        costoRf,
        costoIibb
      );

      //RESUMEN DE COSTOS DE LA COBERTURA SELECCIONADA

      alert(
        `El costo de la cobertura ${coberturaSeleccionada} para su comercio de ${metros.toFixed(
          2
        )} metros cuadrados y capital asegurado de $ ${capital.toFixed(
          2
        )}, será de: $ ${premioFinal.toFixed(2)} por mes`
      );

      console.log(
        `Desglose de costos mensual => Prima Técnica: $ ${primaTecnica} + IVA: $ ${costoIva} + IVA Adicional: $ ${costoIvaAdicional} + RF: $ ${costoRf} + IIBB: $ ${costoIibb} ======> Premio Final: $ ${premioFinal}`
      );

      alert(
        `Desglose de costos mensual => Prima Técnica: $ ${primaTecnica.toFixed(
          2
        )} + IVA: $ ${costoIva.toFixed(
          2
        )} + IVA Adicional: $ ${costoIvaAdicional.toFixed(
          2
        )} + RF: $ ${costoRf.toFixed(2)} + IIBB: $ ${costoIibb.toFixed(
          2
        )} ==> Total Premio: $ ${premioFinal.toFixed(2)}`
      );
    } else if (metros <= 0) {
      alert("Los metros cuadrados ingresados no son válidos");
    } else if (metros > 200) {
      alert(
        "El tamaño del comercio que desea cotizar supera nuestras pautas de suscripción"
      );
    }
    break;
  } else if (cont < 3) {
    alert(
      "Tenes hasta 3 intentos fallidos, ya te consumiste " +
        cont +
        " vuelve a intentarlo"
    );
  } else {
    alert("Usaste tu " + cont + "° intento, inténtalo en otro momento.");
  }
}

//DOM

let = document.getElementById("titulo");
console.log(titulo.innerText);
titulo.innerText = "Póliza de Integral de Comercio";

let planes = document.getElementsByClassName("planes");
console.log(planes[0].innerText);
console.log(planes[1].innerText);
console.log(planes[2].innerText);

let totalListaDePlanes = document.getElementById("listaPlanes");
totalListaDePlanes.innerHTML += `<li class = "planes" >Plan Seguro Técnico</li>`;

for (let cadaPlan of planes) {
  console.log(cadaPlan);
  cadaPlan.innerText += " + Serv. de Urgencia (GRATIS!)";
}

let elementosH4 = document.getElementsByTagName("h4");
console.log(elementosH4);

for (let h4 of elementosH4) {
  console.log(h4.innerText);
}

let parrafo = document.querySelectorAll("#texto");
console.log(parrafo);

let robo = document.createElement("li");
robo.innerText = "Robo de Valores en Tránsito";
console.log(robo);

document.body.append(robo);
let listaPlanes = document.getElementById("listaPlanes");
listaPlanes.append(robo);

const ofertaDeProductos = [];
ofertaDeProductos.push(listaDePlanes);
console.log(ofertaDeProductos);

/*
//Clase constuctora
class Seguros {
  constructor(item, ramo, detalle, beneficio, imagen) {
    //propiedades o atributos de nuestra clase
    (this.id = item),
      (this.ramo = ramo),
      (this.detalle = detalle),
      (this.beneficio = beneficio),
      (this.imagen = imagen);
  }
  //métodos
  mostrarData() {
    console.log(
      `El seguro es el ${this.id} ${this.ramo}, que cubre: ${this.detalle}. Viene acompañado del siguiente beneficio: es ${this.beneficio}`
    );
  }
}

//OBJETOS
const seguro1 = new Seguros(
  1,
  "Responsabilidad Civil",
  "Cubre daños a terceros causados por el mantenimiento de predios y por el desarrollo de las labores y operaciones relacionadas directamente con su actividad económica.",
  "Telemedicina Gratis",
  "responsabilidadcivil.jpg"
);

const seguro2 = new Seguros(
  2,
  "Todo Total",
  "Cubre la RC contra 3eros, pero también se cubre Incendio Total, Daño Total, Robo Total.",
  "Telemedicina Gratis",
  "todototal.jpg"
);

const seguro3 = new Seguros(
  3,
  "Todo Riesgo",
  "Cubre la RC, plan Todo Total y también se cubre Incendio Parcial, Daño Parcial, Robo Parcial.",
  "Telemedicina Gratis",
  "todoriesgo.jpeg"
);

const seguro4 = new Seguros(
  4,
  "Seguro Técnico",
  "Cubre la RC, plan Todo Total y también se cubre Incendio Parcial, Daño Parcial, Robo Parcial.",
  "Telemedicina Gratis",
  "segurotecnico.jpg"
);

const seguro5 = new Seguros(
  5,
  "Robo de Valores en Tránsito",
  "Cubre la RC, plan Todo Total y también se cubre Incendio Parcial, Daño Parcial, Robo Parcial.",
  "Telemedicina Gratis",
  "robodevalores.jpg"
);

const oferta = [];
oferta.push(seguro1, seguro2, seguro3, seguro4, seguro5);

//CARDS
let divProductos = document.getElementById("productos");

function mostrarOferta(oferta) {
  divProductos.innerHTML = "";

  oferta.forEach(function (seguro) {
    let nuevoProducto = document.createElement("div");

    nuevoProducto.innerHTML = `<div id="${seguro.id}" class="card" style="width: 18rem;">
                                    <img class="card-img-top" style="height: 250px;" src="" alt="${seguro.nombre} ">
                                    <div class="card-body">
                                        <h4 class="card-title">${seguro.nombre}</h4>
                                        <p><strong> Descripción: </strong> ${seguro.descripcion}</p>
                                        <p class="">ServAdicional: ${seguro.gratis}</p>
                                        <button class="btn btn-outline-success btnComprar">Cotizar Aquí</button>
                                    </div>
        </div>`;
    divProductos.append(nuevoProducto);
  });

  let btnCompra = document.getElementsByClassName("btnComprar");
  for (let compra of btnCompra) {
    compra.addEventListener("click", () => {
      alert("El producto ha sido comprado");
    });
  }
}
*/

//Clase constuctora
class Libro {
  constructor(id, autor, titulo, precio, imagen) {
    //propiedades o atributos de nuestra clase
    (this.id = id),
      (this.autor = autor),
      (this.titulo = titulo),
      (this.precio = precio),
      (this.imagen = imagen);
  }
  //métodos
  mostrarData() {
    console.log(
      `El titulo es ${this.titulo}, el autor es ${this.autor} y su precio es ${this.precio}`
    );
  }
}
//Instanciación de objetos -- respetamos orden y cantidad de atributos

const libro1 = new Libro(
  1,
  "Jorge Luis Borges",
  "Aleph",
  900,
  "AlephBorges.jpg"
);

const libro2 = new Libro(
  2,
  "Gabriel García Marquez",
  "Cien años de Soledad",
  4500,
  "CienSoledadMarquez.jpg"
);

const libro3 = new Libro(
  3,
  "Isabel Allende",
  "Paula",
  2800,
  "PaulaAllende.jpg"
);

const libro4 = new Libro(
  4,
  "Jorge Luis Borges",
  "Ficciones",
  1400,
  "FiccionesBorges.jpg"
);

const libro5 = new Libro(
  5,
  "Mario Benedetti",
  "Andamios",
  2200,
  "AndamiosBenedetti.jpg"
);

const libro6 = new Libro(
  6,
  "Mario Vargas Llosa",
  "La ciudad y los perros",
  2000,
  "CiudadPerrosVargasLlosa.jpg"
);

//Dos formas inicializar el array:
const biblioteca = [libro1, libro2, libro3, libro4, libro5];
// console.log(biblioteca)
//Segunda forma
const estanteria = [];
estanteria.push(libro1, libro2, libro3, libro4, libro5, libro6);
let divProductos = document.getElementById("productos");
function mostrarCatalogo(array) {
  divProductos.innerHTML = "";
  array.forEach((libro) => {
    let nuevoProducto = document.createElement("div");
    nuevoProducto.innerHTML = `<div id="${libro.id}" class="card" style="width: 18rem;">
                                    <img class="card-img-top" style="height: 250px;" src="assets/${libro.imagen}" alt="${libro.titulo} de ${libro.autor}">
                                    <div class="card-body">
                                        <h4 class="card-title">${libro.titulo}</h4>
                                        <p>Autor: ${libro.autor}</p>
                                        <p class="">Precio: ${libro.precio}</p>
                                        <button class="btn btn-outline-success btnComprar">Agregar al carrito</button>
                                    </div>
        </div>`;
    divProductos.append(nuevoProducto);
  });
  let btnCompra = document.getElementsByClassName("btnComprar");
  for (let compra of btnCompra) {
    compra.addEventListener("click", () => {
      alert("El producto ha sido comprado");
    });
  }
}

// for(let compra of btnCompra){
//     compra.addEventListener("click", ()=>{
//         alert("El producto ha sido comprado")
//     })
// }

function ocultarCatalogo() {
  divProductos.innerHTML = "";
}
// //function agregar Libro
function nuevoLibro(array) {
  let autorIngresado = prompt("Ingrese el autor");
  let tituloIngresado = prompt("Ingrese el titulo");
  let precioIngresado = parseInt(prompt("Ingrese el precio"));
  let libroCreado = new Libro(
    estanteria.length + 1,
    autorIngresado,
    tituloIngresado,
    precioIngresado
  );
  array.push(libroCreado);
}

//function nuevoLibro actualiza a inputs!
function guardarLibro(array) {
  let autorInput = document.getElementById("autorInput");
  let tituloInput = document.getElementById("tituloInput");
  let precioInput = document.getElementById("precioInput");
  let libroCreado = new Libro(
    array.length + 1,
    autorInput.value,
    tituloInput.value,
    parseInt(precioInput.value),
    "libroNuevo.jpg"
  );
  console.log(libroCreado);
  array.push(libroCreado);
  console.log(array);
  //Provisorio resetear form
  precioInput.value = "";
  tituloInput.value = "";
  autorInput.value = "";
  mostrarCatalogo(array);
}
//btnGuardar adjuntamos evento
let btnGuardar = document.getElementById("guardarLibroBtn");
btnGuardar.addEventListener("click", () => {
  guardarLibro(estanteria);
});
//BtnMostrarCatalogo adjuntamos evento
let btnMostrarCatalogo = document.getElementById("verCatalogo");
btnMostrarCatalogo.addEventListener("click", () => {
  mostrarCatalogo(estanteria);
});

//btn ocultar adjuntamos evento
let btnOcultarCatalogo = document.getElementById("ocultarCatalogo");
btnOcultarCatalogo.onclick = ocultarCatalogo;
