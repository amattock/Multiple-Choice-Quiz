// questions array created based on README provided for challenge
var questions = [{
    q: "Commonly used data types DO NOT include:",
    a: "1. Strings",
    b: "2. Booleans",
    c: "3. Alerts",
    d: "4. Numbers",
    correct: "3. Alerts",
},
{
    q: "The condition in an if/else statement is enclosed with ____.",
    a: "1. Quotes",
    b: "2. Curly brackets",
    c: "3. Parentheses",
    d: "4. Square brackets",
    correct: "3. Parentheses",
},
{
    q: "Arrays in JavaScript can be used to store ____.",
    a: "1. Numbers and strings",
    b: "2. Other arrays",
    c: "3. Booleans",
    d: "4. All of the above",
    correct: "4. All of the above",
},
{
    q: "String values must be encosed within ____ when being assigned to variables.",
    a: "1. Quotes",
    b: "2. Curly brackets",
    c: "3. Parentheses",
    d: "4. Square brackets",
    correct: "1. Quotes",
},
{
    q: "A very useful tool used during development and debugging for printing content to the debugger is:",
    a: "1. Javascript",
    b: "2. Terminal/Bash",
    c: "3. for loops",
    d: "4. console.log",
    correct: "4. console.log",
},
{
    q: "What is the correct syntax for referring to an external script called 'code.js'?",
    a: "1. <script src='code.js'>",
    b: "2. <script href='code.js'>",
    c: "3. <script ref='code.js'>",
    d: "4. <script name='code.js'>",
    correct: "1. <script src='code.js'>",
}];
// clickstart refrences element ID "start" (line 18)
var startEl = document.getElementById("begin");
// timerEl refrences element ID "countdown" (line 20)
var timerEl = document.getElementById("countdown");
// timeLeft refrences total time (number)
var timeLeft = 90;
// var for quizLength created
var quizLength;
// questionsContainer refrences the "quiz-container" class
var questionContainer = document.querySelector("#quiz-container");
// timer function places the time remaining in the H2 heading as "Time remaining: "
function timer() {
    timerEl.textContent = "Time left: " + timeLeft + "s";
    quizLength = setInterval(function () {
        // if statment calls out how time is counting down from the timeLeft
        if (timeLeft > 0) {
            adjustTime(-1);
        } else {
            endQuizPage();
        }
    }, 1000);
};

function adjustTime(amount) {
    timeLeft += amount;
    if (timeLeft < 0) {
        timeLeft = 0;
    }
    timerEl.textContent = "Time left: " + timeLeft + "s";
};
// event listener for the button element "begin", initiates 'timer' function
startEl.onclick = timer;
var renderQuestion = function (question) {
    questionContainer.innerHTML = "";
    // below variable create elements for the questions as a H2 and answers as buttons. 
    var questionHead = document.createElement("h2");
    questionHead.textContent = question.q;
    // Accompanied by an event listener on the "answer" variables 
    var answerA = document.createElement("button");
    answerA.textContent = question.a;
    answerA.addEventListener("click", answerClick);

    var answerB = document.createElement("button");
    answerB.textContent = question.b;
    answerB.addEventListener("click", answerClick);

    var answerC = document.createElement("button");
    answerC.textContent = question.c;
    answerC.addEventListener("click", answerClick);

    var answerD = document.createElement("button");
    answerD.textContent = question.d;
    answerD.addEventListener("click", answerClick);

    // append method used to place variables into html
    questionContainer.appendChild(questionHead);
    questionContainer.appendChild(answerA);
    questionContainer.appendChild(answerB);
    questionContainer.appendChild(answerC);
    questionContainer.appendChild(answerD);
};
// variables created for tracking question, score, right answers and score
var currentQuestionIndex = 0;
var userScore = 0;
var correctAnswer = questions[currentQuestionIndex].correct;
var clickViewScores = document.getElementById("view-score");
// answerClick variable function created for question
var answerClick = function(event) {
    event.preventDefault();
    var userAnswer = event.target.textContent;
    correctAnswer = questions[currentQuestionIndex].correct;
    //if statment determines if answer is wrong or right
    var answerDetermination = document.querySelector("#answer");
    if (userAnswer !== correctAnswer) {
        adjustTime(-10);
        answerDetermination.textContent = "Incorrect!";
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            endQuizPage();
        } else {renderQuestion(questions[currentQuestionIndex])};

    }
    else if (userAnswer === correctAnswer) {
        currentQuestionIndex++;
        answerDetermination.textContent = "Correct!";
        userScore++;
        if (currentQuestionIndex >= questions.length) {
            endQuizPage();
        } else {renderQuestion(questions[currentQuestionIndex])};
    }
};
// 'quiz' calls function calls resetDisplay
var quiz = function (event) {
    event.preventDefault();
    resetDisplay();
    renderQuestion(questions[currentQuestionIndex]);
};
// reset display function to id "intro-page"
function resetDisplay() {
    questionContainer.innerHTML="";
    document.querySelector("#home-page").style.display = "none";
};
// function to define where "object" is stored and the parsing of the data
function highScores() {
    let data = localStorage.getItem("object");
    let getData = JSON.parse(data);
    // name and score will define the name and score from the player
    let name = getData.name;
    let score = getData.score;
    questionContainer.innerHTML = "";
    questionContainer.innerHTML = name + " " + score;
};
// event listener for 'highScore' function
clickViewScores.addEventListener("click", () => {
    highScores();
});

var initials; 

function endQuizPage() {
    resetDisplay();
    timerEl.textContent = "";
    clearInterval(quizLength);
    var endPage = document.createElement("h2");
    questionContainer.appendChild(endPage);

    let blank = document.querySelector("#answer");
    blank.innerHTML = "";

    endPage.innerHTML = "Thanks for playing, your final score is " + userScore + ". Enter your initials to save";

    var initialBox = document.createElement("input");
    blank.appendChild(initialBox);

    var submitInitialBtn = document.createElement("button");
    submitInitialBtn.textContent = "Submit";
    blank.appendChild(submitInitialBtn);

    submitInitialBtn.addEventListener("click", () => {
        // rest variable for multiple choice
        
        if (initialBox.value.length === 0) return false;

        let storeInitials = (...input) => {
            let data = JSON.stringify({ "name":input[0], "score":input[1]})
            localStorage.setItem("object", data)
        }
        storeInitials(initialBox.value, userScore);

        var playAgain = document.createElement("button");
        playAgain.textContent= "Play Again!";
        blank.appendChild(playAgain);

        playAgain.addEventListener("click", () => {
            location.reload();
        })
    });

    document.querySelector("input").value = "";

    initialBox.addEventListener("submit", endQuizPage);
    
};
function renderInitials() {
    submitInitialBtn.addEventListener('click', function(event) {
        event.preventDefault;
}
)};

startEl.addEventListener('click', quiz);