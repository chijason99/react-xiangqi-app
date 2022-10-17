import React, { useEffect } from "react";
import useState from "react-usestateref";
import Board from "./Board/Board";
import BoardOptions from "./Board/BoardOptions";
import BoardInfo from "./BoardInfo/BoardInfo";
import "./css/app.css";

export const BoardContext = React.createContext();

function App() {
  const row = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const column = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const squares = [];
  row.forEach((r) => {
    column.forEach((c) => {
      const square = {
        id: `${r}-${c}`,
        piece: null,
        color: null,
        row: r,
        column: c,
        isAvailable: true,
        isPreviousMoved: false,
        isJustMoved: false,
      };
      squares.push(square);
    });
  });

  const [sqr, setSqr, latestSqr] = useState(squares);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedSquareInfo, setSelectedSquareInfo] = useState();
  const [counter, setCounter] = useState(0);
  const [currentTurn, setCurrentTurn] = useState("red");
  const [capturedPieceList, setCapturedPieceList] = useState([]);
  const [FENOutput, setFENOutput] = useState(
    "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR"
  );

  useEffect(() => handleGenerateFEN, [sqr]);

  function handleSelectSquare(row, column) {
    const newSqr = [...sqr];
    const target = newSqr.find((s) => s.id === `${row}-${column}`);
    setSelectedSquareInfo((prevState) => ({ ...prevState, ...{ ...target } }));
    setCounter(1);
  }
  function handleClearBoard() {
    setCounter(0);
    setSqr((prevState) => {
      const newBoard = [...prevState];
      newBoard.forEach((sqr) => {
        sqr.piece = null;
        sqr.color = null;
      });
      return newBoard;
    });
  }
  function handleMovePiece(color, row, column) {
    if (counter % 2 === 0) {
      if (color === currentTurn) {
        handleSelectSquare(row, column);
      } else {
        return;
      }
    } else if (counter % 2 !== 0) {
      if (color === currentTurn) {
        handleSelectSquare(row, column);
        return;
      } else {
        if (color !== null) {
          setCapturedPieceList((prevState) => [
            ...prevState,
            sqr.find((s) => s.id === `${row}-${column}`),
          ]);
        }
        setSqr((prevState) => {
          const newSqr = [...prevState];
          const startIndex = newSqr.findIndex(
            (s) =>
              s.id === `${selectedSquareInfo.row}-${selectedSquareInfo.column}`
          );
          const destinationIndex = newSqr.findIndex(
            (s) => s.id === `${row}-${column}`
          );
          // clear the starting position
          newSqr[startIndex] = {
            ...newSqr[startIndex],
            piece: null,
            color: null,
          };
          // create the piece at destination
          newSqr[destinationIndex] = {
            ...newSqr[destinationIndex],
            piece: selectedSquareInfo.piece,
            color: selectedSquareInfo.color,
          };
          // change turn order
          currentTurn === "red"
            ? setCurrentTurn("black")
            : setCurrentTurn("red");
          setCounter(2);
          setSelectedSquareInfo("");
          return newSqr;
        });
      }
    }
  }
  function handleFlipBoard() {
    setIsFlipped(true);
    setSqr((prevState) => {
      const flippedBoard = [...prevState].reverse();
      return flippedBoard;
    });
  }
  function handleCreatePiece(piece, color, row, column) {
    setSqr((prevState) => {
      const newSqr = [...prevState];
      const index = newSqr.findIndex((s) => s.id === `${row}-${column}`);
      newSqr[index] = { ...newSqr[index], piece: piece, color: color };
      return newSqr;
    });
  }
  function produceFENString(ary) {
    let FENQuery = [];
    ary.forEach((sqr) => {
      if (sqr.piece === null) {
        if (typeof FENQuery[FENQuery.length - 1] === "number") {
          FENQuery[FENQuery.length - 1] += 1;
        } else {
          FENQuery.push(1);
        }
      } else {
        let letter;
        if (sqr.piece === "knight") {
          letter = "n";
        } else {
          letter = sqr.piece.split("")[0];
        }
        FENQuery.push(sqr.color === "red" ? letter.toUpperCase() : letter);
        return;
      }
    });
    return FENQuery;
  }
  function handleGenerateFEN() {
    const newSqr = isFlipped
      ? [...latestSqr.current].reverse()
      : [...latestSqr.current];
    const rows = {};
    for (let i = 10; i >= 1; i--) {
      rows[`row${i}`] = newSqr.filter((sqr) => sqr.row === i);
    }
    const rowFEN = [];
    for (const row in rows) {
      rowFEN.push(produceFENString(rows[row]));
    }
    const FENQuery = [];
    for (const row of rowFEN) {
      FENQuery.push(row.join(""));
    }
    setFENOutput(FENQuery.join("/"));
  }
  function handleParseFENInput(FEN) {
    const splitUpFEN = FEN.split("/");
    const lastFEN = splitUpFEN[9].split(" ")[0]; // removing everything but the FEN code in the last row
    splitUpFEN[splitUpFEN.length - 1] = lastFEN;
    console.log(splitUpFEN);
    const decodedFEN = splitUpFEN.map(FENstring => {
      return FENstring
        .replace(/9/g, "111111111")
        .replace(/8/g, "11111111")
        .replace(/7/g, "1111111")
        .replace(/6/g, "111111")
        .replace(/5/g, "11111")
        .replace(/4/g, "1111")
        .replace(/3/g, "111")
        .replace(/2/g, "11");
    });
    console.log(decodedFEN);
  }
  function validFENInput(input) {
    if (typeof input.trim() !== "string") {
      console.log("not string", typeof input);
      return;
    } else {
    }
  }

  return (
    <BoardContext.Provider
      value={{
        handleMovePiece,
        capturedPieceList,
        handleGenerateFEN,
        FENOutput,
        handleParseFENInput,
        validFENInput,
      }}
    >
      <div>
        <div className="app__header">
          <h1>XiangQi Board</h1>
          <BoardOptions
            handleFlipBoard={handleFlipBoard}
            handleCreatePiece={handleCreatePiece}
            handleClearBoard={handleClearBoard}
          />
        </div>
        <div className="app__container">
          <Board squares={sqr} />
          <BoardInfo />
        </div>
      </div>
    </BoardContext.Provider>
  );
}

export default App;
