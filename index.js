// eslint-disable-next-line no-undef
const http = require("http");

const tasks = [
  { id: 1, description: "Hacer ejercicio", completed: false },
  { id: 2, description: "Comprar comida", completed: true },
  { id: 3, description: "Estudiar para el examen", completed: false },
];

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/tasks")
    if (req.url === "/tasks") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(tasks));
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Página no encontrada");
    }
});
const port = 3000;
server.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
