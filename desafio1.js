//DEFINICIÓN DE VARIABLES
let tasa;
var primaTecnica;
var costoIva;
var costoIvaAdicional;
var costoRf;
var costoIibb;
var premioFinal;

//FUNCIONES

var bienvenida = function () {
  alert(
    "Los datos son correctos!!!, Bienvenido al cotizador de Integral de Comercio (Cobertura de Incendio) -->  By INSURANCE TECH"
  );
};

//Funciones - CÁLCULOS

function prima(tasa, capital) {
  var primaCalculo;
  primaCalculo = (tasa * capital) / 1000;
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

//PREGUNTAS DE SEGURIDAD PARA EL INGRESO

for (let cont = 1; cont <= 3; cont++) {
  var contrasena = prompt("Resuelva el siguiente cálculo => 5+7");

  if (contrasena == "12") {
    bienvenida();

    // SOLITUD DE INFORMACIÓN AL ASEGURADO
    var metros = "";

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

    if (metros > 0 && metros <= 200) {
      //DEFINICIÓN DE TASAS
      if (metros > 0 && metros <= 50) {
        tasa = 2;
      } else if (metros > 50 && metros <= 100) {
        tasa = 3;
      } else if (metros > 100 && metros <= 200) {
        tasa = 5;
      }

      var capital = "";

      do {
        capital = parseInt(
          prompt(
            "Ingrese el capital que desea asegurar con la cobertura de incendio. Mínimo $500.000"
          )
        );
        if (isNaN(capital)) {
          alert("Solo debe incluir números");
        }
      } while (!(capital >= 20));

      //DESGLOSE DE COSTOS

      primaTecnica = prima(tasa, capital);

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

      //RESUMEN DE LA COBERTURA PARA EL CLIENTE

      alert(
        `El costo final de la póliza para su comercio de ${metros.toFixed(
          2
        )} metros cuadrados y capital asegurado de $ ${capital.toFixed(
          2
        )}, será de: $ ${premioFinal.toFixed(2)} por mes`
      );

      console.log(`Desglose de costos =>  `);
      console.log(`Prima Técnica: $ ${primaTecnica}`);
      console.log(`+ IVA: $ ${costoIva}`);
      console.log(`+ IVA Adicional: $ ${costoIvaAdicional}`);
      console.log(`+ RF: $ ${costoRf}`);
      console.log(`+ IIBB: $ ${costoIibb}`);
      console.log(`Premio Final: $ ${premioFinal}`);

      alert(
        `Desglose de costos => Prima Técnica: $ ${primaTecnica.toFixed(
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
