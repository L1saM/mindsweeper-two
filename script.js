//*-----------------------
//* Javascript
//*-----------------------

// Select the relevant elements from the page
const grid = document.querySelector('.grid');
//Keeps track of player score
const scoreCounter = document.querySelector('.score-counter');
//Ends game screen pop up
const endGameScreen = document.querySelector('.end-game-screen');
//Text for end game screen pop up
const endGameText = document.querySelector('.end-game-text');
//Button to play game again 
const playAgainButton = document.querySelector('.play-again');

// Initialise the variables needed for the game setup
const totalCells = 100;
//Number of bombs in the grid
const totalBombs = 25;
// Total number of blank spaces + bombs present. 
const maxScore = totalCells - totalBombs;
//OR Have the option to let the user win after only evading a certain amount of bombs
// const maxScore = 20;
const bombsList = [];

let score = 0;

// Generate a list of 6 unique bombs
while (bombsList.length < totalBombs) {
  // Generate a random number
  const randomNumber = Math.floor(Math.random() * totalCells) + 1;

  // Add the number to the list if not already included
  if (!bombsList.includes(randomNumber)) bombsList.push(randomNumber);
}

//*--------------------------
//* GRID AND GAME LOGIC
//*--------------------------

for (let i = 1; i <= totalCells; i++) {
  // Creating a cell
  const cell = document.createElement('div');
  cell.classList.add('cell');

  // Manage the "click" event for the cell
  cell.addEventListener('click', function () {
    // Doesn't do anything if has already been clicked
    if (cell.classList.contains('cell-clicked')) return;

    if (bombsList.includes(i)) {
      cell.classList.add('cell-bomb');
      endGame(false);
    } else {
      cell.classList.add('cell-clicked');
      updateScore();
    }
  });

  // Puts the cell in the grid
  grid.appendChild(cell);
}

// *---------------------------
// * FUNCTIONS
// *---------------------------

// Function to increment the score and display it
function updateScore() {
  score++;
  scoreCounter.innerText = score.toString().padStart(5, '0');
  if (score === maxScore) endGame(true);
}

//Shows all the bombs present on the grid
function revealAllBombs() {
  // Get all of the cells from the page
  const cells = document.querySelectorAll('.cell');

  for (let i = 1; i <= cells.length; i++) {
    const cell = cells[i - 1];

    // If this cell is in the bombsList array, add the cell-bomb css class to it
    if (bombsList.includes(i)) {
      cell.classList.add('cell-bomb');
    }
  }
}

// Function for when the game ends
function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = 'YOU<br>WON';
    endGameScreen.classList.add('win');
  }
// shows where all the bombs are when the user finishes the game
  revealAllBombs();
  endGameScreen.classList.remove('hidden');
}

//* ---------------------
//* PLAY AGAIN
//* --------------------

//Listens for button to be clicked to reload the game and begin again.
playAgainButton.addEventListener('click', function () {
  window.location.reload();
});
