import React from "react";
import MoveList from "./MoveList";
import FENGenerator from "./FENGenerator";
import FENParser from "./FENParser";
import CapturedPiece from "./CapturedPiece";
// import CurrentTurn from "./CurrentTurn";
export default function BoardInfo() {
  return (
    <div className="board-info">
      {/* <CurrentTurn /> */}
      <div className="captured-piece__container">
        <CapturedPiece color={"red"} />
        <MoveList />
        <CapturedPiece color={"black"} />
      </div>
      <div className="FEN-generator__container">
        <FENGenerator />
      </div>
      <div className="FEN-parser__container">
        <FENParser />
      </div>
    </div>
  );
}
