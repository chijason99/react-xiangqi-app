import React, { useContext, useState } from "react";
import { BoardContext } from "../App";
export default function FENParser() {
  const [isClicked, setIsClicked] = useState(false);
  const [inputFEN, setInputFEN] = useState("");
  const { handleParseFENInput, validFENInput } = useContext(BoardContext);

  function handleClickParseFEN() {
    handleParseFENInput(inputFEN);
    setInputFEN("");
  }

  function handleInputFEN(e) {
    setInputFEN(e.target.value);
  }
  function handleClose() {
    setIsClicked(false);
  }

  function handleOpen() {
    setIsClicked(true);
  }
  return (
    <>
      {!isClicked && <button className="btn btn--primary" onClick={() => handleOpen()}>Parse FEN</button>}
      {isClicked && (
        <textarea
          className="FEN-input"
          type="text"
          value={inputFEN}
          onChange={(e) => handleInputFEN(e)}
        />
      )}
      {isClicked && (
        <button
          className="btn btn--blue"
          onClick={() => {
            handleClickParseFEN(inputFEN);
          }}
        >
          Parse
        </button>
      )}
      {isClicked && (
        <button className="btn btn--close" onClick={() => handleClose()}>
          &times;
        </button>
      )}
    </>
  );
}
