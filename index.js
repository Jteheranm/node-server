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
  return new Promise((resolve, reject) => {
    if (!indicador || !descripcion) {
      reject(new Error("El indicador y la descripción son obligatorios."));
      return;
    }

    tasks.push({ indicador, descripcion, completada: false });
    saveTasks();
    resolve("Tarea añadida.");
  });
}

function deleteTask(indicador) {
  return new Promise((resolve, reject) => {
    const taskIndex = tasks.findIndex((task) => task.indicador === indicador);
    if (taskIndex === -1) {
      reject(new Error("Tarea no encontrada."));
      return;
    }

    tasks.splice(taskIndex, 1);
    saveTasks();
    resolve("Tarea eliminada.");
  });
}
function completeTask(indicador) {
  return new Promise((resolve, reject) => {
    const task = tasks.find((task) => task.indicador === indicador);
    if (task) {
      task.completada = true;
      saveTasks();
      resolve("Tarea completada.");
    } else {
      reject(new Error("Tarea no encontrada."));
    }
  });
}

function showTasks() {
  console.log("Lista de tareas:");
  tasks.forEach((task) => {
    const estado = task.completada ? "[X]" : "[ ]";
    console.log(`${estado} ${task.indicador}: ${task.descripcion}`);
  });
}

async function askForAction() {
  rl.question(
    "\n¿Qué acción deseas realizar? (añadir, eliminar, completar, mostrar, salir): ",
    (answer) => {
      if (answer === "salir") {
        rl.close();
        return;
      }

      switch (answer) {
        case "añadir":
          rl.question("Indicador de la tarea: ", async (indicador) => {
            rl.question("Descripción de la tarea: ", async (descripcion) => {
              try {
                const result = await addTask(indicador, descripcion);
                console.log(result);
              } catch (error) {
                console.error(error.message);
              }
              askForAction();
            });
          });
          break;
        case "eliminar":
          rl.question(
            "Indicador de la tarea a eliminar: ",
            async (indicador) => {
              try {
                const result = await deleteTask(indicador);
                console.log(result);
              } catch (error) {
                console.error(error.message);
              }
              askForAction();
            }
          );
          break;
        case "completar":
          rl.question(
            "Indicador de la tarea a completar: ",
            async (indicador) => {
              try {
                const result = await completeTask(indicador);
                console.log(result);
              } catch (error) {
                console.error(error.message);
              }
              askForAction();
            }
          );
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

// cargar tareas
loadTasks();

// ejecutar la funcion para preguntar por la acción inicial
askForAction();
