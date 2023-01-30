//declare global variables
var time = 15;
var decreaseTime
var totalTime = []
var correctAnswers = []

var inputDiv = $("#input-div").css("display", "none");
var quizComplete = $("#quiz-complete").css("display", "none");
var resultsDiv = $("#results-div").css("display", "none");
var messageDiv = $("#message").css("display", "none");
var beginQuiz = $("#begin-quiz")
var quizDiv = $("#quiz")
  .css("display", "flex")
  .css("flex-direction", "column")
  .css("align-items", "center");

//put options in array
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

var startBtn = $("<button>").text("Start").css("cursor", "pointer");
var testDiv = $("#begin-quiz");
testDiv.append(startBtn);

/**Starts the quiz */
startBtn.on("click", function () {
  $("#timeout").text(time + " seconds left");
  var decreaseTime1 = setInterval(()=>{
    time -=1
    $("#timeout").text(time + " seconds left");
    if(time <= 0)
    {
      clearInterval(decreaseTime1)
    }
  }, 1000)
  
  beginQuiz.css("display", "none");
  inputDiv.css("display", "block").css("width", "80%");

  var responses = [];
  var headingDiv = $("<div>")
    .css("background-color", "grey")
    .css("text-align", "center");
  var heading = $("<h1>").text("Assessment").css("color", "white");

  inputDiv.append(headingDiv);
  headingDiv.append(heading);

  var displayQuestion = $("<div>").css("text-align", "center");
  var question = $("<h4>").text(questions[count].question);
  var checkBtn = $("<button>").text("Check Answer");
  var nextBtn = $("<button>").text("Next").css("display", "none");
  var completeBtn = $("<button>").text("Complete Quiz")

  inputDiv.append(displayQuestion);
  displayQuestion.append(question);
  quizComplete.css("display", "block");
  resultsDiv.css("display", "flex");

  labels();

  resultsDiv.append(checkBtn);

  function startTime() {
    if (time <= 0) {
      time = 15;
      checkBtn.css("display", "none")
      nextBtn.css("display", "block")
    } else {
      $("#timeout").text(time + " seconds left");
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

    if(count <= 4)
    {
      answers = questions[count].answers;
      labels();
      question.text(questions[count].question);
    }
  }


  //check answer btn
  checkBtn.on("click", function () {
    checkBtn.css("display", "none");
    nextBtn.css("display", "block");
    messageDiv.css("display", "flex");

    $("#timeout").text(time + " seconds left");

    //cannot add times 
    
    totalTime.push(time)
    
    clearInterval(decreaseTime1)
    clearInterval(decreaseTime);

    var checkedNumber = $("input[type=radio]:checked").val();
    var x = questions[count].correct;
    console.log(checkedNumber,x)

    if(checkedNumber != undefined)
    {
      responses.push(checkedNumber);
    }

    messageDiv.innerText = ""
    
    if (Number(checkedNumber) == Number(x)) {
      messageDiv.text("Correct").css("color", "green")
      .css("text-align", "center");;
      correctAnswers.push(checkedNumber)
    } else {
      messageDiv.text("Incorrect").css("color", "red")
      .css("text-align", "center");;
    }

    if(count == 4)
    {
      nextBtn.css("display", "none")
      resultsDiv.append(completeBtn)
      completeBtn.css("display","block")
    }
  });

  /**Records the selected answer for each question and goes to the next question when clicked */
  nextBtn.on("click", function () {
    //reset setInterval
    time = 15
    decreaseTime = setInterval(startTime, 1000);
    setTimeout(()=>{
      nextQuestion();
    }, 1000)
  });
  resultsDiv.append(nextBtn);

  completeBtn.on("click", function(){
    quizDiv.css("display", "none")
    beginQuiz.css("display", "block")
    startBtn.css("display", "none")
  
    var congratulations = $("<h1>").text("Quiz Complete")
    var answered = $("<p>").text(`You have answered ${responses.length} out of ${questions.length} questions`)
    var score = $("<p>").text(`Your score is ${correctAnswers.length} out of ${questions.length}`)
  
    console.log(answered)
    console.log(responses)
    
    beginQuiz.append(congratulations)
    beginQuiz.append(answered)
    beginQuiz.append(score) 
    //show correct and incorrect answers for scoreboard 
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
