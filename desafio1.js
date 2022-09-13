//DEFINICIÓN DE VARIABLES
var metros,
  tasa,
  tasaConPlan,
  primaTecnica,
  costoIva,
  costoIvaAdicional,
  costoRf,
  costoIibb,
  capital,
  premioFinal;

let nombre, descripcion, coberturaSeleccionada;

//FUNCIONES
var bienvenida = function () {
  alert(
    "Los datos son correctos!!!, Bienvenido al cotizador de Integral de Comercio (Cobertura de Incendio) -->  By INSURANCE TECH"
  );
};

//Funciones - CÁLCULOS
function tasaPlan(tasa, planSeleccionado) {
  var tasas;

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
  var primaCalculo;
  primaCalculo = (tasaFinal * capital) / 1000;
  return primaCalculo;
}

function iva(primaTecnica) {
  var ivaCalculo;
  ivaCalculo = 0.21 * primaTecnica;
  return ivaCalculo;
}

function ivaAdicional(primaTecnica) {
  var ivaAdicionalCalculo;
  ivaAdicionalCalculo = 0.03 * primaTecnica;
  return ivaAdicionalCalculo;
}

function rf(primaTecnica) {
  var rfCalculo;
  rfCalculo = 0.07 * primaTecnica;
  return rfCalculo;
}

function iibb(primaTecnica) {
  var iibbCalculo;
  iibbCalculo = 0.06 * primaTecnica;
  return iibbCalculo;
}

function premio(primaTecnica, costoIva, costoIvaAdicional, costoRf, costoIibb) {
  var premioCalculo;
  premioCalculo =
    primaTecnica + costoIva + costoIvaAdicional + costoRf + costoIibb;
  return premioCalculo;
}

// COBERTURAS DISPONIBLES
class Planes {
  constructor(nombre, descripcion) {
    this.nombre = nombre.toUpperCase();
    this.descripcion = descripcion;
  }
}

const responsabilidadCivil = new Planes("SOLO RC", "Daños ocasionados a 3eros");

const totalTotal = new Planes(
  "TODO TOTAL",
  responsabilidadCivil.descripcion + " + Incendio Total"
);

const todoRiesgo = new Planes(
  "TODO RIESGO",
  totalTotal.descripcion + " + Incendio Parcial."
);

//LISTADO DE COBERTURAS
const listaDePlanes = [todoRiesgo, totalTotal, responsabilidadCivil];

//contidad de planes
console.log(listaDePlanes.length);

//planes disponibles
console.log(listaDePlanes);

//PREGUNTAS DE SEGURIDAD PARA EL INGRESO
for (let cont = 1; cont <= 3; cont++) {
  var contrasena = prompt("Resuelva el siguiente cálculo => 5+7");

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

      //DESCRIPCIÓN DE LOS PLANES

      const opciones = [
        "1. Responsabilidad Civil",
        " 2. Todo Total",
        " 3. Todo Riesgo",
      ];
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
