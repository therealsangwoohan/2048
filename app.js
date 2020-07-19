const boardSize = 4;

function createBoard() {
    let board_DOM = document.querySelector(".board");
    let board = [];
    for (let r = 0; r < boardSize; r++) {
        let row = [];
        for (let c = 0; c < boardSize; c++) {
            let square = document.createElement("div");
            square.className = "square";
            square.innerHTML = 0;
            board_DOM.appendChild(square);
            row.push(square);   
        }
        board.push(row);
    }
    return board;
}

function generate() {
    while (true) {
        let randRow = getRandomInt(0, boardSize - 1);
        let randCol = getRandomInt(0, boardSize - 1);
        if (board[randRow][randCol].innerHTML == 0) {
            board[randRow][randCol].innerHTML = 2;
            console.log(randRow, randCol);
            break;
        }
    }
}

function moveRight() {
    for (let rowIdx = 0; rowIdx < boardSize; rowIdx++) {
        let idxOfDoubledElement = boardSize;
        for (let colIdx = boardSize - 2; colIdx >= 0; colIdx--) {
            let element = board[rowIdx][colIdx].innerHTML;
            if (element == 0) {
                continue;
            }
            for (let elementIdx = colIdx; elementIdx < boardSize - 1; elementIdx++) {
                let nextElement = board[rowIdx][elementIdx + 1].innerHTML;
                if (nextElement == 0) {
                    board[rowIdx][elementIdx].innerHTML = nextElement;
                    board[rowIdx][elementIdx + 1].innerHTML = element;
                } else if (nextElement == element && elementIdx + 1 != idxOfDoubledElement) {
                    board[rowIdx][elementIdx].innerHTML = 0;
                    board[rowIdx][elementIdx + 1].innerHTML *= 2;
                    idxOfDoubledElement = elementIdx + 1;
                } else {
                    break;
                }
            }
        }
    }
}

function moveLeft() {
    for (let rowIdx = 0; rowIdx < boardSize; rowIdx++) {
        let idxOfDoubledElement = -1;
        for (let colIdx = 1; colIdx < boardSize; colIdx++) {
            let element = board[rowIdx][colIdx].innerHTML;
            if (element == 0) {
                continue;
            }
            for (let elementIdx = colIdx; elementIdx > 0; elementIdx--) {
                let nextElement = board[rowIdx][elementIdx - 1].innerHTML;
                if (nextElement == 0) {
                    board[rowIdx][elementIdx].innerHTML = nextElement;
                    board[rowIdx][elementIdx - 1].innerHTML = element;
                } else if (nextElement == element && elementIdx - 1 != idxOfDoubledElement) {
                    board[rowIdx][elementIdx].innerHTML = 0;
                    board[rowIdx][elementIdx - 1].innerHTML *= 2;
                    idxOfDoubledElement = elementIdx - 1;
                } else {
                    break;
                }
            }
        }
    }
}

function moveDown() {
    for (let colIdx = 0; colIdx < boardSize; colIdx++) {
        let idxOfDoubledElement = boardSize;
        for (let rowIdx = boardSize - 2; rowIdx >= 0; rowIdx--) {
            let element = board[rowIdx][colIdx].innerHTML;
            if (element == 0) {
                continue;
            }
            for (let elementIdx = rowIdx; elementIdx < boardSize - 1; elementIdx++) {
                let nextElement = board[elementIdx + 1][colIdx].innerHTML;
                if (nextElement == 0) {
                    board[elementIdx][colIdx].innerHTML = nextElement;
                    board[elementIdx + 1][colIdx].innerHTML = element;
                } else if (nextElement == element && elementIdx + 1 != idxOfDoubledElement) {
                    board[elementIdx][colIdx].innerHTML = 0;
                    board[elementIdx + 1][colIdx].innerHTML *= 2;
                    idxOfDoubledElement = elementIdx + 1;
                } else {
                    break;
                }
            }
        }
    }
}

function moveUp() {
    for (let colIdx = 0; colIdx < boardSize; colIdx++) {
        let idxOfDoubledElement = -1;
        for (let rowIdx = 1; rowIdx < boardSize; rowIdx++) {
            let element = board[rowIdx][colIdx].innerHTML;
            if (element == 0) {
                continue;
            }
            for (let elementIdx = rowIdx; elementIdx > 0; elementIdx--) {
                let nextElement = board[elementIdx - 1][colIdx].innerHTML;
                if (nextElement == 0) {
                    board[elementIdx][colIdx].innerHTML = nextElement;
                    board[elementIdx - 1][colIdx].innerHTML = element;
                } else if (nextElement == element && elementIdx - 1 != idxOfDoubledElement) {
                    board[elementIdx][colIdx].innerHTML = 0;
                    board[elementIdx - 1][colIdx].innerHTML *= 2;
                    idxOfDoubledElement = elementIdx - 1;
                } else {
                    break;
                }
            }
        }
    }
}

function checkLossAndGenerate() {
    for (let row of board) {
        for (let element of row) {
            if (element.innerHTML == 0) {
                generate();
                return;
            }
        }
    }
    gg_dom.innerHTML = "You Lost";
    document.removeEventListener("keyup", control);
}

function control(e) {
    if(e.keyCode === 37) {
      moveLeft()
    } else if (e.keyCode === 38) {
      moveUp()
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 40) {
      moveDown()
    }
    updateStyle();
    checkLossAndGenerate();
}

function updateStyle() {
    for (let row of board) {
        for (let element of row) {
            let value = element.innerHTML;
            if (value == 0) {
                element.style.fontSize = "0px";
                element.style.backgroundColor = `#000000`;
            } else {
                element.style.fontSize = "60px";
                element.style.backgroundColor = `#${Math.log2(value).toString(16).repeat([6])}`;
            }
        }
    }    
}

const board = createBoard();
const gg_dom = document.querySelector(".gg");
generate();
generate();
updateStyle();
document.addEventListener("keyup", control);