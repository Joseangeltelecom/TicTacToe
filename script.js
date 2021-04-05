const player = (marker,markerClass) => {
  return {marker,markerClass}
}

const player1 = player('X','x')
const player2 = player('O','circle')

// HTML Elements
const DOM = (() => {
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

return {statusDiv,resetDiv,cellDivs}

})();

const gameBoard = (()=>{  
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
let circleTurn
let islive= true;

// reset botton: 
DOM.resetDiv.addEventListener('click', startGame)


// Inicio de juego: 
function startGame(){
  islive = true;
  circleTurn = false
  DOM.cellDivs.forEach(cell  => {
    cell.classList.remove(player1.markerClass)
    cell.classList.remove(player2.markerClass)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, {once: true})
  });
}

// controller: 
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? player2.markerClass : player1.markerClass
   placeMark(cell, currentClass);

if (checkWin(currentClass)){
  endGame(false)

} else if (isDraw()) {
  endGame(true)
} else {
  swapTurns()
  if (circleTurn) {
    DOM.statusDiv.innerHTML = `<span>O is next</span>`;
  } else {
    DOM.statusDiv.innerHTML = `X is next`;
  }
 
}
}

// Render 'x' y 'o': 
function placeMark(cell, currentClass){
  if(!islive){
    return
  }
  cell.classList.add(currentClass)
}

// checkWin
function checkWin(currentClass){
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return DOM.cellDivs[index].classList.contains(currentClass)})
      
})
}

// Render ganador:
function endGame(draw){
  islive = false;
  if (draw) {
    DOM.statusDiv.innerHTML = 'Draw!'
  } else {
    DOM.statusDiv.innerHTML = `${circleTurn ? player2.marker + "'S": player1.marker + "'S"} Win!`
  }
}
    
// verificar si todos los cuadros estan llenos (draw)
function isDraw() {
  return [...DOM.cellDivs].every(cell => {
    return cell.classList.contains(player1.markerClass) ||
    cell.classList.contains(player2.markerClass)
  })
}

// Cambiar turnos:
function swapTurns() {
  circleTurn = !circleTurn
}
return {startGame, handleClick,placeMark,checkWin, endGame, isDraw,swapTurns}

})();

gameBoard.startGame();
//*************************************************************************************************************** */