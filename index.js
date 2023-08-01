// eslint-disable-next-line no-undef
const readline = require("readline");
// eslint-disable-next-line no-undef
const fs = require("fs");

const rl = readline.createInterface({
  // eslint-disable-next-line no-undef
  input: process.stdin,

  // eslint-disable-next-line no-undef
  output: process.stdout,
});

let tasks = [];

function saveTasks() {
  fs.writeFileSync("./tasks.json", JSON.stringify(tasks, null, 2), "utf8");
}

function loadTasks() {
  try {
    const data = fs.readFileSync("./tasks.json", "utf8");
    tasks = JSON.parse(data);
  } catch (err) {
    tasks = [];
  }
}

function addTask(indicador, descripcion) {
  tasks.push({ indicador, descripcion, completada: false });
  saveTasks();
  console.log("Tarea añadida.");
}

function deleteTask(indicador) {
  tasks = tasks.filter((task) => task.indicador !== indicador);
  saveTasks();
  console.log("Tarea eliminada.");
}

function completeTask(indicador) {
  const task = tasks.find((task) => task.indicador === indicador);
  if (task) {
    task.completada = true;
    saveTasks();
    console.log("Tarea completada.");
  } else {
    console.log("Tarea no encontrada.");
  }
}

function showTasks() {
  console.log("Lista de tareas:");
  tasks.forEach((task) => {
    const estado = task.completada ? "[X]" : "[ ]";
    console.log(`${estado} ${task.indicador}: ${task.descripcion}`);
  });
}

function askForAction() {
  rl.question(
    "\n¿Qué acción deseas realizar? (añadir, eliminar, completar, mostrar, salir): ",
    (answer) => {
      if (answer === "salir") {
        rl.close();
        return;
      }

      switch (answer) {
        case "añadir":
          rl.question("Indicador de la tarea: ", (indicador) => {
            rl.question("Descripción de la tarea: ", (descripcion) => {
              addTask(indicador, descripcion);
              askForAction();
            });
          });
          break;
        case "eliminar":
          rl.question("Indicador de la tarea a eliminar: ", (indicador) => {
            deleteTask(indicador);
            askForAction();
          });
          break;
        case "completar":
          rl.question("Indicador de la tarea a completar: ", (indicador) => {
            completeTask(indicador);
            askForAction();
          });
          break;
        case "mostrar":
          showTasks();
          askForAction();
          break;
        default:
          console.log("Acción no válida. Intenta de nuevo.");
          askForAction();
          break;
      }
    }
  );
}

// Cargar tareas al iniciar el programa
loadTasks();

// Ejecutamos la función para preguntar por la acción inicial
askForAction();
