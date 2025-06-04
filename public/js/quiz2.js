const questions = [
    {
        question: "Quando o EP 'Rouff' foi lançado?",
        answers: [
            { id: 1, text: "2017", correct: false },
            { id: 2, text: "2018", correct: false },
            { id: 3, text: "2019", correct: true },
            { id: 4, text: "2020", correct: false },
        ]
    },
    {
        question: "Quando as gêmeas nasceram?",
        answers: [
            { id: 1, text: "5 de junho de 1995", correct: false },
            { id: 2, text: "10 de junho de 1995", correct: false },
            { id: 3, text: "15 de junho de 1995", correct: true },
            { id: 4, text: "10 de julho de 1995", correct: false },
        ]
    },
    {
        question: "Elas começaram...",
        answers: [
            { id: 1, text: "como dançarinas no Faustão", correct: false },
            { id: 2, text: "com o programa 'Altas Horas'", correct: false },
            { id: 3, text: "com as atuações em novelas", correct: false },
            { id: 4, text: "com o blog 'Expensive Shit'", correct: true },
        ]
    },
    {
        question: "'Minha estrela brilha quando você surta' é de qual música?",
        answers: [
            { id: 1, text: "As Mais Brabas", correct: false },
            { id: 2, text: "Agoro", correct: true },
            { id: 3, text: "Yvonne Fair", correct: false },
            { id: 4, text: "Flo Jo", correct: false },
        ]
    },
    {
        question: "'Não me acho menor que ninguém, mas também não vejo ninguém maior que eu' é de qual música?",
        answers: [
            { id: 1, text: "As Mais Brabas", correct: false },
            { id: 2, text: "Agoro", correct: true },
            { id: 3, text: "Yvonne Fair", correct: false },
            { id: 4, text: "Flo Jo", correct: false },
        ]
    },
];

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
    var idQuiz = 2;
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