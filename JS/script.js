// Recuperar personajes
let personajes = JSON.parse(localStorage.getItem("personajes")) || [];

// DOM
const form = document.getElementById("formPersonaje");
const lista = document.getElementById("listaPersonajes");

// Mostrar personajes
function renderizarPersonajes() {
  lista.innerHTML = "";

  personajes.forEach((p, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${p.nombre}</strong> - ${p.clase} - Nivel: ${p.nivel}
      <br>"${p.frase}"
      <br>${p.esMain ? "🌟 Personaje principal 🌟" : "📦 Personaje de relleno"}
      <br><button onclick="eliminarPersonaje(${index})">Eliminar</button>
    `;
    lista.appendChild(li);
  });
}

// Eliminar personaje
function eliminarPersonaje(index) {
  personajes.splice(index, 1);
  localStorage.setItem("personajes", JSON.stringify(personajes));
  renderizarPersonajes();
}

// Crear personaje
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevoPersonaje = {
    nombre: document.getElementById("nombre").value,
    clase: document.getElementById("clase").value,
    nivel: document.getElementById("nivel").value,
    frase: document.getElementById("frase").value,
    esMain: document.getElementById("esMain").checked
  };

  personajes.push(nuevoPersonaje);
  localStorage.setItem("personajes", JSON.stringify(personajes));

  form.reset();
  renderizarPersonajes();
});

// Mostrar al cargar
renderizarPersonajes();
