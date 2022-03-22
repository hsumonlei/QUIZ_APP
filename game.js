const question = document.getElementById("question");

console.log(document.getElementsByClassName("choice-text"));
console.log("Return Values");

const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById('score');


var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questions = [
    {
            question: "What does HTML stand for??",
            choice1: "<Hyperlinks and Text Markup Language>",
            choice2: "<Hyper Text Markup Language>",
            choice3: "<Home Tool Markup Language>",
            choice4: "<Home Page and Preprocessor Language>",
            answer: 2
        },
    {       question: "Inside which HTML element do we put the JavaScript??",
            choice1: "<script>",
            choice2: "<js>",
            choice3: "<javascript>",
            choice4: "<scripting>",
            answer: 1
},
{
            question: "Where is the correct place to insert a JavaScript??",
            choice1: "The <head> section",
            choice2: "The <body> section",
            choice3: "Both the <head> section and the <body> section are correct",
            choice4: "None of them",
            answer: 3
},
{           question: "What is the correct syntax for referring to an external script called 'xxx.js'??",
            choice1: "<script href='xxx.js'>",
            choice2: "<script src='xxx.js'>",
            choice3: "<script name='xxx.js'>",
            choice4: "None of them",
            answer: 2
},
{
            question: "The external JavaScript file must contain the <script> tag.",
            choice1: "False",
            choice2: "True",
            choice3: "None of them",
            choice4: "Both of them",
            answer: 1
},
{           question: "How do you write 'Hello World' in an alert box??",
            choice1: "alertBox('Hello World')",
            choice2: "msg('Hello World')",
            choice3: "msgBox('Hello World')",
            choice4: "alert('Hello World')",
            answer: 4
},
{
            question: "How do you create a function in JavaScript??",
            choice1: "function myFunction()  ",
            choice2: "function = myFunction()",
            choice3: "function:myFunction()",
            choice4: "call myFunction()",
            answer: 1
},
{           question: "How can you add a comment in a JavaScript??",
            choice1: "<!--This is a comment-->  ",
            choice2: "//This is a comment  ",
            choice3: "'This is a comment",
            choice4: "None of them",
            answer: 2
},
]

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        //go to the end page
        return window.location.assign("/end.html");

    }

    questionCounter++;

    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach ( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion ['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return ;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        
        const classToApply = 
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        
            if(classToApply === 'correct') {
                incrementScore(CORRECT_BONUS);
            }
        
        selectedChoice.parentElement.classList.add(classToApply);


        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);  
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};


startGame();



