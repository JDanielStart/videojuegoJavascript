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


//Adición de los eventos
window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);
window.addEventListener("keydown", moveByKeys);

btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function startGame() {
    game.font = elementSize + "px Verdana";
    game.textAlign = "center"; // Establece la alineación en el centro

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const x = elementSize * (colI + 0.55); // Centra horizontalmente
            const y = elementSize * (rowI + 0.85); // Centra verticalmente
            game.fillText(emoji, x, y)
        });
    });
}

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    }
    else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height", canvasSize);

    elementSize = (canvasSize / 10);

    startGame();

}

function moveByKeys(event) {

    if (event.key == "ArrowUp" || event.key == "w" || event.key == "W") {
        console.log("arriba");
    }
    else if (event.key == "ArrowLeft" || event.key == "a" || event.key == "A") {
        console.log("izquierda");
    }
    else if (event.key == "ArrowRight" || event.key == "d" || event.key == "D") {
        console.log("derecha");
    }
    else if (event.key == "ArrowDown" || event.key == "s" || event.key == "w") {
        console.log("abajo");
    }

}

function moveUp() {
    console.log("Arriba");
}

function moveLeft() {
    console.log("Izqueirda");
}

function moveRight() {
    console.log("derecha");
}

function moveDown() {
    console.log("Abajo");
}


    /* game.fillRect(0, 0, 100, 100);
    game.clearRect(0, 0, 50, 50);
    game.font = "25px Verdana";
    game.fillStyle = "purple";
    game.textAlign = "center";
    game.fillText("Zombie run", 100, 100); */