// Creating variables to store a reference to the HTML elements
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

// Created a variable that will store the initial count
let count = 89;

// Created two variables that will store the users correct and incorrect answers.
var incorrectSelected = 0;
var correctSelected = 0;

// Created an event listener for the startButton to listen for clicks
startButton.addEventListener("click", function () {
  // setting the quizPrompt data-visibility to hidden
  quizPrompt.setAttribute("data-visibility", "hidden");
  // setting the quizContainer data-visibility to hidden
  quizContainer.setAttribute("data-visibility", "visible");
  // Created a timer
  //      setInterval - repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.
  //                     => arrow function - a compact alternative to a traditional function expression,
  timer = setInterval(() => {
    // Updating the countEl reference with the count = 89
    countEl.innerText = count;
    // decrement from the count by 1
    count--;
    // if the count is less than or equal to 0 run this code
    if (count <= 0) {
      // Call resetDisplayQuestion function
      resetDisplayQuestion();
      // Call gameOver function
      gameOver();
      // Call clearInterval function
      // clearInterval() function - cancels a timed, repeating action which was previously established by a call to setInterval().
      clearInterval(timer);
    }
    // 1000 = 1sec
  }, 1000);

  // Randomly select a question from array
  //                         .sort() - sorts the elements of an array in place and returns the reference to the same array, now sorted
  //                                     math.floor - rounds down and returns the largest integer less than or equal to a given number.
  //                                                 math.random - returns a floating-point, pseudo-random number that's greater than or equal to 0 and less than 1
  randomQuestions = questions.sort(() => [Math.floor(Math.random() - 0.3)]);
  // Reassigning the initial value of currentQuestionIndex to 0
  currentIndex = 0;
  //Calling createNextQuestion function
  createNextQuestion();
});

// Created an event listener for when a user selects another answer
quizList.addEventListener("click", function () {
  // Increment the count of the the current index (move up 1 index)
  currentIndex++;
  // Created an if statement to check if the currentIndex is greater than or equal to maxIndex
  if (currentIndex >= maxIndex) {
    // if true call gameOver () function
    gameOver();
  } else {
    // if not true call createNextQuestion
    createNextQuestion();
  }
});

// Created an event listener for when user submits results
submitBtn.addEventListener("click", function () {
  // Setting the quizContainer's data-visibility attr to hidden (hiding quizContainer)
  quizContainer.setAttribute("data-visibility", "hidden");
  // Setting gameOver elements innerText to an empty string
  gameOver.innerText = "";
  // Setting the submitBtn's data-visibility attr to hidden (hiding submitBtn)
  submitBtn.setAttribute("data-visibility", "hidden");
  // Calling the storeScore function
  storeScore();
  // Calling the displayHighScore function
  displayHighScore();
});

