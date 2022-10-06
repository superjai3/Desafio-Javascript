// Definición de formas de pago
const paymentCash = new PaymentType("Cash", 6, 0);
const paymentBiannual = new PaymentType("Biannual", 1, -0.15);
const paymentAuto = new PaymentType("Automatic", 6, -0.05);

// Definición de Coberturas
const PRODUCT_RC = new Product(
  "RC",
  "Responsabilidad Civil",
  "Cobertura básica, no incluye asistencia",
  0
);
const PRODUCT_TC = new Product(
  "TC",
  "Tercero Completo",
  "Destrucción total/parcial por robo/incendio",
  0.0055
);
const PRODUCT_TR = new Product(
  "TR",
  "Todo Riesgo",
  "Todo riesgo con franquicia del 1% sobre suma asegurada",
  0.017
);

// API Firebase RTDB
const API_URL = "https://cotizador-js-default-rtdb.firebaseio.com/";

// Se crean los "CustomSelect" para marca, año y versión.
const brandSelect = new CustomSelect("brandSelect");
const yearSelect = new CustomSelect("yearSelect");

// A modelSelect se le pasa el callback fillVehicleAmount, para que cuando el usuario
// Haga click en un item, se complete la suma asegurada del modelo seleccionado
const modelSelect = new CustomSelect("modelSelect", fillVehicleAmount);

// Llenar campo Marcas
async function fillBrandSelect() {
  const ENDPOINT = "brands.json";
  if (brandSelect.isReady) brandSelect.reset(); // Si se llenó previamente, resetear
  brandSelect.isLoading(true);
  const brands = await getFetch(API_URL + ENDPOINT);
  brandSelect.createItems(brands);
  brandSelect.isLoading(false);
}

// Llenar campo Años y resetear Modelos
function fillYearSelect() {
  const years = [
    { key: 6, name: "2022" },
    { key: 5, name: "2021" },
    { key: 4, name: "2020" },
    { key: 3, name: "2019" },
    { key: 2, name: "2018" },
    { key: 1, name: "2017" },
    { key: 0, name: "2016" },
  ];
  if (modelSelect.isReady) modelSelect.reset(); // si había modelos, resetear
  if (yearSelect.isReady) yearSelect.reset(); // Si se llenó previamente, resetear
  yearSelect.isLoading(true);
  yearSelect.createItems(years);
  return new Promise((resolve) => {
    setTimeout(() => {
      yearSelect.isLoading(false);
      resolve();
    }, 1200);
  }); // delay ficticio
}

// Llenar campo Modelos según Marca y Año elegidos
async function fillModelsSelect(brandKey, year) {
  const ENDPOINT = "brandbykey/";
  if (modelSelect.isReady) modelSelect.reset(); // Si se llenó previamente, resetear
  modelSelect.isLoading(true);
  const models = await getFetch(
    API_URL + ENDPOINT + brandKey + "/" + year + ".json"
  );
  models.forEach((model) => {
    model.name = model.model + " - " + model.version;
    delete model.model;
    delete model.version;
  });
  modelSelect.createItems(models);
  modelSelect.isLoading(false);
}

// Llenar campo Suma Asegurada
function fillVehicleAmount(model) {
  const vehicleAmount = DOMById("vehicleAmount");
  vehicleAmount.value = model.statedAmount; //.toLocaleString('es-AR');
  vehicleAmount.dataset.statedAmount = model.statedAmount; // dataset usado para validar
  formatVehicleAmount();
  vehicleAmount.dispatchEvent(new Event("change")); // Disparar evento para validar
}

function restoreLastQutation() {
  const isEditing = getFromSession("isEditing");
  const newQuotation = getFromSession("newQuotation");
  const activeId = getFromSession("activeId");
  // Si es falso se hizo una cotizacion previamente
  // Podría haber quedado guardada en el historial o en local
  if (!newQuotation) {
    // Si isEditing quedó true, lo ultimo que hizo al salir
    // fue editar o cargar una de las cotizaciones guardads
    // Si no obtener la ultima activa desde el historial
    const quotations = isEditing
      ? getFromLocal("quotations")
      : getFromSession("quotations");
    if (quotations) {
      const indexOfActiveId = quotations.indexOf(
        quotations.find((q) => q.id == activeId)
      );
      loadQuotation(quotations[indexOfActiveId], isEditing);
      enableActiveItem(activeId, isEditing);
    }
  }
}

