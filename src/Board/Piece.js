import React ,{ useContext} from "react";
// import { DragDropContainer } from "react-drag-drop-container";
// import { BoardContext } from "../App";
export default function Piece({ pieceInfo }) {
  // const {handleMovePiece} = useContext(BoardContext)
  return (

      <img
      className="piece"
        src={require(`../images/${pieceInfo.color}_${pieceInfo.piece}.svg`)}
        alt={`${pieceInfo.color}_${pieceInfo.piece}`}
        draggable={true}

      ></img>

  );
}
