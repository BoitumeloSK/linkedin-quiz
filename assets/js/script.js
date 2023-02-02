//declare global variables

var decreaseTime;
var questionTime;
var quizTime;
var totalTime = [];
var correctAnswers = [];
var responses = [];

var quizDiv = $("#quiz").css("display", "none");
var options = $("#options").css("display", "none");
var countdown = $("#countdown")
var resultsDiv = $("#results-div").css("display", "none");
var messageDiv = $("#message").css("display", "none");
var beginQuiz = $("#begin-quiz");
//var quizDiv = $("#quiz").css("display", "none");

var questions = [
  {
    question: "2 X 4 = ",
    answers: [6, 7, 8, 9],
    correct: 8,
  },

  {
    question: "36 / 6 = ",
    answers: [18, 6, 12, 8],
    correct: 6,
  },

  {
    question: "102 + 2(12 - 4) = ",
    answers: [105, 124, 832, 118],
    correct: 118,
  },

  {
    question: "1 + 48 / 12 X 3 = ",
    answers: [13, 12.25, 1.36, 14],
    correct: 13,
  },
  {
    question: "1 + 1 = ",
    answers: [4, 3, 2, 1],
    correct: 2,
  },
];
var count = 0;
var answers = questions[count].answers;
var startBtn = $("<button>").text("Start");
var startQuiz = $("#start-quiz");
var headingDiv = $("#heading")
  .css("background-color", "grey")
  .css("text-align", "center");
var heading = $("<h2>").text("Math Quiz").css("color", "white");
var displayQuestion = $("#question");
var question = $("<h1>");
var checkBtn = $("<button>").text("Check Answer").attr("class", "checkBtn");
var nextBtn = $("<button>").text("Next").attr("class", "nextBtn");
var completeBtn = $("<button>").text("Complete Quiz");

var detailsDiv = $("<div>");
var scoreDiv = $("<div>");
var alertDiv = $("<div>");
var boardDiv = $("<div>");
var alert = $("<p>").text("Please choose a different username");
var nameInput = $("<input>").attr("type", "text");
var submitBtn = $("<button>").text("Submit");
var viewBoard = $("<button>").text("View Score Board");
var stored = JSON.parse(localStorage.getItem("scoreBoard"));
var users = stored || [];

startQuiz.append(startBtn);

function labels() {
  $("#label1").text(answers[0]);
  $("#first").val(answers[0]);
  $("#label2").text(answers[1]);
  $("#second").val(answers[1]);
  $("#label3").text(answers[2]);
  $("#third").val(answers[2]);
  $("#label4").text(answers[3]);
  $("#fourth").val(answers[3]);
}

