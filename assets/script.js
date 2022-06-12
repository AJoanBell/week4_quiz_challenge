
// declare time and score variables and define time for countdown
var timeEl = document.querySelector("p.time");
var secondsLeft = 75;
var scoreEl = document.querySelector("#score");

// landing page intro section
const introEl = document.querySelector("#intro");

// questions
const questionsEl = document.querySelector("#questions");

var questionEl = document.querySelector("#question");

var questionCount = 0;

const rightwrongEl = document.querySelector("#rightwrong");

// final section
const finalEl = document.querySelector("#final");
// initials from user
var initialsInput = document.querySelector("#initials");

// highscore
const highscoresEl = document.querySelector("#highscores");
// list for score
var scoreListEl = document.querySelector("#score-list");
// score array
var scoreList = [];

// buttons for declaration
// start
const startBtn = document.querySelector("#start");
// answer button class
const ansBtn = document.querySelectorAll("button.ansBtn")
// answer0
const ans0Btn = document.querySelector("#answer0");
// answer1
const ans1Btn = document.querySelector("#answer1");
// answer2
const ans2Btn = document.querySelector("#answer2");
// answer3
const ans3Btn = document.querySelector("#answer3");
// answer4
const ans4Btn = document.querySelector("#answer4");
// answer5
const ans5Btn = document.querySelector("#answer5");
// submit-score
const submitScrBtn = document.querySelector("#submit-score");
// goback
const goBackBtn = document.querySelector("#goback");
// clearscores
const clearScrBtn = document.querySelector("#clearscores");
// view-scores
const viewScrBtn = document.querySelector("#view-scores");

// Objects
const questions = [ // array of objects
    {
        // question 0
        question: "Inside which HTML element does the JavaScript go?",
        answers: ["1. <scripting>", "2. <javascript>", "3. <js>", "4. <script>"],
        correctAnswer: "4"
    },
    {
        // question 1
        question: "JavaScript file has an extension of:",
        answers: ["1. .Javas", "2. .js", "3. .javascript", "4. .jscript"],
        correctAnswer: "2"
    },
    {
        // question 2
        question: "Which statement is used to declare a variable in JavaScript",
        answers: ["1. Let", "2. Int", "3. var", "4. square brackets"],
        correctAnswer: "3"
    },
    {
        // question 3
        question: "Arrays in JavaScript can be used to store",
        answers: ["1. numbers and strings", "2. other arrays", "3. bootleans", "4. all of the above"],
        correctAnswer: "4"
    },
    {
        // question 4
        question: "String values must be enclosed within _____when being assigned to variables.",
        answers: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "3"
    },
    {
        // question 5
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console log"],
        correctAnswer: "4"
    },


];


// Functions

// countdown
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}

// timer start
function startQuiz() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

// display for question
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
        ans5Btn.textContent = questions[id].answers[4];
    }
}

// check answer
function checkAnswer(event) {
    event.preventDefault();

//correctincorrect answers
    rightwrongEl.style.display = "block";
    let p = document.createElement("p");
    rightwrongEl.appendChild(p);

    // time out
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // check answer
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Incorrect!";
    }

    // increment 
    if (questionCount < questions.length) {
        questionCount++;
    }
    // call setQuestion 
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    // scores sorter
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    // local storage
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
   
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// clear 
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

// EventListeners
// timer start question 0 display 
startBtn.addEventListener("click", startQuiz);

// Check answers loop
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// + score
submitScrBtn.addEventListener("click", addScore);

// return Button
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 75;
    timeEl.textContent = `Time:${secondsLeft}s`;
});

// score clear
clearScrBtn.addEventListener("click", clearScores);

// High Scores Button
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("No scores to show.");
    }
});