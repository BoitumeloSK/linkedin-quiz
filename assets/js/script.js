var decreaseTime;
var questionTime;
var quizTime;
var totalTime = [];
var correctAnswers = [];
var responses = [];
var count = 0;
var countdown = $('#countdown')
var resultsDiv = $('#results-div').css('display', 'none');
var messageDiv = $('#message').css('display', 'none');
var completeQuiz = $('#complete-quiz').css('display', 'none')

var questions = [
  {
    question: 'Which command is used to create a .git folder in the existing project directory?',
    answers: [
      'git add', 
      'git init', 
      'git gui', 
      'git diff'],
    correct: 'git init',
  },

  {
    question: 'In version control a database server that contains all the files and their history is called___',
    answers: [
      'clone',
      'copy', 
      'repository', 
      'branch'],
    correct: 'repository',
  },

  {
    question: 'To bring together changes made from different sources which operation is used in version control?',
    answers: [
      'merge', 
      'pull', 
      'push', 
      'commit'],
    correct: 'merge',
  },

  {
    question: 'What command lets you create a connection between a local and remote repository?',
    answers: [
      'git remote add new', 
      'git remote new origin', 
      'git remote origin', 
      'git remote add origin'],
    correct: 'git remote add origin',
  },
  {
    question: 'Which command gets a copy of an existing Git repository',
    answers: [
      'copy', 
      'replicate', 
      'clone', 
      'duplicate'],
    correct: 'clone',
  },
];

var answers = questions[count].answers;
var startBtn = $('<button>').text('Start');
var heading = $('<p>').text('Git Assessment');
var question = $('<p>').css('text-align','center');
var checkBtn = $('<button>').text('Check Answer').attr('class', 'check-btn');
var nextBtn = $('<button>').text('Next').attr('class', 'next-btn');
var completeBtn = $('<button>').text('Complete Quiz').attr('class', 'complete-btn');
var detailsDiv = $('<div>').attr('class', 'format-content');
var scoreDiv = $('<div>').attr('class', 'format-content');
//var alertDiv = $('<div>');
var boardDiv = $('<div>');
//var alert = $('<p>').text('Please choose a different username');
var nameInput = $('<input>').attr('type', 'text');
var submitBtn = $('<button>').text('Submit').attr("class", "submit-btn");
var viewBoard = $('<button>').text('View Score Board').attr('class', 'leader-board');
var stored = JSON.parse(localStorage.getItem('scoreBoard'));
var users = stored || [];

$('#quiz').css('display', 'none');
$('#options').css('display', 'none');
$('#quiz-mode').css('display', 'none');

$('#start-quiz').append(startBtn);

function labels() {
  $('#first').val(answers[0]);
  $('#second').val(answers[1]);
  $('#third').val(answers[2]);
  $('#fourth').val(answers[3]);
  $('#label1').text(answers[0]);
  $('#label2').text(answers[1]);
  $('#label3').text(answers[2]);
  $('#label4').text(answers[3]);
}

