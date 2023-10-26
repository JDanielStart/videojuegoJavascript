//Variables globales fijas de HTML
const canvas = document.querySelector("#game");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

//Variables globales fijas de javascript
const game = canvas.getContext("2d");
const map = maps[0];
const mapRows = map.trim().split("\n");
const mapRowCols = mapRows.map(row => row.trim().split(""));
const playerPosition = {
    x: undefined,
    y: undefined
}

//Variables globales cambiantes
let canvasSize = 0;
let elementSize = 0;

//Adición de los eventos de ventana
window.addEventListener("load", startGame);
window.addEventListener("resize", startGame);
window.addEventListener("keydown", moveByKeys);

//Adición de los eventos de html
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

//Renderiza el juego
function startGame() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    }
    else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height", canvasSize);
    elementSize = (canvasSize / 10);
    game.font = elementSize + "px Verdana";
    game.textAlign = "center"; // Establece la alineación en el centro

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];

            game.fillText(emoji, renderElementX(colI), renderElementY(rowI));

            if (col == "O") {
                if (playerPosition.x === undefined && playerPosition.y === undefined) {
                    playerPosition.x = colI;
                    playerPosition.y = rowI;
                }
            }
        });
    });
    movePlayer();
}

//Calculamos la posición x de un elemento
function renderElementX(x) {
    return elementSize * (x + 0.55); // Centra horizontalmente
}

//Calculamos la posición y de un elemento
function renderElementY(y) {
    return elementSize * (y + 0.85); // Centra verticalmente
}

//Renderizamos la nueva posición del jugador
function movePlayer() {
    game.fillText(emojis["PLAYER"], renderElementX(playerPosition.x), renderElementY(playerPosition.y));
}

//Comprobamos si se pulsa los botones indicados para mover el jugador
function moveByKeys(event) {

    if (event.key == "ArrowUp" || event.key == "w" || event.key == "W") {
        moveUp();
    }
    else if (event.key == "ArrowLeft" || event.key == "a" || event.key == "A") {
        moveLeft();
    }
    else if (event.key == "ArrowRight" || event.key == "d" || event.key == "D") {
        moveRight();
    }
    else if (event.key == "ArrowDown" || event.key == "s" || event.key == "S") {
        moveDown();
    }

}

function moveUp() {
    if ((renderElementY(playerPosition.y) - elementSize) < 0) {
        console.log("Reproducir sonido")
    }
    else {
        playerPosition.y--;
        startGame();
    }
}

function moveLeft() {
    if ((renderElementX(playerPosition.x) - elementSize) < 0) {
        console.log("Reproducir sonido")
    }
    else {
        playerPosition.x--; 
        startGame();
    }
}

function moveRight() {
    if ((renderElementX(playerPosition.x) + elementSize) > canvasSize) {
        console.log("Reproducir sonido")
    }
    else {
        playerPosition.x++;
        startGame();
    }
}

function moveDown() {
    if ((renderElementY(playerPosition.y) + elementSize) > canvasSize) {
        console.log("Reproducir sonido")
    }
    else {
        playerPosition.y++;
        startGame();
    }
}