/**Starts the quiz */
startBtn.on("click", function () {
  var time = 15;
  var decreaseTime1 = setInterval(() => {
    time -= 1;
    countdown.text(time + " seconds left");
    if (time <= 0) {
      clearInterval(decreaseTime1);
      checkBtn.click();
      messageDiv.text("Timeout!").css("color", "red");
    }
  }, 1000);

  question.text(questions[count].question);
  countdown.text(time + " seconds left");

  quizDiv.css("display", "flex")
  .css("flex-direction", "column")
  .css("align-items", "center");
  startQuiz.css("display", "none");
  options.css("display", "flex").css("align-items", "center");
  resultsDiv.css("display", "flex");
  nextBtn.css("display", "none");

  headingDiv.append(heading);
  displayQuestion.append(question);
  labels();
  resultsDiv.append(checkBtn);
  resultsDiv.append(nextBtn);

  function startTime() {
    countdown.text(time + " seconds left");
    if (time <= 0) {
      clearInterval(decreaseTime);
      checkBtn.click();
      messageDiv.text("Timeout!").css("color", "red");
    }
    time -= 1;
  }

  /** Moves on to the next question after 5 seconds (test) - currently only works for 1st question*/
  function nextQuestion() {
    nextBtn.css("display", "none");
    checkBtn.css("display", "block");
    messageDiv.css("display", "none");
    $("input[type=radio]").prop("checked", false);

    count = count + 1;

    if (count <= 4) {
      answers = questions[count].answers;
      labels();
      question.text(questions[count].question);
    }
  }

  /**Stops the timer and checks if the selected answer is the correct number for the question */
  checkBtn.on("click", function () {
    clearInterval(decreaseTime);
    var checkedNumber = $("input[type=radio]:checked").val();
    var x = questions[count].correct;
    questionTime = 15 - time;
    quizTime = 0;

    countdown.text(time + " seconds left");

    checkBtn.css("display", "none");
    nextBtn.css("display", "block");
    messageDiv.css("display", "flex");

    clearInterval(decreaseTime1);

    totalTime.push(questionTime);
    totalTime.forEach((t) => {
      quizTime += t;
    });
    console.log(totalTime);

    if (checkedNumber != undefined) {
      responses.push(checkedNumber);
    }

    messageDiv.innerText = "";

    if (Number(checkedNumber) == Number(x)) {
      messageDiv
        .text("Correct")
        .css("color", "green")
        .css("text-align", "center");
      correctAnswers.push(checkedNumber);
    } else {
      messageDiv
        .text("Incorrect")
        .css("color", "red")
        .css("text-align", "center");
    }

    if (count == 4) {
      nextBtn.css("display", "none");
      resultsDiv.append(completeBtn);
      completeBtn.css("display", "block");
    }
  });

  /**Records the selected answer for each question and goes to the next question when clicked */
  nextBtn.on("click", function () {
    setTimeout(() => {
      nextQuestion();
    }, 1000);
    time = 15;
    decreaseTime = setInterval(startTime, 1000);
  });

  /**Shows quiz results */
  completeBtn.on("click", function () {
    var congratulations = $("<h1>").text("Quiz Complete");
    var answered = $("<p>").text(
      `You have answered ${responses.length} out of ${questions.length} questions`
    );
    var score = $("<p>").text(
      `Your score is ${correctAnswers.length} out of ${questions.length}`
    );
    var scoreTime = $("<p>").text(
      `You completed the quiz in ${quizTime} seconds`
    );
    

    quizDiv.css("display", "none");
    beginQuiz.css("display", "block");
    startBtn.css("display", "none");

    beginQuiz.append(detailsDiv);
    detailsDiv.append(congratulations);
    detailsDiv.append(answered);
    detailsDiv.append(score);
    detailsDiv.append(scoreTime);
    beginQuiz.append(alertDiv);
    beginQuiz.append(scoreDiv);
    scoreDiv.append(nameInput);
    scoreDiv.append(submitBtn);
  });

  submitBtn.on("click", function () {
    var details = {
      username: "",
      points: correctAnswers.length,
      timeRecord: Number(quizTime),
    };

    details.username = nameInput.val();

    // if (users.includes(details.username)) {
    //   alertDiv.append(alert);
    // } else {

    // }

    users.push(details);
    users.sort((a, b) => {
      return b.points - a.points || a.timeRecord - b.timeRecord;
    });

    scoreDiv.css("display", "none");
    detailsDiv.css("display", "none");
    alertDiv.css("display", "none");

    beginQuiz.append(boardDiv);
    boardDiv.append(viewBoard);
  });

  viewBoard.on("click", function(){
    viewBoard.css("display", "none")
    localStorage.setItem("scoreBoard", JSON.stringify(users));
      if (stored == null) {
        boardDiv.append(
          $("<div>").text(
            `${details.username} | ${details.points} | ${details.timeRecord}`
          )
        );
      } else {
        stored.forEach((item) => {
          boardDiv.append(
            $("<div>").text(
              `${item.username} | ${item.points} | ${item.timeRecord}`
            )
          );
        });
      }
  })
});



//if(checkedNumber != question.correct)
// else
// {
//   count = count
//   console.log
//   var message = $("<p>").text("Please select an answer")
//   messageDiv.append(message)
// }
