var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "yellow", "blue", "green"];
var level = 0;
var gameStarted = false; // Track if game has started

// Detect keypress to start or restart the game
$(document).keypress(function () {
    if (!gameStarted) {
        startGame();
    }
});

function startGame() {
    // Reset everything before starting a new game
    gameStarted = true;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    
    $("h1").text("Level 0");
    nextSequence();
}

function nextSequence() {
    userClickedPattern = []; // Reset user input for new level
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    show(randomChosenColor);
}

$(".btn").on("click", function () {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
    }
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function show(color) {
    $("#" + color).fadeOut(90).fadeIn(90);
    playSound(color);
}

function gameOver() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press any key to restart");

    gameStarted = false; // Allow any key to restart
}
