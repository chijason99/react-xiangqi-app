import React, { useContext } from "react";
import Piece from "./Piece";
import { v4 as uuidv4 } from "uuid";
import { BoardContext } from "../App";
// import { DropTarget } from "react-drag-drop-container";
export default function Square({ squares }) {
  const { handleMovePiece } = useContext(BoardContext);

  const sqr = squares.map((sq) => {
    return (
        <div
          className={`square ${sq.isAvailable ? "square__available" : ""}`}
          data-row={sq.row}
          data-column={sq.column}
          key={sq.id}
          onClick={() => handleMovePiece(sq.color, sq.row, sq.column)}
        >
          {sq.piece !== null && <Piece pieceInfo={{ ...sq, id: uuidv4() }} />}
        </div>
    );
  });

  return <>{sqr}</>;
}
