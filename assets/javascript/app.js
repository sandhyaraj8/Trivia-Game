//create a variable to hold array of questions and option answers.
//options should have radio buttons.
//match the user input with the right answer.
var displayQuestionIndex = 0;

var questions = [
  new QuestionSet(
    "Which one is not an object oriented programming language?",
    ["Java", "C#", "c++", "c"],
    4
  ),
  new QuestionSet(
    "Which class provides a responsive fixed width container??",
    [
      ".container-fluid",
      ".container-fixed",
      ".container",
      ".container-responsive"
    ],
    3
  ),
  new QuestionSet(
    "Which jQuery method is used to hide selected elements?",
    ["display(none)", "hide()", "visible(false)", "hidden()"],
    2
  ),
  new QuestionSet(
    "How do you round the number 7.25, to the nearest integer?",
    ["rnd(7.25)", "Math.round(7.25)", "round(7.25)", "Math.rnd(7.25)"],
    2
  ),
  new QuestionSet(
    "Which language is used for styling web pages?",
    ["HTML", "JQuery", "CSS", "XML"],
    3
  )
];
// template through function
function QuestionSet(askQuestion, choices, answer) {
  this.askQuestion = askQuestion;
  this.choices = choices;
  this.answer = answer;
  this.userAnswer = 0;
}
var intervalId;

function timeFinished() {
  console.log("timeFinished called" + new Date());
  clearInterval(intervalId);
  nextQuestion();
}

function startClock() {
  currentTimeLimit = 10;
  console.log("Clock Started called" + new Date());
  intervalId = setInterval(timeFinished, 10 * 1000);
}

function displayQuestion() {
  startClock();

  var questionData = questions[displayQuestionIndex];
  console.log("questionData = " + questionData.askQuestion);
  $("#question").html(questionData.askQuestion);

  var displayChoices = questionData.choices;
  for (var i = 0; i < displayChoices.length; i++) {
    console.log("choice Index = " + i + " text = " + displayChoices[i]);
    $("#Choice" + (i + 1)).html(displayChoices[i]);
  }
  //Display question number in the footer like  question x of y
  //Question (displayQuestionIndex add +1 bcoz in global variable, its assigned "0") of (questions.length)
  $("#questionCounter").text(
    "Question " + (displayQuestionIndex + 1) + " of " + questions.length
  );
}

//binding
function btnClicked(userChoiceIndex) {
  //storing user answer
  console.log("userChoiceIndex=" + userChoiceIndex);
  var questionData = questions[displayQuestionIndex];
  questionData.userAnswer = parseInt(userChoiceIndex);

  if (questionData.userAnswer === questionData.answer) {
    console.log("CORERCT questionData.userAnswer=" + questionData.userAnswer);
  } else {
    console.log("WRONG questionData.userAnswer=" + questionData.userAnswer);
  }

  clearInterval(intervalId);
  nextQuestion();
} //end-btnClicked

function nextQuestion() {
  displayQuestionIndex = displayQuestionIndex + 1;
  if (displayQuestionIndex < questions.length) {
    displayQuestion();
  } else displayScore();
}

function displayScore() {
  console.log("displayScore");
  $("#questionContainer").hide();
  $("#timer").hide();
  $("#result").show();

  var correctScore = 0;
  var wrongScore = 0;
  for (var i = 0; i < questions.length; i++) {
    var questionData = questions[i];

    if (questionData.userAnswer === questionData.answer) {
      correctScore = correctScore + 1;
    } else {
      wrongScore = wrongScore + 1;
    }
  } //end-forloop

  $("#correctScore").text(
    "Correct score " + correctScore + " of " + questions.length
  );
  $("#wrongScore").text(
    "Wrong score " + wrongScore + " of " + questions.length
  );
}

for (var i = 1; i <= 4; i++) {
  $("#btn" + i).on("click", function(e) {
    var btnObj = e.currentTarget;
    var choiceSelected = $(btnObj).attr("data");
    console.log("button data=" + choiceSelected);
    btnClicked(choiceSelected);
  });
}
$("#result").hide();

var currentTimeLimit = 10;

function twoSecsPoll() {
  if (currentTimeLimit <= 0) currentTimeLimit = 10;
  currentTimeLimit = currentTimeLimit - 1;
  $("#timerSecsLeft").text("" + currentTimeLimit);
  setTimeout(twoSecsPoll, 1000);
}

twoSecsPoll();

displayQuestion();

//create 4 buttons for optional answers.
// for (var i = 0; i < 4; i++) {
//   var buttonOne = $("<button>");
//   //   buttonOne.attr({
//   //       "id":"btn1",
//   //       "<span>":
//   //   })
//
