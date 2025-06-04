document.addEventListener('DOMContentLoaded',()=> {
    fetch("/quiz/exibirQtdUserQuiz", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },

    }).then((resposta) => {
        if (resposta.ok) {
            console.log(resposta)
            resposta.json().then((qtdUserQuiz) => {
                conteudoQtdUsuario.innerHTML = 
                `
                <span id="numeroUsuario">${qtdUserQuiz[0].quantidadeUsuario}</span>
                <span class="subtituloUsuario">Usuários</span>
                `
            })
        } else {
            console.log('Deu erro no then')
        }
    })
})