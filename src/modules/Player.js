export default class Player {
  constructor(user) {
    this.userType = user;
  }

  attack(gameboard, newGameboard) {
    let hasAttacked = false;
    while (!hasAttacked) {
      const randomIndex = Math.floor(Math.random() * 100);
      if (!newGameboard.receiveAttack(randomIndex)) {
        hasAttacked = true;
      }
      return randomIndex;
    }
  }
}
