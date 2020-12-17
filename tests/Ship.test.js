import Ship from "../modules/Ship";

test("check if ship has been created succesfully", () => {
  const newShip = new Ship(0, 3, [1, 2, 3]);
  expect(newShip).toEqual({ id: 0, length: 3, coords: [1, 2, 3] });
});

test("check if a hit registers as a hit", () => {
  const newShip = new Ship(0, 3, [1, 2, 3]);
  expect(newShip.hit(2)).toBeTruthy();
});

test("check if a miss registers as a miss", () => {
  const newShip = new Ship(0, 3, [1, 2, 3]);
  expect(newShip.hit(4)).toBeFalsy();
});

test("check if ship is sunk after being hit in all coords", () => {
  const newShip = new Ship(0, 3, [1, 2, 3]);
  newShip.hit(1);
  newShip.hit(2);
  newShip.hit(3);
  expect(newShip.isSunk()).toBeTruthy();
});

test("check if ship is sunk after being hit in all coords (includes misses)", () => {
  const newShip = new Ship(0, 3, [1, 2, 3]);
  newShip.hit(1);
  newShip.hit(2);
  newShip.hit(5);
  expect(newShip.isSunk()).toBeFalsy();
});
