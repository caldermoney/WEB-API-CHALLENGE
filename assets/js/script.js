const startButton = document.querySelector('.quiz-intro');
const innerContainer = document.querySelector('.inner-container');
const mainElement = document.querySelector('main');
const finishScreen = document.querySelector('.quiz-finish-screen');
var timerDisplay = document.querySelector('.top-bar p');
let secondsLeft = 5;
var countdown;
let currentQuestionIndex = 0;
let selectedAnswer = null;

const quizQuestions = [
    {
      question: "What is my Name?",
      options: ["Jose", "Adolfo", "Marcelo", "Adrian"],
      correctAnswer: 2 // index of the correct option
    },
    {
      question: "What is my age?",
      options: ["22", "27", "32", "45"],
      correctAnswer: 2, // index of the correct option
    },
    // Add more questions...
    {
        question: "What is my rate?",
        options: ["22", "27", "32", "45"],
        correctAnswer: 2 // index of the correct option
      },
      {
        question: "What is my strenght?",
        options: ["22", "27", "32", "45"],
        correctAnswer: 2 // index of the correct option
      },
  ];


mainElement.style.display = 'none';

function startTimer() {
    countdown = setInterval(function() {
        var seconds = secondsLeft % 5;
        timerDisplay.textContent = 'Timer 0:' + seconds.toString().padStart(2,'0');
        secondsLeft--;

        if (secondsLeft < 0) {
            clearInterval(countdown);
            timerDisplay.textContent = 'Timer 0:00';
        }
    }, 1000);
}

function displayQuestions() {
    const questionsSection = document.querySelector('.questions-screens');
    const firstQuestion = quizQuestions[0];
  
    // Create question element
    const questionElement = document.createElement('h2');
    questionElement.textContent = firstQuestion.question;
    questionsSection.appendChild(questionElement);
  
    // Create answer options list
    const answerList = document.createElement('ul');
    firstQuestion.options.forEach((option, index) => {
      const answerItem = document.createElement('li');
      const answerButton = document.createElement('button');
      answerButton.textContent = option;
      answerButton.addEventListener('click', () => {
        selectedAnswer = index;
        // Add your logic for checking the selected answer
        // and navigating to the next question or finish screen
      });
      answerItem.appendChild(answerButton);
      answerList.appendChild(answerItem);
    });
    questionsSection.appendChild(answerList);
  }
  
  
  startButton.addEventListener('click', function() {
    startButton.style.display = 'none';
    mainElement.style.display = 'block';
    finishScreen.style.display = 'none';
    startTimer();
    displayQuestions();
});
