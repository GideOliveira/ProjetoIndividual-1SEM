
function calcular() {
    var qtdMusica = Number(input_qtdMusica.value);
    var contrDia = 0.0226 * qtdMusica;
    var contrMes = contrDia * 30;
    div_mensagem.innerHTML = "";

    if (qtdMusica == "") {
        div_mensagem.innerHTML = "Insira a quantidade de músicas!"
    } else if (qtdMusica < 0) {
        div_mensagem.innerHTML = "Insira uma quantidade válida!"
    } else {

        div_mensagem.innerHTML = `
        Em média, cada música tem 3 minutos. Com isso, você ouve <strong>${qtdMusica * 3} minutos</strong> por dia.<br>
        O Spotify paga R$0,0226 por play, ou seja, você contribui para as gêmeas em <strong>R$${contrDia.toFixed(2)}</strong> por dia.<br>
        Por volta de <strong>R$${contrMes.toFixed(2)}</strong> no mês.
        `
        
    }

}