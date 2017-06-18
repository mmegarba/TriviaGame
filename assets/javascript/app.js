var gameObj =

{
  questions: [

  {
  question: ["When will the John Webb Space Telescope be launched?"],
  answers: ["2020", "2019", "2018", "2023"],
  correctAns: "2018",
  gifSearch:"James+Webb+Space"
  },

  {
  question: ["Who has the most points in NBA Playoffs History?"],
  answers: ["Michael Jordan", "Lebron James", "Bill Russell", "Wilt Chamberlain"],
  correctAns: "Lebron James",
  gifSearch:"King+James"
  }

,

{
  question: ["Who is the highest paid athlete in the World?"],
  answers: ["Christiano Ronaldo", "Lionel Messi", "Andrew Luck", "Roger Federer"],
  correctAns: "Christiano Ronaldo",
  gifSearch:"Christiano+Ronaldo"

}
,
{
question: ["If you combined all the gold every mined in the history of mankind, how much area would that fill?"],
answers: ["The area of the country luxemburg", "The area of a tennis court", "", "An average bathtub", "The empire state building"],
correctAns: "The area of a tennis court",
gifSearch:"goldmember"
}

,
{
  question: ["In what year did the Soviet Union launch Sputnik, the worlds first artificial earth satellite?"],
  answers: ["1978", "1952", "1977", "1957"],
  correctAns: "1957",
  gifSearch:"sputnik"
}
,
{

  question: ["Between 1900 and 1920, ____ was an Olympic event."],
  answers: ["Three-Legged Race", "Sack Race", "Egg on a Spoon", "Tug of War"],
  correctAns: "Tug of War",
  gifSearch:"Tug+of+war"
}
,
{
  question: ["In 2006 an Australian man tried to sell ____ on eBay. The price rose to $3,000 before eBay shut it down."],
  answers: ["His Mother in law", "A neighboor's car fleet", "Austrailia Zoo", "New Zealand"],
  correctAns: "New Zealand",
  gifSearch:"Kiwi",
}
  ]

}

var copygameObj;

function newGame(){

  copygameObj = jQuery.extend(true, {}, gameObj);

}


var gifSearch;
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
$("#Answers").after(newgif);

});


}

$(document.body).on('click', '#reset' ,function(){

newGame();
newQuestion();

});






function gameEnd(){
$("#Answers").empty();

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

var newDiv  = $("<div>");
newDiv.attr("id", "reset");
newDiv.attr("class", "answer");
// newButton.attr("class", ".userClick")
newDiv.text("Start Over?")
$("#Answers").after(newDiv);

}




function outofTime(){
  unanswered++;
  $("#Answers").empty();
  $("#Question").empty();


  $("#Question").text("Out of Time!")
  $("#Answers").text("The Correct Answer Was: " + correctAns)


  grabGiphy(gifSearch);

  copygameObj.questions.shift();
  stopTimer();

  setTimeout(function(){

  newQuestion("new")

  }, 3000);

}


function wrongAns(){

  // add in the correct answer

$("#Answers").empty();
$("#Question").empty();


$("#Question").text("Nope!")
$("#Answers").text("The Correct Answer Was: " + correctAns)

grabGiphy(gifSearch);

incorrectAnswers++;

setTimeout(function(){

newQuestion("new")

}, 5000);


}

function rightAns(){
correctAnswers++;
$("#Answers").empty();
$("#Question").empty();

$("#Question").text("Correct!")

grabGiphy(gifSearch)


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

  $("#Timer").text("Time Remaining: " + time + " Seconds");
}

}


}

function stopTimer(){

clearInterval(timer);
}



function newQuestion(){

  $("#reset").remove();
  $("#gif").remove();

  if(copygameObj.questions.length != 0)
{
  $("#Start-Game").remove();

  $("#Timer").empty();
  $("#Question").empty();
  $("#Answers").empty();

startTimer("new");


var question = copygameObj.questions[0].question[0];

  console.log(copygameObj.questions[0].question[0])
  $("#Question").text(question)

  for (var i = 0; i < copygameObj.questions[0].answers.length; i++) {

  console.log(copygameObj.questions[0].answers[i])
  var answer = copygameObj.questions[0].answers[i];


  $("#Timer").text("Time Remaining: 30 Seconds");


  var newAns = $("<div>");
  newAns.text(answer);
  newAns.attr("class", "answer");
  newAns.attr("data", answer);
  $("#Answers").append(newAns);

gifSearch = copygameObj.questions[0].gifSearch;
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



$(document.body).on('mouseover', '.answer' ,function(){
  $(this).attr("style", "background:lightgrey; border-style:solid; border-width:1px; border-color:blue;")
    });

$(document.body).on('mouseout','.answer', function(){

  $(this).attr("style", "background:yellow;")


});
