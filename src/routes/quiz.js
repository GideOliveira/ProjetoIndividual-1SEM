var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/cadastrarDadosQuiz", function (req, res) {
    quizController.cadastrarDadosQuiz(req, res);
});

router.get("/exibirQtdUserQuiz", function (req, res) {
    quizController.exibirQtdUserQuiz(req, res);
})

router.get("/exibirQtdUserQuiz2/:usuario", function (req, res) {
    quizController.exibirQtdUserQuiz2(req, res);
})

router.get("/exibirQtdUserQuiz3/:usuario", function (req, res) {
    quizController.exibirQtdUserQuiz3(req, res);
})

router.post("/finalizar", function (req, res) {
    quizController.finalizar(req, res);
})

module.exports = router;