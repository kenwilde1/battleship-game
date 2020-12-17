import Gameboard from "../modules/Gameboard";

test("check if gameboard has been succesfully initialized", () => {
  const newGameboard = new Gameboard();
  const gameboardArray = newGameboard.initializeGameboard();

  const checkElements = gameboardArray[0].concat(
    gameboardArray[gameboardArray.length - 1]
  );
  expect(checkElements).toEqual([
    0,
    { isPlaced: false, isHit: false, shipID: null },
    99,
    { isPlaced: false, isHit: false, shipID: null },
  ]);
});

test("test if a ship has been created and placed succesfully", () => {
  const newGameboard = new Gameboard();
  const gameboardArray = newGameboard.initializeGameboard();

  const placingShip = newGameboard.placeShip(0, [1, 2, 3]);

  expect(placingShip).toEqual([
    [
      1,
      {
        isPlaced: true,
        isHit: false,
        shipID: 0,
      },
    ],
    [
      2,
      {
        isPlaced: true,
        isHit: false,
        shipID: 0,
      },
    ],
    [
      3,
      {
        isPlaced: true,
        isHit: false,
        shipID: 0,
      },
    ],
  ]);
});

test("check if receive attack succesfully finds and hits a ship", () => {
  const newGameboard = new Gameboard();
  const gameboardArray = newGameboard.initializeGameboard();
  newGameboard.placeShip(0, [1, 2, 3]);
  expect(newGameboard.receiveAttack(1)).toBeTruthy();
});

test("check if a hit increases the hit variable and decreases the ship length", () => {
  const newGameboard = new Gameboard();
  const gameboardArray = newGameboard.initializeGameboard();
  newGameboard.placeShip(0, [1, 2, 3]);
  newGameboard.receiveAttack(1);
  const total = newGameboard.shipList[0].length + newGameboard.hits;
  expect(total).toEqual(3);
});

test("check if receive attack succesfully finds and misses a ship", () => {
  const newGameboard = new Gameboard();
  const gameboardArray = newGameboard.initializeGameboard();
  newGameboard.placeShip(0, [1, 2, 3]);
  expect(newGameboard.receiveAttack(4)).toBeFalsy();
});

test("check if a miss decrements the miss variable and does not reduce length of ship", () => {
  const newGameboard = new Gameboard();
  const gameboardArray = newGameboard.initializeGameboard();
  newGameboard.placeShip(0, [1, 2, 3]);
  newGameboard.receiveAttack(4);
  const total = newGameboard.shipList[0].length + newGameboard.hits;
  expect(total).toEqual(3);
});

test("check if game is over when it should not be", () => {
  const newGameboard = new Gameboard();
  const gameboardArray = newGameboard.initializeGameboard();
  newGameboard.placeShip(0, [1, 2, 3]);
  newGameboard.receiveAttack(1);
  expect(newGameboard.isGameOver()).toBeFalsy();
});

test("check if game is over when it should be", () => {
  const newGameboard = new Gameboard();
  const gameboardArray = newGameboard.initializeGameboard();
  newGameboard.placeShip(0, [1, 2, 3]);
  newGameboard.receiveAttack(1);
  newGameboard.receiveAttack(2);
  newGameboard.receiveAttack(3);
  expect(newGameboard.isGameOver()).toBeTruthy();
});
