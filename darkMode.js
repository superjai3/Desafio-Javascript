//Dark Mode
let btnDarkMode = document.getElementById("botonDarkMode");
let btnLightMode = document.getElementById("botonLightMode");
let modoOscuro;

//Condicional que evalua si EXISTE ALGO O NO EN EL STORAGE
if (localStorage.getItem("darkMode")) {
  modoOscuro = localStorage.getItem("darkMode");
} else {
  console.log("Entro por primera vez");
  localStorage.setItem("darkMode", false);
}
console.log(modoOscuro);

//Condicional que evalua variable
if (modoOscuro == "true") {
  //OTRA MANERA DE HACERLO con clases CSS
  document.body.classList.add("darkMode");
} else {
  //OTRA MANERA DE HACERLO con clases CSS
  document.body.classList.remove("darkMode");
}
//Eventos btnDarkMode
btnDarkMode.addEventListener("click", () => {
  console.log("Funciona boton oscuro");

  document.body.classList.add("darkMode");
  localStorage.setItem("darkMode", true);
});
btnLightMode.addEventListener("click", () => {
  console.log("Funciona boton claro");

  document.body.classList.remove("darkMode");
  localStorage.setItem("darkMode", false);
});