function createNewQuotation() {
  // Deshabilitar item activo
  disableActiveItem();
  // Prepara storage para crear una nueva cotización
  setToSession("newQuotation", true);
  setToSession("isEditing", false);
  setToSession("activeId", null);

  // Resetear todos los campos
  const allFormElements = [
    "clientName",
    "clientAge",
    "vehicleBrand",
    "vehicleYear",
    "vehicleModel",
    "vehicleAmount",
  ];

  allFormElements.forEach((el) => {
    DOMById(el).disabled = true;
    DOMById(el).value = "";
    DOMById(el).style.border = "1px solid #ced4da"; // default bootstrap style
  });

  delete DOMById("vehicleAmount").dataset.statedAmount;
  DOMById("vehicleAdjustment").selectedIndex = 0;
  DOMById("vehicleUsage").selectedIndex = 0;
  DOMById("vehicleGNC").checked = false;

  // Resetear checkboxes coberturas
  resetCoverages();

  // Reset Selects
  brandSelect.reset();
  yearSelect.reset();
  modelSelect.reset();

  // Habilitar campo cliente y vehiculo para empezar desde 0
  DOMById("clientName").disabled = false;
  DOMById("vehicleBrand").disabled = false;

  // Mostrar primer etapa y deshabilitar las siguientes
  DOMById("btn-collapseClient").disabled = false;
  DOMById("btn-collapseVehicle").disabled = true;
  DOMById("btn-collapsePayment").disabled = true;
  DOMById("btn-collapseQuotation").disabled = true;

  showStep("collapseClient");
}

// llenar los campos con la información de la cotización
// y renderizar la cotización
async function loadQuotation(quotationData, isLocal) {
  // Deshabilitar botones mientras carga
  DOMById("btn-offcanvasHistory").disabled = true;
  DOMById("btn-saveQuotation").disabled = true;
  DOMById("btn-newQuotation").disabled = true;

  // Mostrar última etapa y deshabilitar las anteriores
  DOMById("btn-collapseClient").disabled = true;
  DOMById("btn-collapseVehicle").disabled = true;
  DOMById("btn-collapsePayment").disabled = true;
  // Mostrar etapa cotización cargando
  if (DOMById("btn-collapseQuotation").classList.contains("collapsed"))
    showStep("collapseQuotation");
  DOMById("btn-collapseQuotation").disabled = false;
  DOMById("collapseQuotation").scrollIntoView();
  renderLoadingQuotation();

  let adjustmentIndex;
  switch (quotationData.car.automaticAdjustment) {
    case 0.15:
      adjustmentIndex = 0;
    case 0.2:
      adjustmentIndex = 1;
    case 0.3:
      adjustmentIndex = 2;
  }

  // Reset checkboxes Coberturas
  resetCoverages();
  enableCoverages(true);

  // Llenar campos
  DOMById("clientName").value = quotationData.person.name;
  DOMById("clientAge").value = quotationData.person.age;
  DOMById("vehicleBrand").value = quotationData.car.brand;
  DOMById("vehicleYear").value = quotationData.car.year;
  DOMById("vehicleModel").value = quotationData.car.model;
  DOMById("vehicleAmount").value = quotationData.car.amount;
  DOMById("vehicleAmount").dataset.statedAmount =
    quotationData.car.statedAmount; // para validar la suma
  DOMById("vehicleAdjustment").selectedIndex = adjustmentIndex;
  DOMById("vehicleUsage").selectedIndex = quotationData.car.commercialUse
    ? 1
    : 0;
  DOMById("vehicleGNC").checked = quotationData.car.gnc;

  // Formatear número del campo Suma asegurada
  formatVehicleAmount();

  // Configurar los CustomSelect
  await fillBrandSelect();
  await fillYearSelect();
  await fillModelsSelect(quotationData.car.brandKey, quotationData.car.year);
  brandSelect.loadPreviousData(quotationData.car.brandKey);
  yearSelect.loadPreviousData("", quotationData.car.year);
  modelSelect.loadPreviousData(quotationData.car.modelKey);

  quotationData.coverages.forEach((product) => {
    switch (product.coverageCode) {
      case "RC":
        DOMById("checkRC").checked = true;
        break;
      case "TC":
        DOMById("checkTC").checked = true;
        break;
      case "TR":
        DOMById("checkTR").checked = true;
        break;
    }
  });

  // habilitar todos los campos para que sean editables
  const allFormElements = [
    "clientName",
    "clientAge",
    "btn-next-client",
    "vehicleBrand",
    "vehicleYear",
    "vehicleModel",
    "vehicleAmount",
    "btn-next-vehicle",
  ];

  allFormElements.forEach((el) => {
    DOMById(el).disabled = false;
    DOMById(el).style.border = "1px solid green";
  });

  // Delay con timeout usando IIFE, promesa y await
  await (() => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  })();

  // Renderizar cotización
  renderQuotation(quotationData, quotationData.coverages);
  Toastify({
    text:
      "Cotización recuperada desde " +
      (isLocal ? "las guardadas" : "el historial"),
    close: true,
    className: "toast-info",
    duration: 3000,
  }).showToast();

  // Habilitar botones
  DOMById("btn-offcanvasHistory").disabled = false;
  DOMById("btn-saveQuotation").disabled = false;
  DOMById("btn-newQuotation").disabled = false;
}

