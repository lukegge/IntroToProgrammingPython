// Sudoku board and input board elements
const sudokuBoard = document.querySelector('.sudoku-board');
const inputBoard = document.querySelector('.input-board');

// Difficulty buttons
const easyButton = document.getElementById('easy');
const mediumButton = document.getElementById('medium');
const hardButton = document.getElementById('hard');

// Check solution and solve buttons
const checkSolutionButton = document.getElementById('checkSolution');
const solveButton = document.getElementById('solve');

// Functions for generating, checking, and solving Sudoku puzzles
function generateBoard(difficulty) {
    const fullBoard = generateFullBoard();
    let numCellsToRemove;

    switch (difficulty) {
        case 'easy':
            numCellsToRemove = 20;
            break;
        case 'medium':
            numCellsToRemove = 40;
            break;
        case 'hard':
            numCellsToRemove = 60;
            break;
        default:
            numCellsToRemove = 20;
    }

    const puzzleBoard = removeCells(fullBoard, numCellsToRemove);

    // Render the generated board to the UI
    renderBoard(puzzleBoard);
}

function checkSolution() {
    // Implement a function to check if the Sudoku board is solved correctly
}

function solveSudoku() {
    // Implement a function to solve the input Sudoku puzzle
}

// Sudoku generation
function generateFullBoard() {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));

    function isValid(board, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) {
                return false;
            }
        }

        const startRow = row - (row % 3);
        const startCol = col - (col % 3);

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i + startRow][j + startCol] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    function fillBoard(board, row, col) {
        if (row === 9) {
            return true;
        }

        if (col === 9) {
            return fillBoard(board, row + 1, 0);
        }

        if (board[row][col] !== 0) {
            return fillBoard(board, row, col + 1);
        }

        for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
                board[row][col] = num;
                if (fillBoard(board, row, col + 1)) {
                    return true;
                }
                board[row][col] = 0;
            }
        }

        return false;
    }

    fillBoard(board, 0, 0);
    return board;
}

function removeCells(board, numCells) {
    const newBoard = board.map(row => row.slice());

    for (let i = 0; i < numCells; i++) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        if (newBoard[row][col] === 0) {
            i--;
            continue;
        }

        newBoard[row][col] = 0;
    }

    return newBoard;
}

function renderBoard(puzzleBoard) {
    // Clear the current board
    sudokuBoard.innerHTML = '';

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            // Create a new cell element
            const cell = document.createElement('div');
            cell.classList.add('sudoku-cell');

            // Set the cell value if it's not empty
            if (puzzleBoard[row][col] !== 0) {
                cell.textContent = puzzleBoard[row][col];
            } else {
                // Add an input field for empty cells
                const input = document.createElement('input');
                input.type = 'number';
                input.min = 1;
                input.max = 9;
                input.classList.add('cell-input');
                cell.appendChild(input);
            }

            // Add the cell to the Sudoku board
            sudokuBoard.appendChild(cell);
        }
    }
}

// Event listeners
easyButton.addEventListener('click', () => {
    generateBoard('easy');
});

mediumButton.addEventListener('click', () => {
    generateBoard('medium');
});

hardButton.addEventListener('click', () => {
    generateBoard('hard');
});

checkSolutionButton.addEventListener('click', () => {
    checkSolution();
});

solveButton.addEventListener('click', () => {
    solveSudoku();
});

// Initialize the game
generateBoard('easy');