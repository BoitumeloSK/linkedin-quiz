var inputDiv = $("#input-div").css("display", "none")
var quizComplete = $("#quiz-complete").css("display", "none")

var questions = [
    "2 X 4 = ",
    "36 / 6 = ",
    "102 X 2 + (12 - 4) = ",
    "1 + 48 / 12 X 3 = ",
    "1 + 1 = "
]
var count = 0

var startBtn = $("<button>").text("Start").css("cursor", "pointer")

var testDiv = $("#begin-quiz")
testDiv.append(startBtn)


startBtn.on("click", function(){
    
    var answers = []
    startBtn.css("display", "none")
    inputDiv.css("display", "flex")
           
    var displayQuestion = $("<h3>")
    displayQuestion.text(questions[count])
    testDiv.append(displayQuestion)

    var enter = $("#submitBtn").on("click", function(){
        var answer = $("#textarea").val()


        if(answer != "")
        {
            answers.push(answer)
        }
        
        count = count + 1
        // setTimeout(function(){
            
        // }, 2000)
        displayQuestion.text(questions[count])

        if(count > 4)
        {
            testDiv.css("display", "none")
            inputDiv.css("display", "none")
            quizComplete.css("display", "block")

            var congratulations = $("<h1>").text("Quiz Complete")
            quizComplete.append(congratulations)

            var answered = $("<p>").text(answers.length)
            quizComplete.append(answered)
        }

    })

    // setTimeout(function(){

    // }, 300000)
     
})
