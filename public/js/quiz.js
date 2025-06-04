const questions = [
    {
        question: "O que significa MPIF?",
        answers: [
            { id: 1, text: "Meninas Perigosas e Incrivelmente Focadas", correct: false },
            { id: 2, text: "Mulher Preta Independente de Favela", correct: true },
            { id: 3, text: "Meninas Poderosas Independente de Favela", correct: false },
            { id: 4, text: "Mulheres Periféricas Inspirando Futuro", correct: false },
        ]
    },
    {
        question: "De onde Tasha e Tracie são?",
        answers: [
            { id: 1, text: "Curitiba, PR", correct: false },
            { id: 2, text: "Rio de Janeiro, RJ", correct: false },
            { id: 3, text: "Fortaleza, CE", correct: false },
            { id: 4, text: "São Paulo, SP", correct: true },
        ]
    },
    {
        question: "Qual o parentesco de Tasha e Tracie?",
        answers: [
            { id: 1, text: "Primas", correct: false },
            { id: 2, text: "Amigas", correct: false },
            { id: 3, text: "Irmãs Gêmeas", correct: true },
            { id: 4, text: "Mãe e filha", correct: false },
        ]
    },
    {
        question: "Qual é a frase das gêmeas?",
        answers: [
            { id: 1, text: "Fé em Deus que ele é justo", correct: false },
            { id: 2, text: "Tudo dá certo pra mim, até quando não foi como eu quis", correct: true },
            { id: 3, text: "Eu só confio em mim, mais ninguém, cê me entende!", correct: false },
            { id: 4, text: "Humanidade é má, e até Jesus Chorou", correct: false },
        ]
    },
    {
        question: "O que é ROUFFERS?",
        answers: [
            { id: 1, text: "Os fãs das gêmeas", correct: true },
            { id: 2, text: "Os amigos das gêmeas", correct: false },
            { id: 3, text: "A mãe das gêmeas", correct: false },
            { id: 4, text: "O pai das gêmeas", correct: false },
        ]
    },
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

var currentQuestionIndex = 0;
var score = 0;

function ComecarQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próxima";
    mostrarQuestao();
}

function redefinirEstado() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function mostrarQuestao() {
    redefinirEstado();
    var currentQuestion = questions[currentQuestionIndex];
    var questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.dataset.id = answer.id;
        button.classList.add("btn");
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    })
}

function selectAnswer(e) {
    answers = questions[currentQuestionIndex].answers;
    const correctAnswer = answers.filter((answer) => answer.correct == true)[0];

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.id == correctAnswer.id;
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.id == correctAnswer.id) {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    redefinirEstado();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length}`;
    nextButton.innerHTML = "Jogue novamente";
    nextButton.style.display = "block"; 
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        mostrarQuestao();
    } else {
        showScore();
        finalizar();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        ComecarQuiz();
    }
})

function finalizar() {
    var idUsuario = sessionStorage.ID;
    var idQuiz = 1;
    fetch("/quiz/finalizar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                scoreServer: score,
                idUsuarioServer: idUsuario,
                idQuizServer: idQuiz
            })
        }).then(function (resposta) {
            console.log("Inserindo dados no quiz!")

            if (resposta.ok) {
                console.log(resposta);

            } else {

                console.log("Houve um erro ao tentar guardar informaçôes do quiz!");

                resposta.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })
}

ComecarQuiz();