const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

let canvasSize = 0;
let elementSize = 0;

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function startGame() {
    game.font = elementSize + "px Verdana";
    game.textAlign = "center"; // Establece la alineación en el centro

    const map = maps[1];
    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map(row => row.trim().split(""));

    // Centro del canvas
    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;

    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            const emoji = emojis[mapRowCols[i - 1][j - 1]];
            
            // Desplazamiento en X e Y para centrar el texto en la celda
            const xOffset = elementSize / 2;
            const yOffset = elementSize / 2;
            
            const x = centerX + (i - 5) * elementSize - xOffset; // Centra horizontalmente
            const y = centerY + (j - 5) * elementSize - yOffset; // Centra verticalmente

            game.fillText(emoji, x, y);
        }
    }
}

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    }
    else {
        canvasSize = window.innerHeight * 0.8;
    }

    // Centro del canvas
    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;

    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height", canvasSize);

    elementSize = (canvasSize / 11);

    startGame();

}


    /* game.fillRect(0, 0, 100, 100);
    game.clearRect(0, 0, 50, 50);
    game.font = "25px Verdana";
    game.fillStyle = "purple";
    game.textAlign = "center";
    game.fillText("Zombie run", 100, 100); */