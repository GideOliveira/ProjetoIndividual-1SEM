function cadastrar() {
    var nomeVar = input_nome.value;
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;
    var erro1 = true;
    var confirmacaoSenhaVar = input_confSenha.value;


    if (nomeVar == "" || emailVar == "" || senhaVar == "" || confirmacaoSenhaVar == "" ) {
        mensagem_erro.innerHTML = "Preencha todos os campos para se cadastrar!";
      return;
    } else if (senhaVar != confirmacaoSenhaVar) {
      mensagem_erro.innerHTML = "Senhas diferentes!";
      return;
    } else if (!emailVar.includes("@")) {
      mensagem_erro.innerHTML = "Insira um e-mail válido!";
      return;
    } else if (senhaVar.length < 4) {
      mensagem_erro.innerHTML = "Senha deve contém 4 ou mais caracteres!";
      return;
    } 
    else{
      mensagem_erro.innerHTML = "Cadastro feito com sucesso";
    }
    
    fetch("/usuarios/cadastrar", { 
      method: "POST",// metodo post ele insere no bd
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ // manda o json pro usuarios cadastrar que é um endpoint
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);
        

        if (resposta.ok) {
          setTimeout(() => {
            window.location = "login.html";
          }, "2000");

        } else {

          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      }); 

    return false;
    }