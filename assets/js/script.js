// Get the quiz introduction element which likely contains the start button
const startButton = document.querySelector('.quiz-intro');

// Get the finish screen element (probably displayed after the quiz is done)
const finishScreen = document.querySelector('.finish-screen');

const highScores = document.getElementById('highscores');

const highScoresList = document.querySelector('.highscores-list');

// 60 seconds
let timeLeft = 60;

let userScore = 0;

let storedScore = localStorage.getItem('userScore');


// Index to keep track of which question we are currently displaying
let currentQuestionIndex = 0;

// Get the HTML element that will display the current question text
const question = document.querySelector('.question');

// Get the HTML element that will hold the list of options/answers
const option = document.querySelector('.option');

function saveScore(score) {
    // Retrieve existing scores or initialize an empty array
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    
    // Push the new score
    scores.push(score);
    
    // Store updated scores
    localStorage.setItem('scores', JSON.stringify(scores));
}

highScores.addEventListener('click', function() {
    startButton.style.display = 'none';
    finishScreen.style.display = 'none';
    // Get scores from localStorage
    let scores = JSON.parse(localStorage.getItem('scores')) || [];

    // If more than 5 scores, get the last 5 scores
    if (scores.length > 5) {
        scores = scores.slice(-5);
    }

    // Clear any previously displayed scores
    highScoresList.innerHTML = '';
    const init = document.getElementById('init');

    // Display each score in the container
    scores.forEach(score => {
        let scoreItem = document.createElement('p');
        scoreItem.textContent = `${score.initials}: ${score.score}`;
        highScoresList.appendChild(scoreItem);
    });



    highScoresList.style.display = 'block';
})

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function decreaseTimer() {
    if (timeLeft > 0) {
    timeLeft--;
    }
    updateTimerDisplay();
}

function stopTimer(interval) {
    clearInterval(interval);
    finishQuiz();
}

function submitScore() {
    const initials = document.getElementById('init').value || 'Anonymous';
    
    const scoreData = {
        initials: initials,
        score: userScore
    };
    saveScore(scoreData);
}
function mainPage(){
    window.location.href = "index.html";
}
document.querySelector(".finish-screen button").addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the form from submitting traditionally
    submitScore();
    mainPage();
});

function finishQuiz() {
    console.log("finishQuiz called");
    question.style.display = 'none';
    option.style.display = 'none';
    const scoreElement = document.getElementById('finalScore');
    if (scoreElement) {
        scoreElement.textContent = userScore;
        console.log("User score set to:", scoreElement.textContent);
    } else {
        console.error("finalScore element not found");
    }
    finishScreen.style.display = 'block';
}


function displayQuestions() {
    // Check if there are mores questions left
    if (currentQuestionIndex >= quizQuestions.length) {
        finishQuiz();
        return;
    }
    // Retrieve the current question based on the index
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    // Display the question's text in the designated HTML element
    question.textContent = currentQuestion.question; 

    // Clear any previous options shown in the 'option' HTML element
    option.innerHTML = '';

    // Create a new unordered list (ul) to hold the options for the current question
    const optionUl = document.createElement('ul');
    option.appendChild(optionUl);

    // Extract the options from the current question
    const optionsArray = currentQuestion.options;

    const answer = currentQuestion.options[currentQuestion.correctAnswer];

    // Loop through each option to create a button within a list item
    optionsArray.forEach(opt => {
        const button = document.createElement('button');
        const optionLi = document.createElement('li');

        // Set the button's text to the current option
        button.textContent = opt;

        button.addEventListener('click', function() {
            if (opt === answer) {
                userScore += 25;
            }
            console.log(opt === answer);
            currentQuestionIndex++;
            displayQuestions();
        });

        // Append the button to the list item, and then append the list item to the ul
        optionLi.appendChild(button);
        optionUl.appendChild(optionLi);
    });
};

// Add an event listener to the start button. When it's clicked, the quiz starts
startButton.addEventListener('click', function() {
    // Hide the start button
    startButton.style.display = 'none';

    // Call the function to display the first question and its options
    displayQuestions();

    const interval = setInterval(function() {
        decreaseTimer();
        if (timeLeft <= 0) {
            stopTimer(interval);
        }
    }, 1000);
});


