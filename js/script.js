const startButton = document.querySelector('.quiz-intro button');
const mainElement = document.querySelector('main');
var timerDisplay = document.querySelector('.top-bar p');
let secondsLeft = 60;
var countdown;

mainElement.style.display = 'none';

function startTimer() {
    countdown = setInterval(function() {
        var seconds = secondsLeft % 60;
        timerDisplay.textContent = 'Timer 0:' + seconds.toString().padStart(2,'0');
        secondsLeft--;

        if (secondsLeft < 0) {
            clearInterval(countdown);
            timerDisplay.textContent = 'Timer 0:00';
        }
    }, 1000);
}



startButton.addEventListener('click', function() {
    startButton.style.display = 'none';
    mainElement.style.display = 'block';
    startTimer();
});



