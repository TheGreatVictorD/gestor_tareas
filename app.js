const formulario = document.querySelector("#formulario-tarea");
const campoNuevaTarea = document.querySelector("#nueva-tarea");
const listaTareas = document.querySelector("#lista-tareas");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const textoTarea = campoNuevaTarea.value.trim();

    if (textoTarea === "") {
        return;
    }

    const nuevaTarea = document.createElement("li");
    nuevaTarea.textContent = textoTarea;

    listaTareas.appendChild(nuevaTarea);

    campoNuevaTarea.value = "";
    campoNuevaTarea.focus();
});
