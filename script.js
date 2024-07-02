const questions = [
    {
        question : "The full form of CSS is",
        answers : [
            {text : "Cascading Style Sheets", Correct:true},
            {text : "Coloured Special Sheets", Correct:false},
            {text : "Color and Style Sheets", Correct:false},
            {text : "None of the above", Correct:false},
        ]
    },
    {
        question : "How can we change the background color of an element?",
        answers : [
            {text : "background-color", Correct:true},
            {text : "color", Correct:false},
            {text : "Both A & B", Correct:false},
            {text : "None of the above", Correct:false},
        ]
    },
    {
        question : "How can we change the text color of an element?",
        answers : [
            {text : "color", Correct:true},
            {text : "background-color", Correct:false},
            {text : "Both A & B", Correct:false},
            {text : "None of the above", Correct:false},
        ]
    },
    {
        question : "In how many ways can CSS be written in?",
        answers : [
            {text : "3", Correct:true},
            {text : "1", Correct:false},
            {text : "2", Correct:false},
            {text : "None of the above", Correct:false},
        ]
    },
    {
        question : "What type of CSS is generally recommended for designing large web pages?",
        answers : [
            {text : "External", Correct:true},
            {text : "Internal", Correct:false},
            {text : "Inline", Correct:false},
            {text : "None of the above", Correct:false},
        ]
    }
];

const questionsElement = document.getElementById("question");
const answerButtons = document.getElementById("ans-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionsElement.innerHTML = questionNo +"."+currentQuestion.question;

    currentQuestion.answers.forEach(answers =>{
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answers.Correct) {
            button.dataset.Correct = answers.Correct;
        }
        button.addEventListener('click',selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.Correct === "true";
    if(isCorrect){
            selectBtn.classList.add("correct");
            score++;
    }else{
            selectBtn.classList.add("incorret");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.Correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showResult(){
    resetState();
    questionsElement.innerHTML =   `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestions();
    }
    else{
        showResult();
    }
}
nextButton.addEventListener("click", () =>{
    if (currentQuestionIndex<questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})
startQuiz();