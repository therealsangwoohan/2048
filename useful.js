function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;    
}

function createCustomBoard(boardArray) {
    let board_DOM = document.querySelector(".board");
    let board = [];
    for (let r of boardArray) {
        let row = [];
        for (let element of r) {
            let square = document.createElement("div");
            square.className = "square";
            square.innerHTML = element;
            board_DOM.appendChild(square);
            row.push(square);   
        }
        board.push(row);
    }
    return board;
}