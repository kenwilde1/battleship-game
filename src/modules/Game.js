import Gameboard from "./Gameboard";
import Player from "./Player";
import renderGameboard from "../dom-scripts/renderGameboard";
import { humanShips, computerShips } from "../data/shipData";

export default class Game {
  constructor() {
    this.humanGameboard = new Gameboard();
    this.humanArray = this.humanGameboard.initializeGameboard();
    this.computerGameboard = new Gameboard();
    this.computerArray = this.computerGameboard.initializeGameboard();
    this.currentPlayer = "human";
    this.computerPlayer = new Player();
    this.computerGameboardElement = document.querySelector(
      ".computer-gameboard"
    );
    this.humanGameboardElement = document.querySelector(".human-gameboard");
    this.userShipContainer = document.querySelector(".user-ship-container");
    this.shipStorage = [];
  }

  addEventListeners() {
    const cells = document.querySelectorAll(".computer-gameboard .cell");
    cells.forEach((cell) =>
      cell.addEventListener("click", (e) => {
        let target = parseInt(e.target.dataset.id);

        if (!this.handleClick(target)) {
          setTimeout(() => {
            this.switchCurrentPlayer();
          }, 1000);
        }
      })
    );
  }

  startGame() {
    this.computerGameboardElement.classList.remove("inactive");
    this.humanGameboardElement.classList.add("inactive");
  }

  initializeGameboard() {
    this.placeComputerShips();
    renderGameboard(this.humanArray, "human");
    renderGameboard(this.computerArray, "comp");
    this.addEventListeners();
  }

  placeHumanShips() {
    humanShips.forEach((ship) => {
      console.log(ship.coords);
      this.humanGameboard.placeShip(ship.id, ship.coords);
    });
  }

  placeComputerShips() {
    computerShips.forEach((ship) =>
      this.computerGameboard.placeShip(ship.id, ship.coords)
    );
  }

  handleClick(target) {
    const result = this.computerGameboard.receiveAttack(target);

    if (!result) {
      this.computerGameboardElement.classList.add("inactive");
      this.humanGameboardElement.classList.toggle("inactive");
    } else {
      this.computerGameboardElement.classList.remove("inactive");
    }

    renderGameboard(this.computerArray, "comp");
    this.addEventListeners();
    if (this.computerGameboard.isGameOver()) {
      this.gameOver("Human");
    }
    return result;
  }

  switchCurrentPlayer() {
    let hasAttacked = false;
    while (!hasAttacked) {
      const randomIndex = Math.floor(Math.random() * 100);
      if (
        !this.humanArray[randomIndex][1].isHit &&
        !this.humanArray[randomIndex][1].isPlaced
      ) {
        this.humanGameboard.receiveAttack(randomIndex);

        renderGameboard(this.humanArray, "human");
        this.computerGameboardElement.classList.remove("inactive");
        this.humanGameboardElement.classList.add("inactive");
        hasAttacked = true;
      }

      if (
        !this.humanArray[randomIndex][1].isHit &&
        this.humanArray[randomIndex][1].isPlaced
      ) {
        this.humanGameboard.receiveAttack(randomIndex);

        renderGameboard(this.humanArray, "human");
        this.computerGameboardElement.classList.remove("inactive");
        this.humanGameboardElement.classList.add("inactive");
      }
    }
    if (this.humanGameboard.isGameOver()) {
      this.gameOver("Computer");
    }
  }

  rotateShips() {
    const destroyer = document.querySelector(".destroyer-container");
    const submarine = document.querySelector(".submarine-container");
    const cruiser = document.querySelector(".cruiser-container");
    const battleship = document.querySelector(".battleship-container");
    const carrier = document.querySelector(".carrier-container");

    this.userShipContainer.classList.toggle("verticalShipContainer");
    if (destroyer) {
      destroyer.classList.toggle("verticalDestroyer");
    }
    if (submarine) {
      submarine.classList.toggle("verticalSub");
    }
    if (cruiser) {
      cruiser.classList.toggle("verticalCruiser");
    }
    if (battleship) {
      battleship.classList.toggle("verticalBattle");
    }
    if (carrier) {
      carrier.classList.toggle("verticalCarrier");
    }
  }

  gameOver(player) {
    alert(`Game Over! ${player} wins!`);
    this.humanGameboard = new Gameboard();
    this.humanArray = this.humanGameboard.initializeGameboard();
    this.computerGameboard = new Gameboard();
    this.computerArray = this.computerGameboard.initializeGameboard();
    this.initializeGameboard();

    this.computerGameboardElement.classList.toggle("inactive");
    this.humanGameboardElement.classList.toggle("inactive");

    this.shipStorage.forEach((ship) => {
      this.userShipContainer.appendChild(ship);
    });
    this.dragShips();
  }

