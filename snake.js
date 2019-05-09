//sets the starting pixel for the snake & food
let pixel = 30;
        

//creates snake array
let snake = [];
snake[0] = {
    x: 15 * 5,
    y: 16 * 5
}

//next line allows the apple to be placed randomly on the canvas
let apple = {
    x: Math.floor(Math.random() * 20) * pixel,
    y: Math.floor(Math.random() * 19) * pixel
}

//sets and creates the score variable
let newScore = 0;
let scoreText = "Score: ";

//new snake speed used within a 30x30 grid
let newSnakeSpeed = 5;

let snakeDirection;

document.addEventListener('keydown', direction);

//Creates function for snake movemenet with arrow keys
function direction(event) {
    let key = event.keyCode;
    if (key == 37 && snakeDirection != "RIGHT") {
        snakeDirection = "LEFT";
    }
    else if (key == 38 && snakeDirection != "DOWN") {
        snakeDirection = "UP";
    }
    else if (key == 39 && snakeDirection != "LEFT") {
        snakeDirection = "RIGHT";
    }
    else if (key == 40 && snakeDirection != "UP") {
        snakeDirection = "DOWN";
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
    if (snakeDirection == "LEFT") snakeX -= 5;
    if (snakeDirection == "UP") snakeY -= 5;
    if (snakeDirection == "RIGHT") snakeX += 5;
    if (snakeDirection == "DOWN") snakeY += 5;

    if (Math.abs(snakeX - apple.x) < pixel && Math.abs(snakeY - apple.y) < pixel) {
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
    requestAnimationFrame(drawEverything)   
}
drawEverything();
//calls draw function
//let framesPerSecond = 30;
//let game = setInterval(drawEverything, 1500 / framesPerSecond);

