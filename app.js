const formulario = document.querySelector("#formulario-tarea");
const campoNuevaTarea = document.querySelector("#nueva-tarea");
const listaTareas = document.querySelector("#lista-tareas");

const CLAVE_TAREAS = "tareas";

let tareas = cargarTareas();

function cargarTareas() {
    const tareasGuardadas = localStorage.getItem(CLAVE_TAREAS);

    if (tareasGuardadas === null) {
        return [];
    }

    try {
        const datos = JSON.parse(tareasGuardadas);

        if (!Array.isArray(datos)) {
            return [];
        }

        return datos
            .filter(function (tarea) {
                return (
                    tarea !== null &&
                    typeof tarea === "object" &&
                    typeof tarea.texto === "string" &&
                    tarea.texto.trim() !== ""
                );
            })
            .map(function (tarea) {
                return {
                    texto: tarea.texto.trim(),
                    completada: tarea.completada === true
                };
            });
    } catch {
        return [];
    }
}

function guardarTareas() {
    localStorage.setItem(
        CLAVE_TAREAS,
        JSON.stringify(tareas)
    );
}

function eliminarTarea(posicion) {
    tareas.splice(posicion, 1);

    guardarTareas();
    mostrarTareas();
}

function crearElementoTarea(tarea, posicion) {
    const nuevaTarea = document.createElement("li");

    const textoTareaElemento = document.createElement("span");
    textoTareaElemento.textContent = tarea.texto;

    const botonCompletar = document.createElement("button");
    botonCompletar.type = "button";
    botonCompletar.textContent = "Marcar como completada";
    botonCompletar.setAttribute(
        "aria-pressed",
        String(tarea.completada)
    );

    if (tarea.completada) {
        nuevaTarea.classList.add("completada");
    }

    botonCompletar.addEventListener("click", function () {
        tareas[posicion].completada =
            !tareas[posicion].completada;

        nuevaTarea.classList.toggle(
            "completada",
            tareas[posicion].completada
        );

        botonCompletar.setAttribute(
            "aria-pressed",
            String(tareas[posicion].completada)
        );

        guardarTareas();
    });

    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("boton-eliminar");
    botonEliminar.setAttribute(
        "aria-label",
        `Eliminar tarea: ${tarea.texto}`
    );

    botonEliminar.addEventListener("click", function () {
        eliminarTarea(posicion);
    });

    nuevaTarea.appendChild(textoTareaElemento);
    nuevaTarea.appendChild(botonCompletar);
    nuevaTarea.appendChild(botonEliminar);

    return nuevaTarea;
}

function mostrarTareas() {
    listaTareas.innerHTML = "";

    tareas.forEach(function (tarea, posicion) {
        const elementoTarea =
            crearElementoTarea(tarea, posicion);

        listaTareas.appendChild(elementoTarea);
    });
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const textoTarea = campoNuevaTarea.value.trim();

    if (textoTarea === "") {
        return;
    }

    const nuevaTarea = {
        texto: textoTarea,
        completada: false
    };

    tareas.push(nuevaTarea);

    guardarTareas();
    mostrarTareas();

    campoNuevaTarea.value = "";
    campoNuevaTarea.focus();
});

mostrarTareas();
