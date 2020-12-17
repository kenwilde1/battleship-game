import Game from "./modules/Game";

const newGame = new Game();
newGame.initializeGameboard();

const startGameButton = document.querySelector(".header button");
startGameButton.addEventListener("click", () => newGame.startGame());

const rotateShipsButton = document.querySelector("#rotate-ships");
rotateShipsButton.addEventListener("click", () => newGame.rotateShips());

newGame.dragShips();
