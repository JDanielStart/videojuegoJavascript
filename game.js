//Variables globales fijas de HTML
const canvas = document.querySelector("#game");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const htmlLives = document.querySelector("#lives");
const time = document.querySelector("#time");
const htmlRecord = document.querySelector("#record");

//Variables globales cambiantes
let canvasSize = 0;
let elementSize = 0;
let level = 0;
let lives = 3;
let record;

let timeStart;
let timePlayer;
let timeInterval;

let trees = [[]];
let map;
let mapRows;
let mapRowCols;

//Variables globales fijas de javascript
const game = canvas.getContext("2d");
const playerPosition = {
    x: undefined,
    y: undefined
}
const foodPosition =  {
    x: undefined,
    y: undefined
}

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

    //Guardamos la configuramos el tamaño del canvas
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    }
    else {
        canvasSize = window.innerHeight * 0.8;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
    }

    if (record === undefined) {
        if (localStorage.getItem("record") === null) {
            localStorage.setItem("record", 0);
            record = 0;
            console.log("No exite aun un record");
        }
        else {
            record = parseFloat(localStorage.getItem("record"));
            console.log("Existe un record y se esta cargando");
        }
    }

    //Iniciamos el tamaño del canvas para renderizar
    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height", canvasSize);

    //Iniciamos el tamaño y atributos de los elementos del canvas a renderizar
    map = maps[level];
    mapRows = map.trim().split("\n");
    mapRowCols = mapRows.map(row => row.trim().split(""));

    //Iniciamos el tamaño de sus elementos y lo configuramos
    elementSize = (canvasSize / 10);
    game.font = elementSize + "px Verdana";
    game.textAlign = "center"; // Establece la alineación en el centro

    //Comprobamos donde estan los arboles y mostramos los datos del jugador
    trees = Array(10).fill(false).map(() => Array(10).fill(false));
    showLives();
    showRecord();

    //Recorremos el mapa y configuramos el juego
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
            else if (col == "I") {
                foodPosition.x = colI;
                foodPosition.y = rowI;
            }
            else if (col == "X") {
                trees[colI][rowI] = true;
            }
        });
    });
    movePlayer();
}

function showLives() {
    const hearthArray = Array(lives).fill(emojis["HEARTH"]);
    htmlLives.innerHTML = "";
    hearthArray.forEach(hearth => htmlLives.append(hearth));
}

function convertToTime(miliseconds) {
    const segundos = Math.floor(miliseconds / 1000); // Convertir a segundos
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;

    // Formatear minutos y segundos con dos dígitos
    const minutosFormateados = minutos.toString().padStart(2, '0');
    const segundosFormateados = segundosRestantes.toString().padStart(2, '0');

    return { minutos: minutosFormateados, segundos: segundosFormateados };
}

function showTime() {
    timePlayer = Date.now() - timeStart;
    const coversion = convertToTime(timePlayer);
    time.innerHTML = coversion.minutos + ":" + coversion.segundos;
}

function showRecord() {
    const recordTime = convertToTime(record);
    htmlRecord.innerHTML = recordTime.minutos + ":" + recordTime.segundos;
}

//Pasamos al siguiente nivel
function nextLevel() {
    if (level + 1 < maps.length) {
        level++;
        restartPlayer();
    }
    else {
        gameWin();
    }
}

//Perdemos el nivel
function failLevel() {
    lives--;

    if (lives > 0) {
        restartPlayer();
    }
    else {
        lives = 3;
        level = 0;
        timeStart = undefined;
        restartPlayer();
    }
}

//Colocamos al jugador en la salida
function restartPlayer() {
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

//Ganar el juego
function gameWin() {
    console.log("Ganastes el juego!!");
    clearInterval(timeInterval);
    const pastRecord = parseFloat(localStorage.getItem("record"));
    if (timePlayer < pastRecord || pastRecord == 0) {
        localStorage.setItem("record", timePlayer);
        record = localStorage.getItem("record", timePlayer);
        showRecord();
    }
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
    const foodCollisionX = playerPosition.x == foodPosition.x;
    const foodCollisionY = playerPosition.y == foodPosition.y;
    const foodCollision = foodCollisionX && foodCollisionY;

    const treeCollision = trees[playerPosition.x][playerPosition.y];

    if (foodCollision) {
        nextLevel();
    }
    else if (treeCollision) {
        failLevel();
    }

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