  dragShips() {
    let ships = [];
    const shipElements = document.querySelectorAll(
      ".user-ship-container .shipCell"
    );
    const userSquares = document.querySelectorAll(".human-gameboard .cell");
    shipElements.forEach((ship) => {
      ships.push(shipElements);
    });

    let selectedShipNameWithIndex;
    let draggedShipElement;
    let draggedShip;
    let firstShipIndex;
    let firstShipID;
    let draggedShipLength = 0;
    ships[0].forEach((ship) =>
      ship.addEventListener("mousedown", (e) => {
        selectedShipNameWithIndex = e.target.id;
      })
    );
    const dragStart = (e) => {
      draggedShip = e.currentTarget.lastElementChild;
      firstShipIndex = e.currentTarget.firstElementChild;
      firstShipID = parseInt(firstShipIndex.id.substr(-1));
      draggedShipElement = e.currentTarget;
      draggedShipLength = 0;
      e.target.childNodes.forEach((el) => {
        if (el.id) {
          draggedShipLength++;
        }
      });
    };

    const dragOver = (e) => {
      e.preventDefault();
    };

    const dragEnter = (e) => {
      e.preventDefault();
    };

    const dragLeave = () => {};

    const dragDrop = (e) => {
      let shipNameWithLastId = draggedShip.id;

      let lastShipIndex = parseInt(shipNameWithLastId.substr(-1));
      let ShipLastId = lastShipIndex + parseInt(e.target.dataset.id);
      let selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1));
      ShipLastId = ShipLastId - selectedShipIndex;

      let newCoords = [];
      let numOfShipCells = draggedShipLength - 1;

      if (this.userShipContainer.classList.contains("verticalShipContainer")) {
        numOfShipCells = draggedShipLength - 1;
        for (let i = 0; i <= numOfShipCells * 10; ) {
          const end = parseInt(e.target.dataset.id);
          newCoords.push(end + i);
          i = i + 10;
        }
      } else {
        for (let i = numOfShipCells; i >= 0; i--) {
          const end = parseInt(e.target.dataset.id);
          const start = end - i;
          newCoords.push(start);
        }
      }

      newCoords.push(parseInt(e.target.dataset.id));
      const shipInQuestion = parseInt(draggedShip.parentElement.dataset.id);
      this.humanGameboard.shipList.filter((ship) => {
        if (ship.id === shipInQuestion) {
          ship.coords = [...newCoords];
        }
      });

      humanShips.filter((ship) => {
        if (ship.id === shipInQuestion) {
          ship.coords = [...newCoords];
        }
      });

      const notAllowedHorizontal = [
        0,
        10,
        20,
        30,
        40,
        50,
        60,
        70,
        80,
        90,
        1,
        11,
        21,
        31,
        41,
        51,
        61,
        71,
        81,
        91,
        2,
        22,
        32,
        42,
        52,
        62,
        72,
        82,
        92,
        3,
        13,
        23,
        33,
        43,
        53,
        63,
        73,
        83,
        93,
      ];
      let newNotAllowedHorizontal = notAllowedHorizontal.splice(
        0,
        10 * lastShipIndex
      );

      const notAllowedVertical = [
        99,
        98,
        97,
        96,
        95,
        94,
        93,
        92,
        91,
        90,
        89,
        88,
        87,
        86,
        85,
        84,
        83,
        82,
        81,
        80,
        79,
        78,
        77,
        76,
        75,
        74,
        73,
        72,
        71,
        70,
        69,
        68,
        67,
        66,
        65,
        64,
        63,
        62,
        61,
        60,
      ];

      let newNotAllowedVertical = notAllowedVertical.splice(
        0,
        10 * lastShipIndex
      );

      let shipLastId = lastShipIndex + parseInt(e.target.dataset.id);
      shipLastId = shipLastId - selectedShipIndex;

      if (
        !this.userShipContainer.classList.contains("verticalShipContainer") &&
        !newNotAllowedHorizontal.includes(shipLastId)
      ) {
        for (let i = 0; i < draggedShipLength; i++) {
          userSquares[
            parseInt(e.target.dataset.id) - selectedShipIndex + i
          ].classList.add("taken");
          this.humanArray[
            e.target.dataset.id - selectedShipIndex + i
          ].isPlaced = true;
          this.humanArray[
            e.target.dataset.id - selectedShipIndex + i
          ].shipID = parseInt(draggedShip.parentElement.dataset.id);
        }
      } else if (
        this.userShipContainer.classList.contains("verticalShipContainer") &&
        !newNotAllowedVertical.includes(shipLastId)
      ) {
        for (let i = 0; i < draggedShipLength; i++) {
          userSquares[
            parseInt(e.target.dataset.id) - selectedShipIndex + 10 * i
          ].classList.add("taken");
          this.humanArray[
            parseInt(e.target.dataset.id) - -selectedShipIndex + 10 * i
          ].isPlaced = true;
          this.humanArray[
            parseInt(e.target.dataset.id) - selectedShipIndex + 10 * i
          ].shipID = parseInt(draggedShip.parentElement.dataset.id);

          // humanShips.forEach((ship) => {
          //   if (ship.id === parseInt(draggedShipElement.dataset.id)) {
          //     ship.coords.push(
          //       parseInt(e.target.dataset.id) - selectedShipIndex + 10 * i
          //     );
          //   }
          // });
        }
      }
      this.placeHumanShips();
      this.shipStorage.push(draggedShipElement);
      this.userShipContainer.removeChild(draggedShipElement);
    };

    ships[0].forEach((ship) => ship.addEventListener("dragstart", dragStart));

    userSquares.forEach((square) =>
      square.addEventListener("dragstart", dragStart)
    );
    userSquares.forEach((square) =>
      square.addEventListener("dragover", dragOver)
    );
    userSquares.forEach((square) =>
      square.addEventListener("dragenter", dragEnter)
    );
    userSquares.forEach((square) =>
      square.addEventListener("dragleave", dragLeave)
    );
    userSquares.forEach((square) => square.addEventListener("drop", dragDrop));
  }
}
