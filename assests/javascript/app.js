// Creating variables to store a reference to HTML elements
var startButton = document.getElementById("start-button");
var quizContainer = document.getElementById("quiz-container");
var quizPrompt = document.getElementById("quiz-prompt");
var highScore = document.getElementById("high-score-container");

// This is the reference for all of the quiz choices
var quizChoices = document.querySelectorAll("quiz-choices");
// This is the reference for the quiz options list
var quizList = document.getElementById("quiz-options-list");
// This is the reference for the question element on the quiz
var quizQuestion = document.getElementById("quiz-question");

// This is the reference for the correct footer text
var correctEl = document.getElementById("correct");
// This is the reference for the incorrect footer text
var incorrectEl = document.getElementById("incorrect");

// This is a reference for the results container
var resultsContainer = document.getElementById("save-results-container");
// This is a reference for the initials from the user input
var userInitials = document.getElementById("user-initials");
// This is a reference for the score
var scoreEl = document.getElementById("score");
// This is a reference for the submit button
var submitBtn = document.getElementById("submit-btn");

// This is a reference for the count time
var countEl = document.getElementById("count");

// Creating variables to store an array of objects for each quiz question and options
var questions = [
  {
    question: "What is the difference between == and ===?",
    choices: [
      "There is no difference.",
      "One has an extra more = operator",
      "== checks both data types and values, === only checks values",
      "=== checks both data types and values, == only checks values",
    ],
    answer: "=== checks both data types and values, == only checks values",
  },
  {
    question: "Which of the following is true about for loops?",
    choices: [
      "A for loop tests if a condition is true or false.",
      "I have no clue!",
      "A for loop takes in only one parameter",
      "A for loop iterates over each object of an array.",
    ],
    answer: "A for loop iterates over each object of an array.",
  },
  {
    question: "Which of the following is NOT a data type?",
    choices: ["Number", "String", "Index", "Boolean"],
    answer: "Index",
  },
  {
    question: "The index of an array start at what number?",
    choices: ["0", "-1", "1", "3"],
    answer: "0",
  },
  {
    question: "What does Java script provide to a webpage?",
    choices: [
      "It provides colors, fonts, and styling.",
      "It provides the structure to the webpage.",
      "Javascript isn't a programing langue.",
      "It provides interactivity and functionality to a static webpage.",
    ],
    answer: "It provides interactivity and functionality to a static webpage.",
  },
  {
    question: "Which of the following is not a primitive data type?",
    choices: ["String", "Object", "Number", "Boolean"],
    answer: "Object",
  },
  {
    question: "There are _ primitive data types in Java script.",
    choices: ["Too many to count.", "10", "7", "5"],
    answer: "5",
  },
  {
    question: "Which of the following is a framework/library for Java script",
    choices: ["Tailwind", "React", "Material UI", "Vanilla JS"],
    answer: "React",
  },
  {
    question: "How many long did it take to build Java script",
    choices: ["10 days", "5 years", "Over night", "2 months"],
    answer: "10 days",
  },
];
// Created a variable that will store the maxIndex
var maxIndex = questions.length;

// Created two undefined variables that will collect the value of randomQuestion and currentQuestionIndex
let randomQuestions, currentQuestionIndex;

let count = 89;

var incorrectSelected = 0;
var correctSelected = 0;

// Created an event listener for the startButton to listen for clicks
startButton.addEventListener("click", function () {
  quizPrompt.setAttribute("data-visibility", "hidden");
  quizContainer.setAttribute("data-visibility", "visible");
  // Timer starts
  timer = setInterval(() => {
    countEl.innerText = count;
    count--;
    if (count <= 0) {
      resetDisplayQuestion();
      clearInterval(timer);
      gameOver();
    }
  }, 1000);

  // Randomly select a question from array
  randomQuestions = questions.sort(() => [Math.floor(Math.random() - 0.3)]);
  // Reassigning the initial value of currentQuestionIndex to 0
  currentIndex = 0;

  // console.log(randomQuestions, currentQuestionIndex);
  createNextQuestion();
});

