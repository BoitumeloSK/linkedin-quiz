var decreaseTime;
var questionTime;
var quizTime;
var totalTime = [];
var correctAnswers = [];
var responses = [];
var count = 0;
var countdown = $("#countdown");
var resultsDiv = $("#results-div").css("display", "none");
var messageDiv = $("#message").css("display", "none");
var completeQuiz = $("#complete-quiz").css("display", "none");

var questions = [
  {
    question:
      "Which command is used to create a .git folder in the existing project directory?",
    answers: ["git add", "git init", "git gui", "git diff"],
    correct: "git init",
  },

  {
    question:
      "In version control a database server that contains all the files and their history is called___",
    answers: ["clone", "copy", "repository", "branch"],
    correct: "repository",
  },

  {
    question:
      "To bring together changes made from different sources which operation is used in version control?",
    answers: ["merge", "pull", "push", "commit"],
    correct: "merge",
  },

  {
    question:
      "What command lets you create a connection between a local and remote repository?",
    answers: [
      "git remote add new",
      "git remote new origin",
      "git remote origin",
      "git remote add origin",
    ],
    correct: "git remote add origin",
  },
  {
    question: "Which command gets a copy of an existing Git repository",
    answers: ["copy", "replicate", "clone", "duplicate"],
    correct: "clone",
  },
];

var answers = questions[count].answers;
var startBtn = $("<button>").text("Start");
var question = $("<p>").css("text-align", "center");
var checkBtn = $("<button>").text("Check Answer").attr("class", "check-btn");
var nextBtn = $("<button>").text("Next").attr("class", "next-btn");
var completeBtn = $("<button>")
  .text("Complete Quiz")
  .attr("class", "complete-btn");
var scoreDetails = $("#score-details");
var boardInput = $("#board-input");
var boardDiv = $("#board-div");
var nameInput = $("<input>")
  .attr("type", "text")
  .attr("placeholder", "Enter username..");
var submitBtn = $("<button>").text("Submit").attr("class", "submit-btn");
var viewBoard = $("<button>")
  .text("View Score Board")
  .attr("class", "score-board");
var stored = JSON.parse(localStorage.getItem("scoreBoard"));
var users = stored || [];
var scoreOption;

$("#quiz").css("display", "none");
$("#options").css("display", "none");
$("#quiz-mode").css("display", "none");

$("#start-quiz").append(startBtn);

function labels() {
  $("#first").val(answers[0]);
  $("#second").val(answers[1]);
  $("#third").val(answers[2]);
  $("#fourth").val(answers[3]);
  $("#label1").text(answers[0]);
  $("#label2").text(answers[1]);
  $("#label3").text(answers[2]);
  $("#label4").text(answers[3]);
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

  $("#quiz").css("display", "flex");
  $("#start-quiz").css("display", "none");
  $("#options").css("display", "flex");
  $("#quiz-mode").css("display", "block");
  resultsDiv.css("display", "flex");
  nextBtn.css("display", "none");

  $("#heading").text("Git Assessment");
  $("#question").append(question);
  labels();
  resultsDiv.append(checkBtn);
  resultsDiv.append(nextBtn);

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
    var checkedNumber = $("input[type=radio]:checked").val();
    var x = questions[count].correct;
    questionTime = 15 - time;
    quizTime = 0;

    $("input[type=radio]").attr("disabled", true);
    checkBtn.css("display", "none");
    nextBtn.css("display", "block");
    messageDiv.css("display", "flex");

    clearInterval(decreaseTime);
    clearInterval(decreaseTime1);
    countdown.text(time + " seconds left");

    totalTime.push(questionTime);
    totalTime.forEach((t) => {
      quizTime += t;
    });

    if (checkedNumber != undefined) {
      responses.push(checkedNumber);
      messageDiv.text("");
    } else if (checkedNumber == undefined && time != 0) {
      messageDiv.text("No answer").css("color", "red");
    }

    if (checkedNumber == x) {
      $("input[id]:checked ~ label").css("color", "green");
      correctAnswers.push(checkedNumber);
    } else {
      $("input[id]:checked ~ label").css("color", "red");
    }

    if (count == 4) {
      nextBtn.css("display", "none");
      resultsDiv.append(completeBtn);
      completeBtn.css("display", "block");
    }
  });

  /**Records the selected answer for each question and goes to the next question when clicked */
  nextBtn.on("click", function () {
    $("input[type=radio]").attr("disabled", false);
    $("input[id]:checked ~ label").css("color", "#25282a");
    time = 15;
    nextQuestion();
    countdown.text(time + " seconds left");

    decreaseTime = setInterval(() => {
      time -= 1;
      countdown.text(time + " seconds left");

      if (time <= 0) {
        clearInterval(decreaseTime);
        checkBtn.click();
        messageDiv.text("Timeout!").css("color", "red");
      }
    }, 1000);
  });

  /**Shows quiz results */
  completeBtn.on("click", function () {
    $("#results-heading").text("Quiz-complete");
    var done = $("<h3>").text(
      "Well done! You have reached the end of the assessment."
    );
    var answered = $("<p>").text(
      `You answered ${responses.length} out of ${questions.length} questions`
    );
    var score = $("<p>").text(
      `Your score is ${correctAnswers.length} out of ${questions.length}`
    );
    var scoreTime = $("<p>").text(
      `You completed the quiz in ${quizTime} seconds`
    );
    scoreOption = $("<p>").text(
      "If you would like to add your results on the scoreboard please enter a username below:"
    );

    $("#quiz").css("display", "none");
    boardDiv.css("display", "none");
    $("#quiz-mode").css("display", "flex").text("Quiz Results");
    completeQuiz.css("display", "flex").attr("class", "complete-quiz");

    scoreDetails.append(done);
    scoreDetails.append(answered);
    scoreDetails.append(score);
    scoreDetails.append(scoreTime);
    boardInput.append(scoreOption);
    boardInput.append(nameInput);
    boardInput.append(submitBtn);
  });

  submitBtn.on("click", function () {
    var details = {
      username: "",
      points: correctAnswers.length,
      timeRecord: Number(quizTime),
    };

    details.username = nameInput.val();

    users.push(details);
    users.sort((a, b) => {
      return b.points - a.points || a.timeRecord - b.timeRecord;
    });

    scoreOption.text("Click the button below to view the score board");

    nameInput.css("display", "none");
    submitBtn.css("display", "none");
    boardDiv.css("display", "none");
    boardInput.append(viewBoard);
  });

  viewBoard.on("click", function () {
    localStorage.setItem("scoreBoard", JSON.stringify(users));

    if (stored == null) {
      users.forEach(user =>{
      var row = $("<tr>");
      var cell1 = $("<td>");
      var cell2 = $("<td>");
      var cell3 = $("<td>");

      cell1.text(user.username);
      cell2.text(user.points);
      cell3.text(user.timeRecord);

      row.append(cell1);
      row.append(cell2);
      row.append(cell3);
      $("#table").append(row);
      })
    } else{
      stored.forEach((item) => {
        var row = $("<tr>");
        var cell1 = $("<td>");
        var cell2 = $("<td>");
        var cell3 = $("<td>");

        cell1.text(item.username);
        cell2.text(item.points);
        cell3.text(item.timeRecord);

        row.append(cell1);
        row.append(cell2);
        row.append(cell3);
        $("#table").append(row);
      });
    }
      
    $("#results-heading").text("Score Board");
    scoreDetails.css("display", "none");
    boardInput.css("display", "none");
    boardDiv.css("display", "block");
  });
});
