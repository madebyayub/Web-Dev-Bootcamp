var limit = document.getElementById("limit");
var numInput = document.querySelector("input");
var end = numInput.value;
var p1Button = document.getElementById("player1");
var p2Button = document.getElementById("player2");
var reset_btn = document.getElementById("reset-btn");
var p1ScoreLabel = document.getElementById("p1");
var p2ScoreLabel = document.getElementById("p2");
var p1Score = parseInt(p1ScoreLabel.textContent);
var p2Score = parseInt(p2ScoreLabel.textContent);
var gameOver = false;

numInput.addEventListener("change", function(){
    limit.textContent = numInput.value;
    end = numInput.value;
});

p1Button.addEventListener("click", function(){
    if (!gameOver){
        p1Score++;
        p1ScoreLabel.textContent = p1Score;
        if (p1Score >= end){
            gameOver = true;
            p1ScoreLabel.classList.add("win");
            p2ScoreLabel.classList.add("lose");
        }
    }
});

p2Button.addEventListener("click", function(){
    if (!gameOver){
        p2Score++;
        p2ScoreLabel.textContent = p2Score;
        if (p2Score >= end){
            gameOver = true;
            p2ScoreLabel.classList.add("win");
            p1ScoreLabel.classList.add("lose");
        }
    }
});

reset_btn.addEventListener("click", function(){
    gameOver = false;
    p1ScoreLabel.textContent = 0;
    p1Score = 0;
    p2ScoreLabel.textContent = 0;
    p2Score = 0;
    p2ScoreLabel.classList.remove("win");
    p2ScoreLabel.classList.remove("lose");
    p1ScoreLabel.classList.remove("lose");
    p1ScoreLabel.classList.remove("win");

});