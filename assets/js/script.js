var inputDiv = $("#input-div").css("display", "none");
var quizComplete = $("#quiz-complete").css("display", "none");
var resultsDiv = $("#results-div").css("display", "none");
$("#quiz")
  .css("display", "flex")
  .css("flex-direction", "column")
  .css("align-items", "center");

  //put options in array 
var questions = [
  {
    question: "2 X 4 = ",
    answers: [6,7,8,9],
    correct: 8,
  },

  {
    question: "36 / 6 = ",
    answers: [18,6,12,8],
    correct: 6,
  },

  {
    question: "102 + 2(12 - 4) = ",
    answers: [105,124,832,118],
    correct: 118,
  },

  {
    question: "1 + 48 / 12 X 3 = ",
    answers: [13,12.25,1.36,14],
    correct: 13,
  },
  {
    question: "1 + 1 = ",
    answers: [4,3,2,1],
    correct: 2,
  },
];
var count = 0;
var answers = questions[count].answers;

function labels(){
  $("#label1").text(answers[0])
  $("#label2").text(answers[1]);
  $("#label3").text(answers[2]);
  $("#label4").text(answers[3]);
}

var startBtn = $("<button>").text("Start").css("cursor", "pointer");
var testDiv = $("#begin-quiz");
testDiv.append(startBtn);

startBtn.on("click", function () {
  var responses = [];
  startBtn.css("display", "none");
  inputDiv
    .css("display", "block")
    .css("width", "80%")
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

  inputDiv.append(displayQuestion);
  displayQuestion.append(question);
  quizComplete.css("display", "block");
  resultsDiv.css("display", "flex");

  labels()

  resultsDiv.append(checkBtn);

  //check answer btn
  checkBtn.on("click", function(){
    checkBtn.css("display", "none");
    nextBtn.css("display", "block");
  });

  //next btn
  nextBtn.on("click", function () {
    nextBtn.css("display", "none");
    checkBtn.css("display", "block");

    $("input[type=radio]").prop("checked", false);

    count = count + 1;
    answers = questions[count].answers;
    labels()
    question.text(questions[count].question);

    if(count > 4)
    {
      
    }
  });
  resultsDiv.append(nextBtn);
});


// startBtn.on("click", function(){

//     var answers = []
//     startBtn.css("display", "none")
//     inputDiv.css("display", "flex")

//     var displayQuestion = $("<h3>")
//     displayQuestion.text(questions[count])
//     testDiv.append(displayQuestion)

//     var enter = $("#submitBtn").on("click", function(){
//         var answer = $("#textarea").val()

//         if(answer != "")
//         {
//             answers.push(answer)
//         }

//         count = count + 1
//         // setTimeout(function(){

//         // }, 2000)
//         displayQuestion.text(questions[count])

//         if(count > 4)
//         {
//             testDiv.css("display", "none")
//             inputDiv.css("display", "none")
//             quizComplete.css("display", "block")

//             var congratulations = $("<h1>").text("Quiz Complete")
//             quizComplete.append(congratulations)

//             var answered = $("<p>").text(answers.length)
//             quizComplete.append(answered)
//         }

//     })

//     // setTimeout(function(){

//     // }, 300000)

// })

/* if (count == 0 && $("#third").is(":checked")) 
      {
        var message = $("<p>").text("Correct").css("color", "green");
        quizComplete.append(message);
      } 
      else 
      {
        var error = $("<p>").text("Incorrect").css("color", "red");
        quizComplete.append(error);
      } */
