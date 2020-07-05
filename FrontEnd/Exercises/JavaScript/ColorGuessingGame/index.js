var numSquares = 6
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorLabel = document.getElementById("color");
colorLabel.textContent = pickedColor.toUpperCase();
var messageDisplay = document.querySelector("#message");
var reset = document.querySelector("#reset");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");
var h1 = document.querySelector("h1");

function generateRandomColors(num){
    var arr = [];
    for (var i = 0; i < num; i++){
        var red = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        var blue = Math.floor(Math.random() * 256);
        var str = ("rgb(" + red + ", " + green + ", " + blue + ")");
        arr[i] = str;
    }
    return arr;
}

function pickColor(){
    var rand = Math.floor(Math.random() * colors.length);
    return colors[rand];
}

function changeColors(color){
    for (var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

easy.addEventListener("click", function(){
    numSquares = 3;
    easy.classList.add("selected");
    hard.classList.remove("selected");
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorLabel.textContent = pickedColor.toUpperCase();
    for (var i = 0; i < squares.length; i++){
        if (colors[i]){
            squares[i].style.backgroundColor = colors[i];
        }else{
            squares[i].style.display = "none";
        }
    }
    messageDisplay.textContent = "";
});

hard.addEventListener("click", function(){
    numSquares = 6;
    easy.classList.remove("selected");
    hard.classList.add("selected");
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorLabel.textContent = pickedColor.toUpperCase();
    for (var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = colors[i];
        squares[i].style.display = "block";
    }
    messageDisplay.textContent = "";
});

reset.addEventListener("click", function(){
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorLabel.textContent = pickedColor.toUpperCase();
    for (var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = colors[i];
    }
    this.textContent = "New Colors";
    messageDisplay.textContent = "";
    h1.style.backgroundColor = "steelblue";
});

for (var i = 0; i < squares.length; i++){
    // Assign the colors background
    squares[i].style.backgroundColor = colors[i];
    // Add the listener events
    squares[i].addEventListener("click", function(){
        if (this.style.backgroundColor == pickedColor){
            messageDisplay.textContent = "Correct!";
            reset.textContent = "Play Again?";
            changeColors(pickedColor);
            h1.style.backgroundColor = pickedColor;
        }else{
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try Again";
        }
    });
}

