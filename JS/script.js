// Recuperar personajes
let personajes = JSON.parse(localStorage.getItem("personajes")) || [];

// DOM
const form = document.getElementById("formPersonaje");
const lista = document.getElementById("listaPersonajes");
const filtro = document.getElementById("filtroClase");
const borrarTodoBtn = document.getElementById("borrarTodo");
const toggleTemaBtn = document.getElementById("toggleTema");

// Mostrar personajes
function renderizarPersonajes(filtroClase = "todos") {
  lista.innerHTML = "";

  personajes
    .filter(p => filtroClase === "todos" || p.clase === filtroClase)
    .forEach((p, index) => {
      const li = document.createElement("li");

      const emoji = {
        "Guerrero/a": "⚔️",
        "Mago/a": "🔮",
        "Asesino/a": "🐍",
        "Soporte": "❤️"
      }[p.clase] || "✨";

      let estrellas = "";
      if (p.nivel <= 30) estrellas = "⭐";
      else if (p.nivel <= 70) estrellas = "⭐⭐";
      else estrellas = "⭐⭐⭐";

      li.innerHTML = `
        ${emoji} <strong>${p.nombre}</strong> - ${p.clase} - Nivel: ${p.nivel} ${estrellas}<br>
        "${p.frase}"<br>
        ${p.esMain ? "🌟 Personaje principal" : "📦 Personaje de relleno"}<br>
        <button onclick="eliminarPersonaje(${index})">Eliminar</button>
      `;
      lista.appendChild(li);
    });
}

function eliminarPersonaje(index) {
  personajes.splice(index, 1);
  localStorage.setItem("personajes", JSON.stringify(personajes));
  renderizarPersonajes(filtro.value);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevoPersonaje = {
    nombre: document.getElementById("nombre").value,
    clase: document.getElementById("clase").value,
    nivel: parseInt(document.getElementById("nivel").value),
    frase: document.getElementById("frase").value,
    esMain: document.getElementById("esMain").checked
  };

  personajes.push(nuevoPersonaje);
  localStorage.setItem("personajes", JSON.stringify(personajes));

  form.reset();
  renderizarPersonajes(filtro.value);
});

filtro.addEventListener("change", () => {
  renderizarPersonajes(filtro.value);
});

borrarTodoBtn.addEventListener("click", () => {
  personajes = [];
  localStorage.removeItem("personajes");
  renderizarPersonajes();
});

toggleTemaBtn.addEventListener("click", () => {
  document.body.classList.toggle("tema-claro");
});

// Mostrar al  cargar
renderizarPersonajes();
