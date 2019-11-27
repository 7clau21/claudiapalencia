// Gets Link for Theme Song
      var audioElement = document.createElement("audio");
      audioElement.setAttribute("src", "Assets/Spongebob Squarepants - Ending.mp3");

      // Theme Button
      $(".theme-button").on("click", function() {
        audioElement.play();
      });

      $(".pause-button").on("click", function() {
        audioElement.pause();
      });

      //Array of trivia questions with answers
var triviaQuestions = [{
    question: "Whos is Mr. Krabs' arch nemesis?",
    answerList: ["Pearl", "Squidward", "Plankton", "Mr. Snail"],
    answer: 2
},{
    question: "Who is Spongebob's Driver's Ed teacher?",
    answerList: ["Mrs. Huff", "Mrs. Colepepper", "Sandy", "Mrs. Puff"],
    answer: 3
},{
    question: "Who are the heros of Bikini Bottom?",
    answerList: ["Spongebob and Patrick", "Mermaid Man and Barnacle Boy", "Squidward and Plankton", "Sandy and Gary"],
    answer: 1
},{
    question: "When Spongebob gets sick, what is the virus called?",
    answerList: ["The flu", "The suds", "The ugly", "The virus"],
    answer: 1
},{
    question: "What's the secret formula in the Krabby Patty?",
    answerList: ["Love", "Tartar Sauce", "Spicy Ketchup", "It's never been told"],
    answer: 3
},{
    question: "What is Gary?",
    answerList: ["A dog", "A cat", "A snail", "A starfish"],
    answer: 2
},{
    question: "What instrument does Squidward play?",
    answerList: ["Trumpet", "Flute", "Clarinet", "Piano"],
    answer: 2
},{
    question: "What state is Sandy from?",
    answerList: ["Alaska", "Texas", "California", "Florida"],
    answer: 1
},{
    question: "What is Spongebob's career?",
    answerList: ["Cashier", "Fry Cook", "Buss Boy", "Restaurant Owner"],
    answer: 1
},{
    question: "What hobby does Spongebob enjoy on his time off?",
    answerList: ["Snail racing", "Jelly fishing", "Working out", "Reading"],
    answer: 1
},{
    question: "What is the town that Spongebob lives in called?",
    answerList: ["Atlantis", "Rock Bottom", "Bikini Bottom", "Shell City"],
    answer: 2
},{
    question: "In Band Geeks, what special event does Squidward's band play for?",
    answerList: ["Bikini Bowl", "Bubble Bowl", "Bikini Bottom Bowl", "Super Bowl"],
    answer: 1
},{
    question: "What is the best description for Squidwards house?",
    answerList: ["Easter Island Rock", "Easter Rockhead", "Easter Island Head", "Easter Head Rock"],
    answer: 2
},{
    question: "What is the name Mr. Krbas' daughter?",
    answerList: ["Lucy", "Betty", "Lulu", "Pearl"],
    answer: 3
},{
    question: "Patrick's last name is what?",
    answerList: ["Fish", "Star", "Starfish", "Starlove"],
    answer: 1
}];
var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
    correct: "Yes, that's right!",
    incorrect: "No, that's not it.",
    endTime: "Out of time!",
    finished: "Alright! Let's see how well you did."
}
$('#startBtn').on('click', function(){
    $(this).hide();
    newGame();
});
$('#startOverBtn').on('click', function(){
    $(this).hide();
    newGame();
});
function newGame(){
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}
function newQuestion(){
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();
    answered = true;
    
    //sets up new questions & answerList
    $('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for(var i = 0; i < 4; i++){
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({'data-index': i });
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();
    //clicking an answer will pause the time and setup answerPage
    $('.thisChoice').on('click',function(){
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}
function countdown(){
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    //sets timer to go down
    time = setInterval(showCountdown, 1000);
}
function showCountdown(){
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if(seconds < 1){
        clearInterval(time);
        answered = false;
        answerPage();
    }
}
function answerPage(){
    $('#currentQuestion').empty();
    $('.thisChoice').empty(); //Clears question page
    $('.question').empty();
    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    $('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
    //checks to see correct, incorrect, or unanswered
    if((userSelect == rightAnswerIndex) && (answered == true)){
        correctAnswer++;
        $('#message').html(messages.correct);
    } else if((userSelect != rightAnswerIndex) && (answered == true)){
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    } else{
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
    }
    
    if(currentQuestion == (triviaQuestions.length-1)){
        setTimeout(scoreboard, 5000)
    } else{
        currentQuestion++;
        setTimeout(newQuestion, 5000);
    }   
}
function scoreboard(){
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();
    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
};