
var buttonColor = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
  if(!started){
        nextSquence();
        $("#level-title").text("level "+ level);
        started = true;
      }
});

$(".btn").click(function() {
var userChoosenColor = $(this).attr("id");
userClickedPattern.push(userChoosenColor);
playSound(userChoosenColor);
animatePress(userChoosenColor);
checkAnswer(userClickedPattern.length-1);
});
function nextSquence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level "+ level);
  var randomnumber = Math.floor(Math.random()*4);
  var randomChoosenColor = buttonColor[randomnumber];
  gamePattern.push(randomChoosenColor);
  $("#" + randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);

}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSquence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200);
    startOver();
  }
}

function playSound(name) {
  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();
}

function animatePress(currentColor) {
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
            $("#"+ currentColor).removeClass("pressed");
        },100);
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
