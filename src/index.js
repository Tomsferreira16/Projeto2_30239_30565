require("dotenv").config(); // Configurar as Variáveis Ambiente
const cors = require("cors"); // Buscar o pacote "cors"
const morgan = require("morgan"); // Buscar o pacote "morgan"
const express = require("express"); // Buscar o pacote "express"
const cookieParser = require("cookie-parser"); // Buscar o pacote "cookie-parser"
const router = require("./router/router"); // Buscar o ficheiro "router.js"

const app = express(); // Inicialização da aplicação express

app.use(express.json()); // Receber e enviar dados em formato JSON
app.use(cookieParser()); // Utilizar o cookie-parser na aplicação express
app.use(morgan("tiny")); // Utilizar o morgan na aplicação express
app.use(cors()); // Utilizar o cors na aplicação express

app.use(router);

const port = process.env.SERVER_PORT || 3000; // Buscar "SERVER_PORT" ao ficheiro .env ou utiliza a 3000 por predefinição

// Iniciar o Servidor Express na porta
app.listen(port, () => {
  console.log(`Server open at: http://localhost:${port}`);
});
