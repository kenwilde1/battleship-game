export default class Ship {
  constructor(id, length, coords) {
    this.id = id;
    this.length = length;
    this.coords = coords;
  }

  hit(num) {
    if (this.coords.includes(num)) {
      this.length--;
      return true;
    } else {
      return false;
    }
  }

  isSunk() {
    if (this.length < 1) {
      return true;
    } else {
      return false;
    }
  }
}
