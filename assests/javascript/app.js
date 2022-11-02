// Creating variables to store a reference to HTML elements
var startButton = document.getElementById("start-button");
var quizContainer = document.getElementById("quiz-container");
var quizPrompt = document.getElementById("quiz-prompt");
var quizChoices = document.querySelectorAll(".quiz-choice");
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

// Listening for click event on button to run function
startButton.addEventListener("click", function () {
  quizPrompt.setAttribute("data-visibility", "hidden");
  quizContainer.setAttribute("data-visibility", "visible");
});

//Mapping objects

// Created a for loop to iterate over each select button and listen for a click event
quizChoices.forEach((item) => {
  item.addEventListener("click", (event, idx) => {
    // Created variable that will collect an array list of all question values in the questions object
    const questionsEl = questions.map((questions) => questions.question);
    // console.log(questionsEl);
    quizQuestion.textContent = questionsEl[0]
  });
});
console.log(questions);
