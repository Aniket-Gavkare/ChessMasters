const socket = io();
const chess = new Chess();

const boardElement = document.querySelector('.chessboard');

const draggedPrice = null;
const sourceSquare = null;
const playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";

    board.forEach((row, rowIndex) => {
        row.forEach((square, squareIndex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add(
                "square",
                (rowIndex + squareIndex) % 2 === 0 ? "light" : "dark"
            );

            squareElement.dataset.row = row;
            squareElement.dataset.col = squareIndex;

            // working with pieces
            if (square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add(
                    "piece",
                    square.color === "w" ? "white" : "black"
                );

                pieceElement.innerText = getPieceUnicode(square.type);
                pieceElement.draggable = playerRole === square.color;

                // handle dragging of pieces
                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPrice = pieceElement;
                        sourceSquare = {
                            row: rowIndex,
                            col: squareIndex,
                        }
                        e.dataTransfer.setData("text/plain","");
                    } 
                });

                pieceElement.addEventListener("dragend",(e)=>{
                    draggedPrice = null;
                    sourceSquare = null;
                });   

                squareElement.appendChild(pieceElement);
            }
            //if tried to drag a square
            squareElement.addEventListener("dragover",(e)=>{
                e.preventDefault();
            });

            //handle the dropping of dragged piece
            squareElement.addEventListener("drop",(e)=>{
                e.preventDefault();
                if(draggedPrice){
                    const targetSquare = {
                        row : parseInt(squareElement.dataset.row) ,
                        col : parseInt(squareElement.dataset.col) 
                    }
                }

                handleMove(sourceSquare,targetSquare)
            })

            boardElement.appendChild(squareElement);
        });
    });
};

const handleMove = () => {}; 

const getPieceUnicode = (piece) => {
    const unicodePieces = {
        p: "\u2659", // white pawn
        r: "\u2656", // white rook
        n: "\u2658", // white knight
        b: "\u2657", // white bishop
        q: "\u2655", // white queen
        k: "\u2654", // white king
        P: "\u265F", // black pawn
        R: "\u265C", // black rook
        N: "\u265E", // black knight
        B: "\u265D", // black bishop
        Q: "\u265B", // black queen
        K: "\u265A", // black king
    };
    
    return unicodePieces[piece] || null;
};


renderBoard();
