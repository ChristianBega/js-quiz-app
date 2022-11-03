// Creating variables to store a reference to HTML elements
var startButton = document.getElementById("start-button");
var quizContainer = document.getElementById("quiz-container");
var quizPrompt = document.getElementById("quiz-prompt");

// This is the reference for all of the quiz choices
var quizChoices = document.querySelectorAll(".quiz-choice");
// This is the reference for the quiz options list
var quizList = document.getElementById("quiz-options-list");
console.log(quizList);
// This is the reference for the question element on the quiz
var quizQuestion = document.getElementById("quiz-question");

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
];

// Created an event listener for the startButton to listen for clicks
startButton.addEventListener("click", function () {
  quizPrompt.setAttribute("data-visibility", "hidden");
  quizContainer.setAttribute("data-visibility", "visible");
  // Timer starts
});
// Created an event listener for when a user selects another answer
quizList.addEventListener("click", function (event) {});

// I need an event listener for when i select and answer
// When i select an answer I want to change to the next answer
// Creating a variable that will collect the count number of questions

// I need a timer function
// I need a nextQuestion function
// I need a object sorting function
