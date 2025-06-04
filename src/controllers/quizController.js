var quizModel = require("../models/quizModel");

var sessoes = [];

function exibirQtdUserQuiz(req, res) {
        
    quizModel.exibirQtdUserQuiz()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
    );
}

function exibirQtdUserQuiz2(req, res) {
        var idUsuario = req.params.usuario;

    quizModel.exibirQtdUserQuiz2(idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
    );
}

function exibirQtdUserQuiz3(req, res) {
        var idUsuario = req.params.usuario;

    quizModel.exibirQtdUserQuiz3(idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
    );
}

function finalizar(req, res) {
        var score = req.body.scoreServer
        var idUsuario = req.body.idUsuarioServer
        var idQuiz = req.body.idQuizServer
    quizModel.finalizar(score, idUsuario, idQuiz)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao tentar inserir os dados do quiz! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
    );
}



module.exports = {
    exibirQtdUserQuiz,
    exibirQtdUserQuiz2,
    exibirQtdUserQuiz3,
    finalizar
}
