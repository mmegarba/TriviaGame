var questions = [

{
question: ["What was the first CGI movie Bro"],
answers: ["A bugs Life", "Monsters Inc", "Toy Story", "The Lion King"],
correctAns: "A bugs Life",
},

{
question: ["Who is DA GOAT"],
answers: ["michael jordan", "King James"],
correctAns: "King James",
}

]

var correctAns;
var time = 30;

function startTimer(){


var timer = setInterval(function(){myTimer()},1000);


function myTimer(){


  time--;

  $("#Timer").text(time);

}

function stopTimer(){

clearInterval(timer);

}
}


function newQuestion(){



  $("#Start-Game").remove();

  $("#Timer").empty();
  $("#question").empty();
  $("#Answers").empty();

startTimer();


var question = questions[0].question[0];

  console.log(questions[0].question[0])
  $("#Question").text(question)

  for (var i = 0; i < questions[0].answers.length; i++) {

  console.log(questions[0].answers[i])
  var answer = questions[0].answers[i];


  var newAns = $("<div>");
  newAns.text(answer);
  newAns.attr("class", "answer");
  newAns.attr("data", answer);
  $("#Answers").append(newAns);

correctAns = questions[0].correctAns;

  }

}



$("#Start-Game").on("click", function(){

newQuestion();


});



$("#Answers").on("click", ".answer", function() {

  if($(this).attr("data") === correctAns)

  {
    questions.shift();
    newQuestion();

  }



});
