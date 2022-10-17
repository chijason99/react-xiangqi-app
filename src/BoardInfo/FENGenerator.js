import React, { useContext, useState, useEffect } from "react";
import { BoardContext } from "../App";

export default function FENGenerator() {
  const [showFEN, setShowFEN] = useState(false);
  const { handleGenerateFEN, FENOutput } = useContext(BoardContext);

  function handleClickGenerateFEN() {
    setShowFEN(true);
    handleGenerateFEN();
  }
  function handleHideFEN() {
    setShowFEN(false);
  }
  function handleCopyFEN() {
    navigator.clipboard.writeText(FENOutput);
  }
  return (
    <>
      {!showFEN && (
        <button className="btn btn--primary" onClick={handleClickGenerateFEN}>
          Get FEN
        </button>
      )}
      {showFEN && (
        <textarea className="FEN-input" readOnly={true} value={FENOutput} />
      )}
      {showFEN && (
        <button className="btn btn--blue" onClick={handleCopyFEN}>
          Copy
        </button>
      )}
      {showFEN && (
        <button className="btn btn--close" onClick={handleHideFEN}>
          &times;
        </button>
      )}
    </>
  );
}
