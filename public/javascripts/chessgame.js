const socket = io();
const chess = new Chess();

const boardElement = document.querySelector('.chessboard');

const draggedPrice = null;
const sourceSquare = null;
const playerRole = null;

const renderBoard = ()=>{
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row,rowIndex)=>{
        row.forEach((square,squareIndex)=>{
            const squareElement = document.createElement("div");
            squareElement.classList.add("square",
            (rowIndex+squareIndex) % 2 === 0 ? "light" : "dark"
            );
        })
    })
    // console.log(board);
}

const handleMove = () => {}

const getPieceUnicode = () => {}

renderBoard();