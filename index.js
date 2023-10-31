const questions = [
    {
        question: 'What is the Nation Animal of India?',
        options:[
            {text: 'Tiger', check: true},
            {text: 'Lion', check: false},
            {text: 'Elephant', check: false},
            {text: 'Cheeta', check: false},
        ]
    },
    {
        question: 'What is the Nation Bird of India?',
        options:[
            {text: 'Pigeon', check: false},
            {text: 'Crow', check: false},
            {text: 'Peacock', check: true},
            {text: 'Sparrow', check: false},
        ]
    },
];

const questionElement = document.getElementById('question-field');
const optionButton = document.getElementById('options-btn');
const nextButton = document.getElementById('next-btn');

let questionIndex = 0;
let score = 0;

function startQuiz(){
    questionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestions();
}

function showQuestions(){
    resetQues();
    let currentQuestion = questions[questionIndex];
    let questionNo = questionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerHTML = option.text;
        button.classList.add('btn');
        optionButton.appendChild(button);
        if(option.check){
            button.dataset.check = option.check;
        }
        button.addEventListener('click', selectOption);
    });
}

function resetQues(){
    nextButton.style.display = 'none';
    while(optionButton.firstChild){
        optionButton.removeChild(optionButton.firstChild);
    }
}

function selectOption(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.check == 'true';
    if(isCorrect){
        selectedbtn.classList.add('correct');
        score++;
    } else{
        selectedbtn.classList.add('incorrect');
    }
    Array.from(optionButton.children).forEach(button =>{
        if(button.dataset.check === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore(){
    resetQues();
    questionElement.innerHTML = 'Your Score ' + score + ' out of ' + questions.length;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextBtn(){
    questionIndex++;
    if(questionIndex < questions.length){
        showQuestions();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click', ()=>{
    if(questionIndex < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
})

startQuiz();