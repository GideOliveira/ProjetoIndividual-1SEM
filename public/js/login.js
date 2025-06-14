function entrar() {
        var emailVar = input_email.value;
        var senhaVar = input_senha.value;

        if (emailVar == "" || senhaVar == "") {
            mensagem_erro.innerHTML = "Preencha os campos!";

            return false;
        } 

        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);

        fetch("/usuarios/entrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.EMAIL = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID = json.id;
                    setTimeout(function () {
                        window.location = "pagQuiz.html"; // caminho para o arquivo do quiz
                    }, 1000); // apenas para exibir o loading

                });

            } else {

                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
}