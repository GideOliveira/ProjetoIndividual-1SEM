var express = require("express");
var router = express.Router();

// requisicao nas funcoes da controller usuario
var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.post("/cadastrar", function (req, res) { // pega os itens recebidos no cadastro.html, e manda pra função cadastrar no controllers
    usuarioController.cadastrar(req, res);
})

router.post("/entrar", function (req, res) {
    usuarioController.entrar(req, res);
});

module.exports = router;