// Created an event listener for when user clicks on high scores
highScore.addEventListener("click", function () {
  // Calling the displayHighScore function
  displayHighScore();
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
  // Reassigning the answerKey value to equal the current question's answer.
  answerKey = question.answer;

  // Created a for loop to iterate over the choice of each question and dynamically create html elements.
  //    initialize        condition              increment
  for (let i = 0; i < question.choices.length; i++) {
    // Created a variable that will store the current question's choice's index.
    const choiceEl = question.choices[i];
    // Created a variable that will store a newly created html button element
    const button = document.createElement("button");
    // Assign the innerText of the button to equal the choiceEl variable
    button.innerText = choiceEl;
    // Adding a class of quiz-choices to the button element
    button.classList.add("quiz-choices");
    // Adding the button element to the quizList container
    quizList.append(button);
    // Created a eventListener to listen for a click then to run this function
    button.addEventListener("click", function () {
      // Creating an if statement to check if the choiceEl is equal to the answerKey
      if (choiceEl === answerKey) {
        // If true run this code
        // Setting the correctEl data-visibility to visible
        correctEl.setAttribute("data-visibility", "visible");
        // Increment the correctSelected variable by one
        correctSelected += 1;
        // Calling resetChoiceEl function
        resetChoiceEl();
      } else {
        //If false run this code
        // setting the incorrectEl data-visibility to visible
        incorrectEl.setAttribute("data-visibility", "visible");
        // Decrementing 10 seconds from count if incorrect
        count -= 10;
        // decrementing incorrectSelected variable by 1
        incorrectSelected += 1;
        // Calling resetChoiceEl function
        resetChoiceEl();
      }
    });
  }
}
// Created a function that will reset the quizQuestion and quizList innerHTML.
function resetDisplayQuestion() {
  //Reassigning the innerHTML of quizQuestion and quizList to an empty string
  quizQuestion.innerHTML = "";
  quizList.innerHTML = "";
}
// Created a function that will reset correct/incorrect el after a setTimeout
function resetChoiceEl() {
  // setTimeout () - sets a timer which executes a function or specified piece of code once the timer expires.
  //            arrow function
  setTimeout(() => {
    // Setting the correctEl data-visibility to hidden
    correctEl.setAttribute("data-visibility", "hidden");
    // Setting the correctEl data-visibility to hidden
    incorrectEl.setAttribute("data-visibility", "hidden");
  }, 1250); //1250 = 1.25 seconds
}
// Created a function that will run after the game is over. It will reset quizQuestions, quizList, and other content.
function gameOver() {
  // calling resetDisplayQuestion
  resetDisplayQuestion();
  // Setting the data-visibility of resultsContainer to visible
  resultsContainer.setAttribute("data-visibility", "visible");
  // Created a variable that store the newly created div element
  const gameOver = document.createElement("div");
  // Setting that div element's innerText to game over
  gameOver.innerText = "Game Over";
  // Adding a class to the game-over div element
  gameOver.classList.add("game-over");
  // Appending that div to the quizContainer
  quizContainer.append(gameOver);
  // Setting the countEl to 0
  countEl.innerText = 0;
  //  Setting correct/incorrect element to an empty string.
  correctEl.innerHTML = "";
  incorrectEl.innerHTML = "";
}

// Created a local storage function that will store the score after a game
function storeScore() {
  // Set the data-visibility of resultsContainer to show
  resultsContainer.setAttribute("data-visibility", "show");
  // Calling the resetDisplayQuestion function
  resetDisplayQuestion();
  // Created a variable that will store the score
  score = Math.floor((incorrectSelected / maxIndex) * 100) + "%";
  // Setting the scoreEl's innerText to the value of score
  scoreEl.innerText = score;
  // setting items into the local store and assigning user inputs and final score
  localStorage.setItem("Initials", userInitials.value);
  localStorage.setItem("Score", score);
}
// Show high score
function displayHighScore() {
  // Set the data-visibility of quizPrompt to hidden
  quizPrompt.setAttribute("data-visibility", "hidden");
  // Set the data-visibility of quizContainer to hidden
  quizContainer.setAttribute("data-visibility", "hidden");
  // Created a variable that will store the value from local store
  const highScore = localStorage.getItem("Score");
  const initials = localStorage.getItem("Initials");
  // Created a variable that will store the value of the newly created div
  const highScoreEl = document.createElement("div");
  const initialsEl = document.createElement("div");
  // Setting the innerText of highScoreEl and initialsEl
  highScoreEl.innerText = "Current high Score: " + highScore;
  initialsEl.innerText = "The current leader is: " + initials;
  // Added a class to highScoreEl and initialsEl
  highScoreEl.classList.add("results");
  initialsEl.classList.add("results");
  // Adding the div element to the document body
  document.body.append(highScoreEl);
  document.body.append(initialsEl);
}
// Created a displaySubmit function
function displaySubmit() {
  // Created a variable that will store the value of the newly created div
  submitEl = document.createElement("div");
  // Setting the innerText of the div element
  submitEl.innerText = "Submitted";
  // Adding the div element to the quizContainer
  quizContainer.append(submitEl);
  // Setting the correctEl/incorrectEL innerHtml to an empty string
  correctEl.innerHTML = "";
  incorrectEl.innerHTML = "";
}

// Resources ::
// setInterval() - https://developer.mozilla.org/en-US/docs/Web/API/setInterval
// clearInterval() - https://developer.mozilla.org/en-US/docs/Web/API/clearInterval
// arrow functions - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// sort() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// math.floor() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
// math.random () - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// setTimeout () - https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
