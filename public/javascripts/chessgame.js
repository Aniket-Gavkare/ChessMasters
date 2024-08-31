const socket = io();
const chess = new Chess();

const chessElement = document.querySelector('.chessboard');

const draggedPrice = null;
const sourceSquare = null;
const playerRole = null;

const renderBoard = ()=>{
    const board = chess.board();
    console.log(board);
}

const handleMove = () => {}

const getPieceUnicode = () => {}

renderBoard();