function btnLoadQuotation(id, isLocal) {
  // eliminar atributo 'active' del item activo
  disableActiveItem();
  // agregar atributo 'active' al item seleccionado
  enableActiveItem(id, isLocal);
  // cambiar id activa por la de la cotización seleccionada
  setToSession("activeId", Number(id));
  const quotation = isLocal
    ? getFromLocal("quotations")
    : getFromSession("quotations");
  const indexOfActiveId = quotation.indexOf(quotation.find((q) => q.id == id));
  if (isLocal) {
    setToSession("isEditing", true);
    setToSession("newQuotation", false);
    loadQuotation(quotation[indexOfActiveId], isLocal);
  } else {
    setToSession("isEditing", false);
    setToSession("newQuotation", false);
    loadQuotation(quotation[indexOfActiveId], isLocal);
  }
  // Ocultar historial
  const btnHistory = DOMById("btn-offcanvasHistory");
  btnHistory.disabled = false;
  DOMById("btn-offcanvasHistory").click();
  btnHistory.disabled = true;
}

function btnDeleteQuotation(id, isLocal) {
  const listTarget = isLocal
    ? "offcanvas-saved-list"
    : "offcanvas-history-list";
  const itemTarget = DOMById(listTarget).querySelector(
    `[data-quotation-id="${id}"]`
  );
  if (itemTarget.classList.contains("active")) {
    Toastify({
      text: "No se puede eliminar una cotización activa!",
      close: true,
      className: "toast-danger",
      duration: 3000,
    }).showToast();
  } else {
    const quotations = isLocal
      ? getFromLocal("quotations")
      : getFromSession("quotations");
    const updateStorage = isLocal
      ? (data) => setToLocal("quotations", data)
      : (data) => setToSession("quotations", data);
    quotations.splice(
      quotations.indexOf(quotations.find((item) => item.id == id)),
      1
    );
    updateStorage(quotations);
    itemTarget.remove();
    if (quotations.length == 0) {
      const textElement = document.createElement("p");
      textElement.innerText = "No hay cotizaciones recientes";
      document.getElementById(listTarget).appendChild(textElement);
    }
    Toastify({
      text: "Cotización eliminada exitosamente!",
      close: true,
      className: "toast-success",
      duration: 3000,
    }).showToast();
  }
}

function disableActiveItem() {
  const activeId = getFromSession("activeId");
  const isEditing = getFromSession("isEditing");
  if (activeId != null) {
    const listTarget = isEditing
      ? "offcanvas-saved-list"
      : "offcanvas-history-list";
    const itemTarget = document
      .getElementById(listTarget)
      .querySelector(`[data-quotation-id="${activeId}"]`);
    itemTarget.classList.remove("active");
  }
}

