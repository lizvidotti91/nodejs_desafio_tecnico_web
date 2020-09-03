// Chamada do Express
const express = require("express");

// Chamada do Mongo DB
const mongoose = require("mongoose");
require("dotenv").config();

// Instanciar a aplicação na constante app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usando o mongoose para criar uma conexão com o Atlas, através da variável DATABASE_CONNECTION_STRING
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true,
});

// Recuperando a instância do mongoose para manipular o que acontece em alguns momentos
const db = mongoose.connection;

// Conexão com o banco de dados
db.on("connected", () => {
    console.log("Mongoose default connection is open");
});

// Conexão apresenta erro
db.on("error", (err) => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

// Desconectado
db.on("disconnected", () => {
    console.log("Mongoose default connection is disconnected");
});

// Usuário mata o processo do Node.js
process.on("SIGINT", () => {
    db.close(() => {
        console.log(
            "Mongoose default connection is disconnected due to application termination"
        );
        process.exit(0);
    });
});

// Importando o modelo do Schema
const Mentions = require("./models/mentions");

// Chamada da primeira rota
const indexRoutes = require("./routes/index-routes");
app.use("/", indexRoutes);

// Chamadas das rotas criadas em mentions-controller
const mentionsRoutes = require("./routes/mentions-routes");
const {
    createUser,
    showUser,
    addToLine,
    showLine,
    popLine,
    deleteUser,
    findPosition,
    filterLine,
} = require("./controllers/mentions-controller");

app.use("/createUser", createUser);
app.use("/showUser", showUser);
app.use("/addToLine", addToLine);
app.use("/findPosition", findPosition);
app.use("/showLine", showLine);
app.use("/filterLine", filterLine);
app.use("/popLine", popLine);
app.use("/deleteUser", deleteUser);

module.exports = app;
