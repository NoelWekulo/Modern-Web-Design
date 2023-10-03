const board = document.getElementById("game-board");
const status = document.getElementById("status");
const outcomeScreen = document.getElementById("outcome-screen");
const outcomeText = document.getElementById("outcome-text");
const newGameButton = document.getElementById("new-game-button");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(index) {
    if (gameBoard[index] === "" && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        render();
        if (checkWinner()) {
            outcomeText.innerText = `Player ${currentPlayer} wins!`;
            outcomeScreen.style.display = "flex";
        } else if (!gameBoard.includes("")) {
            outcomeText.innerText = "It's a draw!";
            outcomeScreen.style.display = "flex";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.innerText = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

function render() {
    board.innerHTML = "";
    gameBoard.forEach((value, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.innerText = value;
        cell.addEventListener("click", () => handleCellClick(index));
        board.appendChild(cell);
    });
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    status.innerText = `Player ${currentPlayer}'s turn`;
    outcomeScreen.style.display = "none";
    render();
}

newGameButton.addEventListener("click", resetGame);

// Initial render
render();

