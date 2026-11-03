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

    const textoTareaElemento = document.createElement("span");
    textoTareaElemento.textContent = textoTarea;

    const botonCompletar = document.createElement("button");
    botonCompletar.type = "button";
    botonCompletar.textContent = "Marcar como completada";
    botonCompletar.setAttribute("aria-pressed", "false");

    botonCompletar.addEventListener("click", function () {
        const estaCompletada =
            nuevaTarea.classList.toggle("completada");

        botonCompletar.setAttribute(
            "aria-pressed",
            String(estaCompletada)
        );

        botonCompletar.textContent = estaCompletada
            ? "Marcar como pendiente"
            : "Marcar como completada";
    });

    nuevaTarea.appendChild(textoTareaElemento);
    nuevaTarea.appendChild(botonCompletar);
    listaTareas.appendChild(nuevaTarea);

    campoNuevaTarea.value = "";
    campoNuevaTarea.focus();
});
