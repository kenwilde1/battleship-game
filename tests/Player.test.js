import Player from "../modules/Player";
import Gameboard from "../modules/Gameboard";

test("check if player attack has succesfully been received by the gameboard", () => {
  const newPlayer = new Player();
  const newGameboard = new Gameboard();
  const gameboardArray = newGameboard.initializeGameboard();

  expect(newPlayer.attack(gameboardArray, newGameboard)).toBeTruthy();
});
