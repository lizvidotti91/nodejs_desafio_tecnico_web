// Importando o Express
const express = require("express");

// Instanciando o Router
const router = express.Router();

// Importando o controle de mentions
const mentionsController = require("../controllers/mentions-controller");

// Criando as rotas
// Cadastrar usuário
router.post("/createUser", (req, res) => {
    mentionsController.createUser(req, res);
});
// Mostrar usuários cadastrados
router.get("/showUser", (req, res) => {
    mentionsController.showUser(req, res);
});

router.post("/addToLine", (req, res) => {
    mentionsController.addToLine(req, res);
});

router.post("/findPosition", (req, res) => {
    mentionsController.findPosition(req, res);
});

router.post("/filterLine", (req, res) => {
    mentionsController.filterLine(req, res);
});

router.get("/showLine", (req, res) => {
    mentionsController.showLine(req, res);
});

router.delete("/popLine", (req, res) => {
    mentionsController.popLine(req, res);
});

router.delete("/deleteUser", (req, res) => {
    mentionsController.deleteUser(req, res);
});

module.exports = router;