function enableActiveItem(id, isLocal) {
  const listTarget = isLocal
    ? "offcanvas-saved-list"
    : "offcanvas-history-list";
  const itemTarget = DOMById(listTarget).querySelector(
    `[data-quotation-id="${id}"]`
  );
  itemTarget.classList.add("active");
}

// Cotizar y mostrar resultado
function quoteAndShow(paymentType) {
  const clientName = cleanClientName(DOMById("clientName").value);
  const clientAge = Number(DOMById("clientAge").value);
  const vehicleBrand = DOMById("vehicleBrand").value;
  const vehicleBrandKey = DOMById("vehicleBrand").dataset.selectedItem;
  const vehicleYear = Number(DOMById("vehicleYear").value);
  const vehicleModel = DOMById("vehicleModel").value;
  const vehicleModelKey = DOMById("vehicleModel").dataset.selectedItem;
  const vehicleAmount = Number(
    DOMById("vehicleAmount").value.trim().replaceAll(".", "")
  );
  const vehicleStatedAmount = Number(
    DOMById("vehicleAmount").dataset.statedAmount
  );
  const vehicleAdjustment = Number(DOMById("vehicleAdjustment").value);
  const commercialUse = DOMById("vehicleUsage").value == "1" ? false : true;
  const isGNC = DOMById("vehicleGNC").checked;

  // Deshabilitar botones mientras carga
  DOMById("btn-offcanvasHistory").disabled = true;
  DOMById("btn-saveQuotation").disabled = true;
  DOMById("btn-newQuotation").disabled = true;

  switch (paymentType) {
    case 1:
      paymentType = paymentCash;
      break;
    case 2:
      paymentType = paymentBiannual;
      break;
    case 3:
      paymentType = paymentAuto;
      break;
  }

  const selectedCoverages = [];

  if (DOMById("checkRC").checked) selectedCoverages.push(PRODUCT_RC);
  if (DOMById("checkTC").checked) selectedCoverages.push(PRODUCT_TC);
  if (DOMById("checkTR").checked) selectedCoverages.push(PRODUCT_TR);

  const clientVehicle = new Car(
    vehicleBrand,
    vehicleBrandKey,
    vehicleModel,
    vehicleModelKey,
    vehicleYear,
    vehicleAmount,
    vehicleStatedAmount,
    vehicleAdjustment,
    commercialUse,
    isGNC
  );
  const clientData = new Person(clientName, clientAge);
  const clientCoverages = selectedCoverages;
  const quotation = new Quotation(
    clientData,
    clientVehicle,
    clientCoverages,
    paymentType
  );
  const coverages = quotation.quote();
  // Guardar la cotización
  let { product, ...quotationData } = quotation;
  quotationData = { ...quotationData, coverages };
  handleStorage(quotationData);

  // Renderizar animación cargando..
  renderLoadingQuotation();
  showStep("collapseQuotation");

  setTimeout(() => {
    // Renderizar cotización
    renderQuotation(quotation, coverages);

    Toastify({
      text: "Cotización exitosa!",
      close: true,
      className: "toast-success",
      duration: 3000,
    }).showToast();

    // Habilitar botones
    DOMById("btn-offcanvasHistory").disabled = false;
    DOMById("btn-saveQuotation").disabled = false;
    DOMById("btn-newQuotation").disabled = false;
  }, 1000); // delay ficticio
}

// Comprobación de cotizaciones anteriores al cargar la página
if (getFromSession("newQuotation") === null) {
  // Establecer newQuotation true porque se inicia una nueva cotización
  // De esta forma la nueva va a quedar almacenada en el historial (sessionStorage)
  setToSession("newQuotation", true);
}
if (getFromSession("isEditing") === null) {
  // Establecer isEditing false, si fuera true significa que se cargó desde las guardadas
  setToSession("isEditing", false);
}
// Recuperar historial de la sesión
renderQuotationsList(false, false);
// Recuperar el historial guardado
renderQuotationsList(false, true);
// Recuperar ultima cotización
restoreLastQutation();