// Created an event listener for when a user selects another answer
quizList.addEventListener("click", function () {
  // If a user clicks increment the count of the the current index (move up 1 index)
  currentIndex++;

  if (currentIndex >= maxIndex) {
    gameOver();
  } else {
    createNextQuestion();
  }
});

// Created an event listener for when user submits results
submitBtn.addEventListener("click", function () {
  quizContainer.setAttribute("data-visibility", "hidden");
  gameOver.innerText = "";
  storeScore();
});

// Created an event listener for when user clicks on high scores
highScore.addEventListener("click", function () {
  showHighScore();
});

// Created a function that will reset the quiz container and call the displayQuestion function.
function createNextQuestion() {
  resetDisplayQuestion();
  // Calling displayQuestion and passing it a argument of a random object from the questions array and its index.
  //                            argument
  //              random choice         index
  displayQuestion(randomQuestions[currentIndex]);
}

function displayQuestion(question) {
  // Reassigning the innerText of questionEl to the parameter (shuffledQuestions[currentQuestionIndex])
  //                      object   keyName
  quizQuestion.innerText = question.question;
  answerKey = question.answer;

  for (let i = 0; i < question.choices.length; i++) {
    const choiceEl = question.choices[i];
    const button = document.createElement("button");
    button.innerText = choiceEl;
    button.classList.add("quiz-choices");
    quizList.append(button);
    button.addEventListener("click", function () {
      if (choiceEl === answerKey) {
        correctEl.setAttribute("data-visibility", "visible");
        correctSelected += 1;
        resetChoiceEl();
      } else {
        incorrectEl.setAttribute("data-visibility", "visible");
        count -= 10;
        incorrectSelected += 1;
        resetChoiceEl();
      }
    });
  }
}
function resetDisplayQuestion() {
  quizQuestion.innerHTML = "";
  quizList.innerHTML = "";
}
function resetChoiceEl() {
  setTimeout(() => {
    correctEl.setAttribute("data-visibility", "hidden");
    incorrectEl.setAttribute("data-visibility", "hidden");
  }, 1250);
}
function gameOver() {
  resetDisplayQuestion();
  resultsContainer.setAttribute("data-visibility", "visible");
  const gameOver = document.createElement("div");
  gameOver.innerText = "Game Over";
  gameOver.classList.add("game-over");
  quizContainer.append(gameOver);
  countEl.innerText = 0;
  correctEl.innerHTML = "";
  incorrectEl.innerHTML = "";
}

//Score function

// Local storage function
function storeScore() {
  resultsContainer.setAttribute("data-visibility", "show");
  resetDisplayQuestion();
  score = Math.floor((incorrectSelected / maxIndex) * 100) + "%";
  scoreEl.innerText = score;
  localStorage.setItem("Initials", userInitials.value);
  localStorage.setItem("Score", score);
}
// Show high score
function showHighScore() {
  quizPrompt.setAttribute("data-visibility", "hidden");
  quizContainer.setAttribute("data-visibility", "hidden");
  const highScore = localStorage.getItem("Score");
  const initials = localStorage.getItem("Initials");

  const highScoreEl = document.createElement("div");
  const initialsEl = document.createElement("div");

  highScoreEl.innerText = "Current high Score: " + highScore;
  initialsEl.innerText = "The current leader is: " + initials;

  highScoreEl.classList.add("results");
  initialsEl.classList.add("results");

  document.body.append(highScoreEl);
  document.body.append(initialsEl);
}
// Submit function
function displaySubmit() {
  submitEl = document.createElement("div");
  submitEl.innerText = "Submitted";
  quizContainer.append(submitEl);
  correctEl.innerHTML = "";
  incorrectEl.innerHTML = "";
}
