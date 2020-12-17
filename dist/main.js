(()=>{"use strict";class e{constructor(e,t,a){this.id=e,this.length=t,this.coords=a}hit(e){return!!this.coords.includes(e)&&(this.length--,!0)}isSunk(){return this.length<1}}class t{constructor(){this.hits=0,this.misses=0,this.gameboardArray=[],this.shipList=[]}initializeGameboard(){for(let e=0;e<100;e++)this.gameboardArray[e]=[e,{isPlaced:!1,isHit:!1,shipID:null}];return this.gameboardArray}placeShip(t,a){const r=new e(t,a.length,a);this.shipList.push(r);for(let e=0;e<a.length;e++)this.gameboardArray[a[e]][1].isPlaced=!0,this.gameboardArray[a[e]][1].shipID=t;return this.gameboardArray.slice(a[0],a[a.length-1]+1)}receiveAttack(e){const t=this.gameboardArray[e][1];if(t.isPlaced&&!t.isHit){const a=t.shipID;return this.shipList.filter((r=>{r.id===a&&(r.hit(e),t.isHit=!0)})),this.hits++,!0}return this.gameboardArray[e][1].isHit=!0,this.misses++,!1}isGameOver(){return 0===this.shipList.reduce(((e,t)=>t.length+e),0)}}class a{constructor(e){this.userType=e}attack(e,t){let a=!1;for(;!a;){const e=Math.floor(100*Math.random());return t.receiveAttack(e)||(a=!0),e}}}function r(e,t){let a;for(a="human"===t?document.querySelector(".human-gameboard"):document.querySelector(".computer-gameboard");a.firstChild;)a.removeChild(a.lastChild);for(let t=0;t<100;t++){let r=document.createElement("div");e[t][1].isPlaced&&!e[t][1].isHit?r.className="cell ship":!e[t][1].isPlaced&&e[t][1].isHit?r.className="cell ship missed":e[t][1].isHit?r.className="cell ship attacked":r.className="cell",r.dataset.id=t,a.appendChild(r)}}const i=[{id:0,length:2,coords:[]},{id:1,length:3,coords:[]},{id:2,length:3,coords:[]},{id:3,length:4,coords:[]},{id:4,length:5,coords:[]}],s=[{id:0,length:2,coords:[0,1]},{id:1,length:3,coords:[10,20,30]},{id:2,length:3,coords:[35,36,37]},{id:3,length:4,coords:[82,83,84,85]},{id:4,length:5,coords:[94,95,96,97,98]}],n=new class{constructor(){this.humanGameboard=new t,this.humanArray=this.humanGameboard.initializeGameboard(),this.computerGameboard=new t,this.computerArray=this.computerGameboard.initializeGameboard(),this.currentPlayer="human",this.computerPlayer=new a,this.computerGameboardElement=document.querySelector(".computer-gameboard"),this.humanGameboardElement=document.querySelector(".human-gameboard"),this.userShipContainer=document.querySelector(".user-ship-container"),this.shipStorage=[]}addEventListeners(){document.querySelectorAll(".computer-gameboard .cell").forEach((e=>e.addEventListener("click",(e=>{let t=parseInt(e.target.dataset.id);this.handleClick(t)||setTimeout((()=>{this.switchCurrentPlayer()}),1e3)}))))}startGame(){this.computerGameboardElement.classList.remove("inactive"),this.humanGameboardElement.classList.add("inactive")}initializeGameboard(){this.placeComputerShips(),r(this.humanArray,"human"),r(this.computerArray,"comp"),this.addEventListeners()}placeHumanShips(){i.forEach((e=>{console.log(e.coords),this.humanGameboard.placeShip(e.id,e.coords)}))}placeComputerShips(){s.forEach((e=>this.computerGameboard.placeShip(e.id,e.coords)))}handleClick(e){const t=this.computerGameboard.receiveAttack(e);return t?this.computerGameboardElement.classList.remove("inactive"):(this.computerGameboardElement.classList.add("inactive"),this.humanGameboardElement.classList.toggle("inactive")),r(this.computerArray,"comp"),this.addEventListeners(),this.computerGameboard.isGameOver()&&this.gameOver("Human"),t}switchCurrentPlayer(){let e=!1;for(;!e;){const t=Math.floor(100*Math.random());this.humanArray[t][1].isHit||this.humanArray[t][1].isPlaced||(this.humanGameboard.receiveAttack(t),r(this.humanArray,"human"),this.computerGameboardElement.classList.remove("inactive"),this.humanGameboardElement.classList.add("inactive"),e=!0),!this.humanArray[t][1].isHit&&this.humanArray[t][1].isPlaced&&(this.humanGameboard.receiveAttack(t),r(this.humanArray,"human"),this.computerGameboardElement.classList.remove("inactive"),this.humanGameboardElement.classList.add("inactive"))}this.humanGameboard.isGameOver()&&this.gameOver("Computer")}rotateShips(){const e=document.querySelector(".destroyer-container"),t=document.querySelector(".submarine-container"),a=document.querySelector(".cruiser-container"),r=document.querySelector(".battleship-container"),i=document.querySelector(".carrier-container");this.userShipContainer.classList.toggle("verticalShipContainer"),e&&e.classList.toggle("verticalDestroyer"),t&&t.classList.toggle("verticalSub"),a&&a.classList.toggle("verticalCruiser"),r&&r.classList.toggle("verticalBattle"),i&&i.classList.toggle("verticalCarrier")}gameOver(e){alert(`Game Over! ${e} wins!`),this.humanGameboard=new t,this.humanArray=this.humanGameboard.initializeGameboard(),this.computerGameboard=new t,this.computerArray=this.computerGameboard.initializeGameboard(),this.initializeGameboard(),this.computerGameboardElement.classList.toggle("inactive"),this.humanGameboardElement.classList.toggle("inactive"),this.shipStorage.forEach((e=>{this.userShipContainer.appendChild(e)})),this.dragShips()}dragShips(){let e=[];const t=document.querySelectorAll(".user-ship-container .shipCell"),a=document.querySelectorAll(".human-gameboard .cell");let r,s,n,o,h;t.forEach((a=>{e.push(t)}));let c=0;e[0].forEach((e=>e.addEventListener("mousedown",(e=>{r=e.target.id}))));const d=e=>{n=e.currentTarget.lastElementChild,o=e.currentTarget.firstElementChild,h=parseInt(o.id.substr(-1)),s=e.currentTarget,c=0,e.target.childNodes.forEach((e=>{e.id&&c++}))},l=e=>{e.preventDefault()},m=e=>{e.preventDefault()},u=()=>{},p=e=>{let t=n.id,o=parseInt(t.substr(-1)),h=o+parseInt(e.target.dataset.id),d=parseInt(r.substr(-1));h-=d;let l=[],m=c-1;if(this.userShipContainer.classList.contains("verticalShipContainer")){m=c-1;for(let t=0;t<=10*m;){const a=parseInt(e.target.dataset.id);l.push(a+t),t+=10}}else for(let t=m;t>=0;t--){const a=parseInt(e.target.dataset.id)-t;l.push(a)}l.push(parseInt(e.target.dataset.id));const u=parseInt(n.parentElement.dataset.id);this.humanGameboard.shipList.filter((e=>{e.id===u&&(e.coords=[...l])})),i.filter((e=>{e.id===u&&(e.coords=[...l])}));let p=[0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93].splice(0,10*o),g=[99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60].splice(0,10*o),b=o+parseInt(e.target.dataset.id);if(b-=d,this.userShipContainer.classList.contains("verticalShipContainer")||p.includes(b)){if(this.userShipContainer.classList.contains("verticalShipContainer")&&!g.includes(b))for(let t=0;t<c;t++)a[parseInt(e.target.dataset.id)-d+10*t].classList.add("taken"),this.humanArray[parseInt(e.target.dataset.id)- -d+10*t].isPlaced=!0,this.humanArray[parseInt(e.target.dataset.id)-d+10*t].shipID=parseInt(n.parentElement.dataset.id)}else for(let t=0;t<c;t++)a[parseInt(e.target.dataset.id)-d+t].classList.add("taken"),this.humanArray[e.target.dataset.id-d+t].isPlaced=!0,this.humanArray[e.target.dataset.id-d+t].shipID=parseInt(n.parentElement.dataset.id);this.placeHumanShips(),this.shipStorage.push(s),this.userShipContainer.removeChild(s)};e[0].forEach((e=>e.addEventListener("dragstart",d))),a.forEach((e=>e.addEventListener("dragstart",d))),a.forEach((e=>e.addEventListener("dragover",l))),a.forEach((e=>e.addEventListener("dragenter",m))),a.forEach((e=>e.addEventListener("dragleave",u))),a.forEach((e=>e.addEventListener("drop",p)))}};n.initializeGameboard(),document.querySelector(".header button").addEventListener("click",(()=>n.startGame())),document.querySelector("#rotate-ships").addEventListener("click",(()=>n.rotateShips())),n.dragShips()})();