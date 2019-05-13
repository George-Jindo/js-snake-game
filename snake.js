//sets the starting pixel for the snake & food
let pixel = 30;
        

//creates snake array
let snake = [];
snake[0] = {
    x: pixel,
    y: pixel
}

//next line allows the apple to be placed randomly on the canvas
let apple = {
    x: Math.floor(Math.random() * 20) * pixel,
    y: Math.floor(Math.random() * 19) * pixel
}

//sets and creates the score variable
let newScore = 0;
let scoreText = "Score: ";

//new snake grid
let currentSnakeDirection = 'RIGHT';
let newSnakeDirection;

document.addEventListener('keydown', direction);

//Creates function for snake movemenet with arrow keys
function direction(event) {
    let key = event.keyCode;
    if (key == 37 && currentSnakeDirection != "RIGHT") {
        currentSnakeDirection = "LEFT";
    }
    else if (key == 38 && currentSnakeDirection != "DOWN") {
        currentSnakeDirection = "UP";
    }
    else if (key == 39 && currentSnakeDirection != "LEFT") {
        currentSnakeDirection = "RIGHT";
    }
    else if (key == 40 && currentSnakeDirection != "UP") {
        currentSnakeDirection = "DOWN";
    }
}


function drawEverything() {
    const ctx = document.getElementById("gameCanvas").getContext('2d');            
    
    ctx.fillStyle = "#2a2a2a";
    ctx.fillRect(0, 30, gameCanvas.width, gameCanvas.height);
    ctx.strokeStyle = "white";
    ctx.strokeRect(0, 30, gameCanvas.width, gameCanvas.height);

    //draws snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "red" : "white";
        ctx.fillRect(snake[i].x, snake[i].y +4.66, pixel, pixel);

        ctx.strokeStyle = (i ==0) ? "white" : "black";
        ctx.strokeRect(snake[i].x, snake[i].y +4.66, pixel, pixel);
    }

    //draws apple
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(apple.x + 15, apple.y + 15, 10, 0, Math.PI * 2, true);
    ctx.fill();

    //old snake head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    //moves snake according to which direction the user initiates
    if (currentSnakeDirection == "LEFT") snake[0].x -= 5;
    if (currentSnakeDirection == "UP") snake[0].y -= 5;
    if (currentSnakeDirection == "RIGHT") snake[0].x += 5;
    if (currentSnakeDirection == "DOWN") snake[0].y += 5;

    if (snakeX == apple.x && snakeY == apple.y) {
        newScore++;
        apple = {
            x: Math.floor(Math.random() * 19 + 1) * pixel,
            y: Math.floor(Math.random() * 18 + 1) * pixel
        }
    } else {
        //remove the tail
        snake.pop();
    }

    //collision detection
    if (snakeX < 0 || snakeX > gameCanvas.width - 30 || snakeY < 0 + 30 || snakeY > gameCanvas.height - 30) {
        clearInterval(game);
    }
    

    //new head creation
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //creates the new head
    snake.unshift(newHead);
    
    ctx.fillStyle = "#2a2a2a";
    ctx.fillRect(0, 0, 600, 30);            

    ctx.fillStyle = "green";
    ctx.font = "20px arial";
    ctx.fillText(scoreText + newScore, pixel / 2, pixel / 1.5);
      
}

//calls draw function
//let framesPerSecond = 30;
let game = setInterval(drawEverything, 100);

