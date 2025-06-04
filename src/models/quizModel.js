var database = require("../database/config")

function finalizar(score, idUsuario, idQuiz) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucaoSql = `
      INSERT INTO tentativa VALUES ( default, ${idQuiz}, ${idUsuario}, ${score}, default);

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql

function exibirQtdUserQuiz() {
    var instrucao = `
    SELECT COUNT(DISTINCT id) as quantidadeUsuario FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirQtdUserQuiz2(idUsuario) {
    var instrucao = `
    SELECT SUM(acertos), COUNT(tentativa.id) FROM tentativa JOIN usuario on fkUsuario = usuario.id JOIN quiz ON 
    fkQuiz = quiz.id WHERE usuario.id = ${idUsuario} AND fkQuiz = 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirQtdUserQuiz3(idUsuario) {
    var instrucao = `
    SELECT SUM(acertos), COUNT(tentativa.id) FROM tentativa JOIN usuario on fkUsuario = usuario.id JOIN quiz ON 
    fkQuiz = quiz.id WHERE usuario.id = ${idUsuario} AND fkQuiz = 2;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    exibirQtdUserQuiz,
    exibirQtdUserQuiz2,
    exibirQtdUserQuiz3,
    finalizar
};