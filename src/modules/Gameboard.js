import Ship from "./Ship";

export default class Gameboard {
  constructor() {
    this.hits = 0;
    this.misses = 0;
    this.gameboardArray = [];
    this.shipList = [];
  }

  initializeGameboard() {
    for (let i = 0; i < 100; i++) {
      this.gameboardArray[i] = [
        i,
        {
          isPlaced: false,
          isHit: false,
          shipID: null,
        },
      ];
    }
    return this.gameboardArray;
  }

  placeShip(shipID, coords) {
    const newShip = new Ship(shipID, coords.length, coords);
    this.shipList.push(newShip);

    for (let i = 0; i < coords.length; i++) {
      this.gameboardArray[coords[i]][1].isPlaced = true;
      this.gameboardArray[coords[i]][1].shipID = shipID;
    }
    return this.gameboardArray.slice(coords[0], coords[coords.length - 1] + 1);
  }

  receiveAttack(coord) {
    const cellToHit = this.gameboardArray[coord][1];
    if (cellToHit.isPlaced && !cellToHit.isHit) {
      const shipInQuestion = cellToHit.shipID;
      this.shipList.filter((ship) => {
        if (ship.id === shipInQuestion) {
          ship.hit(coord);
          cellToHit.isHit = true;
        }
      });
      this.hits++;
      return true;
    } else {
      this.gameboardArray[coord][1].isHit = true;
      this.misses++;
      return false;
    }
  }

  isGameOver() {
    const total = this.shipList.reduce((prev, curr) => curr.length + prev, 0);

    if (total === 0) {
      return true;
    } else {
      return false;
    }
  }
}