/**Starts the quiz */
startBtn.on('click', function () {
  var time = 15;
  var decreaseTime1 = setInterval(() => {
    time -= 1;
    countdown.text(time + ' seconds left');
    if (time <= 0) {
      clearInterval(decreaseTime1);
      checkBtn.click();
      messageDiv.text('Timeout!').css('color', 'red');
    }
  }, 1000);

  question.text(questions[count].question);
  countdown.text(time + ' seconds left');

  $('#quiz').css('display', 'flex')
  $('#start-quiz').css('display', 'none');
  $('#options').css('display', 'flex');
  $('#quiz-mode').css('display', 'block');
  resultsDiv.css('display', 'flex');
  nextBtn.css('display', 'none');

  $('#heading').append(heading);
  $('#question').append(question);
  labels();
  resultsDiv.append(checkBtn);
  resultsDiv.append(nextBtn);

  function startTime() {
    countdown.text(time + ' seconds left');
    time -= 1;
    if (time <= 0) {
      clearInterval(decreaseTime);
      checkBtn.click();
      messageDiv.text('Timeout!').css('color', 'red');
    }
  }

  function nextQuestion() {
    nextBtn.css('display', 'none');
    checkBtn.css('display', 'block');
    messageDiv.css('display', 'none');
    $('input[type=radio]').prop('checked', false);
    countdown.text(time + ' seconds left');
    count = count + 1;

    if (count <= 4) {
      answers = questions[count].answers;
      labels();
      question.text(questions[count].question);
    }
  }

  /**Stops the timer and checks if the selected answer is the correct number for the question */
  checkBtn.on('click', function () {
    $('input[type=radio]').attr('disabled', true);
    clearInterval(decreaseTime);
    var checkedNumber = $('input[type=radio]:checked').val();
    var x = questions[count].correct;
    questionTime = 15 - time;
    quizTime = 0;

    checkBtn.css('display', 'none');
    nextBtn.css('display', 'block');
    messageDiv.css('display', 'flex');

    clearInterval(decreaseTime1);

    totalTime.push(questionTime);
    totalTime.forEach((t) => {
      quizTime += t;
    });

    if (checkedNumber != undefined) {
      responses.push(checkedNumber);
    }

    if (checkedNumber == x) {
      $('input[id]:checked ~ label').css('color', 'green')
      correctAnswers.push(checkedNumber);
    } else {
      $('input[id]:checked ~ label').css('color', 'red')
    }

    if (count == 4) {
      nextBtn.css('display', 'none');
      resultsDiv.append(completeBtn);
      completeBtn.css('display', 'block');
    }
  });

  /**Records the selected answer for each question and goes to the next question when clicked */
  nextBtn.on('click', function () {
    $('input[type=radio]').attr('disabled', false);
    $('input[id]:checked ~ label').css('color', '#25282a')
    time = 15;
    nextQuestion();
    decreaseTime = setInterval(startTime, 1000);
  });

  /**Shows quiz results */
  completeBtn.on('click', function () {
    var congratulations = $('<p>').text('Quiz Complete').attr('class', 'results-heading');
    var answered = $('<p>').text(
      `You have answered ${responses.length} out of ${questions.length} questions`
    );
    var score = $('<p>').text(
      `Your score is ${correctAnswers.length} out of ${questions.length}`
    );
    var scoreTime = $('<p>').text(
      `You completed the quiz in ${quizTime} seconds`
    );
  
    $('#quiz').css('display', 'none');
    $('#quiz-mode').css('display', 'flex').text('Quiz Results');
    completeQuiz.css('display', 'flex').attr('class','complete-quiz')


    completeQuiz.append(detailsDiv);
    detailsDiv.append(congratulations);
    detailsDiv.append(answered);
    detailsDiv.append(score);
    detailsDiv.append(scoreTime);
    //completeQuiz.append(alertDiv);
    completeQuiz.append(scoreDiv);
    scoreDiv.append(nameInput);
    scoreDiv.append(submitBtn);
  });

  submitBtn.on('click', function () {
    var details = {
      username: '',
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

    scoreDiv.css('display', 'none');
    detailsDiv.css('display', 'none');
    //alertDiv.css('display', 'none');

    completeQuiz.append(boardDiv);
    boardDiv.append(viewBoard);
  });

  viewBoard.on('click', function(){
    viewBoard.css('display', 'none')
    localStorage.setItem('scoreBoard', JSON.stringify(users));
      if (stored == null) {
        boardDiv.append(
          $('<div>').text(
            `${details.username} | ${details.points} | ${details.timeRecord}`
          )
        );
      } else {
        stored.forEach((item) => {
          boardDiv.append(
            $('<div>').text(
              `${item.username} | ${item.points} | ${item.timeRecord}`
            )
          );
        });
      }
  })
});

