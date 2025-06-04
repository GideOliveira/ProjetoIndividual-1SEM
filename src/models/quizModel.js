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

function exibirQtdUserRanking() {
    var instrucao = `
    SELECT COUNT(DISTINCT fkUsuario) as quantidadeUsuario FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    exibirQtdUserRanking,
    finalizar
};