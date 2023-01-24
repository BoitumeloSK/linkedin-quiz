var inputDiv = $("#input-div").css("display", "none");
var quizComplete = $("#quiz-complete").css("display", "none");
var resultsDiv = $("#results-div").css("display", "none");
$("#quiz").css("display","flex").css("flex-direction", "column").css("align-items", "center")

var questions = [
  {
    question: "2 X 4 = ",
    answers: {
      first: 6,
      second: 7,
      //answer
      third: 8,
      fourth: 9,
    },
    correct: "third",
  },

  {
    question: "36 / 6 = ",
    answers: {
      first: 18,
      //answer
      second: 6,
      third: 12,
      fourth: 8,
    },
    correct: "second",
  },

  {
    question: "102 + 2(12 - 4) = ",
    answers: {
      first: 105,
      second: 124,
      third: 832,
      //answer
      fourth: 118,
    },
    correct: "fourth",
  },

  {
    question: "1 + 48 / 12 X 3 = ",
    answers: {
      //answer
      first: 13,
      second: 12.25,
      third: 1.36,
      fourth: 14,
    },
    correct: "first",
  },
  {
    question: "1 + 1 = ",
    answers: {
      first: 4,
      second: 3,
      third: 2,
      //answer
      fourth: 1,
    },
    correct: "fourth",
  },
];
var count = 0;

var startBtn = $("<button>").text("Start").css("cursor", "pointer");

var testDiv = $("#begin-quiz");
testDiv.append(startBtn);

startBtn.on("click", function () {
  var responses = [];
  startBtn.css("display", "none");
  inputDiv
    .css("display", "block")
    .css("width", "80%")
    .css("border", "black 1px")
    .css("border-radius", "4px");
  var headingDiv = $("<div>")
    .css("background-color", "grey")
    .css("text-align", "center");
  var heading = $("<h1>").text("Assessment").css("color", "white");

  inputDiv.append(headingDiv);
  headingDiv.append(heading);

  var displayQuestion = $("<div>").css("text-align", "center");
  var question = $("<h4>").text(questions[count].question);

  inputDiv.append(displayQuestion);
  displayQuestion.append(question);
  quizComplete.css("display", "block");
  resultsDiv.css("display", "flex");

  var answers = questions[count].answers;

  $("#first").text(answers.first);
  $("#label1").text(answers.first);
  $("#second").text(answers.second);
  $("#label2").text(answers.second);
  $("#third").text(answers.third);
  $("#label3").text(answers.third);
  $("#fourth").text(answers.fourth);
  $("#label4").text(answers.fourth);

  
  var checkBtn = $("<button>").text("Check Answer")
  var nextBtn = $("<button>").text("Next").css("display","none")
  resultsDiv.append(checkBtn);

  checkBtn.on("click", function () {
     checkBtn.css("display", "none")
     nextBtn.css("display", "block")
    });
  

  nextBtn.on("click", function(){
    nextBtn.css("display","none")
    checkBtn.css("display","block")
    $("input[type=radio]").prop("checked", false)
    count = count + 1
    answers = questions[count].answers
    question.text(questions[count].question)
    
  })
  resultsDiv.append(nextBtn)
  
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