var gameObj =

{
  questions: [

  {
  question: ["What was the first CGI movie Bro"],
  answers: ["A bugs Life", "Monsters Inc", "Toy Story", "The Lion King"],
  correctAns: "Toy Story",
  gifSearch:"Toy+Story"
  },

  {
  question: ["Who is DA GOAT"],
  answers: ["Michael Jordan", "King James"],
  correctAns: "King James",
  gifSearch:"Lebron+James"
  }

  ]

}

var copygameObj;

function newGame(){

  copygameObj = jQuery.extend(true, {}, gameObj);

}



var correctAns;
var time;
var timer;

var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered= 0;


function grabGiphy(searchTerm){
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=1";

console.log(searchTerm);

$.ajax({
url:queryURL,
method:"GET",

}).done(function(response){
console.log(response);
console.log(response.data[0].embed_url);

var newgif = $("<img>")
newgif.attr("src", response.data[0].images.fixed_height.url)
newgif.attr("id", "gif")
$("#Question").after(newgif);

});


}

$(document.body).on('click', '#reset' ,function(){

newGame();
newQuestion();

});






function gameEnd(){
$("#Answers").empty();
alert("game END")

var newCorrect = $("<div>");
var newIncorrect = $("<div>");
var newUnanswered = $("<div>");

newCorrect.text("Correct Answers: "  + correctAnswers);
$("#Answers").append(newCorrect)
newIncorrect.text("Incorrect Answers: " + incorrectAnswers);
$("#Answers").append(newIncorrect)
newUnanswered.text("Unanswered: " + unanswered);
$("#Answers").append(newUnanswered)

$("#Question").text("All Done Here is How you Did!")

var newButton  = $("<button>");
newButton.attr("id", "reset");
newButton.text("Reset")
$("#Question").after(newButton);

}




function outofTime(){
  unanswered++;
  copygameObj.questions.shift();
  stopTimer();

  setTimeout(function(){

  newQuestion("new")

  }, 3000);

}


function wrongAns(){
alert("NOPE!");
incorrectAnswers++;

setTimeout(function(){

newQuestion("new")

}, 3000);


}

function rightAns(){
correctAnswers++;

alert("YES!");

grabGiphy(copygameObj.questions[0].gifSearch)


setTimeout(function(){


newQuestion("new")


},3000);

copygameObj.questions.shift();


}





function startTimer(x){



if(x === "new");
{
  time=30;
}

 timer = setInterval(function(){myTimer()},1000);


function myTimer(){

  if(time === 0)
  {
    outofTime();
  }
  else{

  time--;

  $("#Timer").text(time);
}

}


}

function stopTimer(){

clearInterval(timer);
}



function newQuestion(){

  $("#gif").remove();

  if(copygameObj.questions.length != 0)
{
  $("#Start-Game").remove();

  $("#Timer").empty();
  $("#question").empty();
  $("#Answers").empty();

startTimer("new");


var question = copygameObj.questions[0].question[0];

  console.log(copygameObj.questions[0].question[0])
  $("#Question").text(question)

  for (var i = 0; i < copygameObj.questions[0].answers.length; i++) {

  console.log(copygameObj.questions[0].answers[i])
  var answer = copygameObj.questions[0].answers[i];


  var newAns = $("<div>");
  newAns.text(answer);
  newAns.attr("class", "answer");
  newAns.attr("data", answer);
  $("#Answers").append(newAns);

correctAns = copygameObj.questions[0].correctAns;

  }

}
else {
gameEnd();

}

}

$("#Start-Game").on("click", function(){

newGame();
newQuestion();


});



$("#Answers").on("click", ".answer", function() {

  if($(this).attr("data") === correctAns)

  {
    stopTimer();
    rightAns();

  }

  else{


    stopTimer();
    copygameObj.questions.shift();
    wrongAns();
  }



});
