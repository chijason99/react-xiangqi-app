import React, { useEffect } from "react";
import useState from "react-usestateref";
import Board from "./Board/Board";
import BoardOptions from "./Board/BoardOptions";
import BoardInfo from "./BoardInfo/BoardInfo";
import NotificationModal from "./BoardInfo/NotificationModal";
import {
  pawn,
  advisor,
  bishop,
  king,
  rook,
  cannon,
  knight,
  checkDanger,
} from "./pieceLogic";
import "./css/app.css";

export const BoardContext = React.createContext();

function App() {
  const row = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const column = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const squares = [];
  const defaultSquareTemplate = {
    id: null,
    piece: null,
    color: null,
    row: null,
    column: null,
    isAvailable: false,
    isPreviousMoved: false,
    isJustMoved: false,
    isSelected: false,
  };
  const initFEN =
    "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w";
  row.forEach((r) => {
    column.forEach((c) => {
      const square = {
        ...defaultSquareTemplate,
        id: `${r}-${c}`,
        piece: null,
        color: null,
        row: r,
        column: c,
      };
      squares.push(square);
    });
  });

  const [sqr, setSqr, latestSqr] = useState(squares);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedSquareInfo, setSelectedSquareInfo] = useState();
  const [availableSqr, setAvailableSqr, latestAvailableSqr] = useState([]);
  const [counter, setCounter] = useState(0);
  const [currentTurn, setCurrentTurn] = useState("red");
  const [capturedPieceList, setCapturedPieceList] = useState([]);
  const [FENOutput, setFENOutput] = useState(initFEN);
  const [error, setError] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    handleGenerateFEN();
    checkGameOver();
  });
  useEffect(() => {
    handleInit();
    // NOTE: Run effect once on component mount, please
    // recheck dependencies if effect is updated.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => checkGameOver(), [sqr])
  function addAvailableStyle() {
    const newSqr = [...sqr];
    for (const s of newSqr) {
      s.isAvailable = false;
      if (latestAvailableSqr.current.some((sqr) => sqr.id === s.id)) {
        s.isAvailable = true;
      }
    }
    setSqr(newSqr);
  }
  function handleSelectSquare(row, column) {
    const newSqr = [...sqr];
    const index = newSqr.findIndex((s) => s.id === `${row}-${column}`);
    for (const s of newSqr) {
      s.isSelected = false;
    }
    newSqr[index].isSelected = true;
    setSelectedSquareInfo((prevState) => ({ ...prevState, ...newSqr[index] }));
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
  function handleMovePiece(piece, color, row, column) {
    // if no piece was selected
    if (counter % 2 === 0) {
      if (color === currentTurn) {
        handleSelectSquare(row, column);
        setAvailableSqr(findAvailableSqr(piece, color, row, column));
        addAvailableStyle();
      } else {
        return;
      }
    } else if (counter % 2 !== 0) {
      // if you selected a piece and then click on another piece of yours
      if (color === currentTurn) {
        handleSelectSquare(row, column);
        setAvailableSqr(findAvailableSqr(piece, color, row, column));
        addAvailableStyle();
        return;
      } else if (availableSqr.some((sqr) => sqr.id === `${row}-${column}`)) {
        // if you are clicking on your opponent's piece, i.e. capturing a piece
        if (color !== null) {
          //setting the state of captured Piece list
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
          for (const s of newSqr) {
            s.isJustMoved = false;
            s.isPreviousMoved = false;
            s.isAvailable = false;
          }
          // clear the starting position
          newSqr[startIndex] = {
            ...newSqr[startIndex],
            piece: null,
            color: null,
            isPreviousMoved: true,
          };
          // create the piece at destination
          newSqr[destinationIndex] = {
            ...newSqr[destinationIndex],
            piece: selectedSquareInfo.piece,
            color: selectedSquareInfo.color,
            isJustMoved: true,
          };
          return newSqr;
        });
        // change turn order
        currentTurn === "red" ? setCurrentTurn("black") : setCurrentTurn("red");
        checkGameOver();
        setCounter(2);
        setSelectedSquareInfo("");
      } else if (!availableSqr.some((sqr) => sqr.id === `${row}-${column}`)) {
        // if selecting unavailable sqr
        const newSqr = [...sqr];
        for (const s of newSqr) {
          s.isAvailable = false;
          s.isSelected = false;
        }
        setSqr(newSqr);
        setSelectedSquareInfo("");
        setAvailableSqr([]);
        return;
      }
    }
  }
  function findAvailableSqr(piece, color, row, column) {
    const newSqr = [...sqr];
    const targetSqr = [];
    const selectSqrById = (id) => newSqr.find((s) => s.id === id);
    const generateTargetSqr = (ary) => {
      for (const sq of ary) {
        targetSqr.push(selectSqrById(sq));
      }
    };
    switch (piece) {
      case "pawn":
        generateTargetSqr(pawn(color, row, column));
        break;
      case "advisor":
        generateTargetSqr(advisor(color, row, column));
        break;
      case "bishop":
        generateTargetSqr(bishop([...sqr], color, row, column));
        break;
      case "king":
        generateTargetSqr(king(color, row, column));
        break;
      case "rook":
        generateTargetSqr(rook([...sqr], row, column));
        break;
      case "cannon":
        generateTargetSqr(cannon([...sqr], color, row, column));
        break;
      case "knight":
        generateTargetSqr(knight([...sqr], row, column));
        break;
      default:
        return;
    }
    const newTargetSqr = targetSqr.filter((s) => s.color !== currentTurn); //filtered out the sqr that have teammates on it
    const validatedTargetSqr = [];
    for (const target of newTargetSqr) {
      //loop through the newTargetSqr
      const stimulateSqr = [...sqr];
      const originalIndex = stimulateSqr.findIndex(
        (s) => s.id === `${row}-${column}`
      );
      const destinationIndex = stimulateSqr.findIndex(
        (s) => s.id === `${target.row}-${target.column}`
      );
      stimulateSqr[originalIndex] = {
        ...stimulateSqr[originalIndex],
        piece: null,
        color: null,
      }; //modified the original sqr
      stimulateSqr[destinationIndex] = {
        ...stimulateSqr[destinationIndex],
        piece: piece,
        color: color,
      }; // modify the target sqr
      const kingSqr = stimulateSqr.find(
        (s) => s.piece === "king" && s.color === color
      ); //locate the king in the stimulated sqr
      if (
        checkDanger(stimulateSqr, color, kingSqr.row, kingSqr.column) ==
        undefined
      ) {
        // if the king is safe after stimulation, then the move is valid
        validatedTargetSqr.push(target);
      }
    }
    return validatedTargetSqr;
  }
  function checkGameOver() {
    const pieceList = sqr.filter(
      (p) => p.color === currentTurn && p.piece != null
    );
    console.log(pieceList);
    const possibleMoveList = [];
    for (const piece of pieceList) {
      const moveList = findAvailableSqr(
        piece.piece,
        piece.color,
        piece.row,
        piece.column
      );
      // console.log(moveList)
      if (moveList.length !== 0) {
        possibleMoveList.push(...moveList);
      }
    }
    console.log(possibleMoveList, possibleMoveList.length);
    if (possibleMoveList.length === 0) {
      setGameOver(true);
      return
    } else {
      setGameOver(false);
      return
    }
  }
  function handleFlipBoard() {
    setIsFlipped(true);
    setSqr((prevState) => {
      const flippedBoard = [...prevState].reverse();
      return flippedBoard;
    });
  }
  function handleInit() {
    handleClearBoard();
    setCapturedPieceList([]);
    handleParseFENInput(initFEN);
  }
  function validFENInput(input) {
    if (!input.trim().split("/")) {
      return false;
    } else {
      const splitUpFEN = input.trim().split("/");
      if (splitUpFEN.length === 10) {
        const lastFEN = splitUpFEN[9].split(" ")[0];
        splitUpFEN[splitUpFEN.length - 1] = lastFEN;
        const decodedFEN = splitUpFEN.map((FENstring) => {
          return FENstring.replace(/9/g, "111111111")
            .replace(/8/g, "11111111")
            .replace(/7/g, "1111111")
            .replace(/6/g, "111111")
            .replace(/5/g, "11111")
            .replace(/4/g, "1111")
            .replace(/3/g, "111")
            .replace(/2/g, "11")
            .split("");
        });
        for (const FENstring of decodedFEN) {
          if (FENstring.length !== 9) {
            return false;
          }
          if (
            FENstring.every((sqr) => {
              return sqr.match(/[krncabpKRNCABP1]/);
            })
          ) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    }
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
    //check if the board now is flipped
    const newSqr = isFlipped
      ? [...latestSqr.current].reverse()
      : [...latestSqr.current];
    const rows = {};
    //creating a rows object to store info of the FEN string on each row
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
    const turnOrder = currentTurn === "red" ? "w" : "b";
    const result = `${FENQuery.join("/")} ${turnOrder}`;
    setFENOutput(result);
  }

  function handleParseFENInput(FEN) {
    //separate the FEN string into sections according to their rows
    const splitUpFEN = FEN.trim().split("/");
    //getting the FEN of the last row, excluding other info
    const lastFEN = splitUpFEN[9].split(" ")[0];
    //getting the turn order info
    const turnOrder = splitUpFEN[9].split(" ")[1];
    splitUpFEN[splitUpFEN.length - 1] = lastFEN;
    //replacing the number of empty squares into "1"s
    const decodedFEN = splitUpFEN.map((FENstring) => {
      return FENstring.replace(/9/g, "111111111")
        .replace(/8/g, "11111111")
        .replace(/7/g, "1111111")
        .replace(/6/g, "111111")
        .replace(/5/g, "11111")
        .replace(/4/g, "1111")
        .replace(/3/g, "111")
        .replace(/2/g, "11")
        .split("");
    });
    const newSqr = [];
    // setting the new sqr state from the decoded FEN
    decodedFEN.forEach((FENstring, FENStringIndex) => {
      FENstring.forEach((FENletter, letterIndex) => {
        const sqrFromFEN = {
          ...defaultSquareTemplate,
          piece: identifyPiece(FENletter),
          color: identifyColor(FENletter),
          row: 10 - FENStringIndex,
          column: letterIndex + 1,
          id: `${10 - FENStringIndex}-${letterIndex + 1}`,
        };
        newSqr.push(sqrFromFEN);
      });
    });
    isFlipped ? setSqr(newSqr.reverse()) : setSqr(newSqr);
    if (turnOrder) {
      switch (turnOrder) {
        case "w":
          setCurrentTurn("red");
          break;
        case "b":
          setCurrentTurn("black");
          break;
        default:
          setCurrentTurn("red");
      }
    }
    setCounter(0);
  }
  function identifyPiece(letter) {
    // identify piece from letters of FEN string
    switch (letter.toUpperCase()) {
      case "K":
        return "king";
      case "R":
        return "rook";
      case "N":
        return "knight";
      case "C":
        return "cannon";
      case "A":
        return "advisor";
      case "B":
        return "bishop";
      case "P":
        return "pawn";
      default:
        return null;
    }
  }
  function identifyColor(letter) {
    if (parseInt(letter) === 1) {
      return null;
    } else if (letter === letter.toUpperCase()) {
      // is capital, i.e. is red
      return "red";
    } else {
      return "black";
    }
  }
  function handleCloseNotificationModal() {
    if (error === true) {
      setError(false);
    } else if (gameOver === true) {
      setGameOver(false);
    }
  }
  function handleOpenErrorModal() {
    setError(true);
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
        handleOpenErrorModal,
        currentTurn,
      }}
    >
      <div>
        {(error || gameOver) && (
          <NotificationModal
            handleCloseNotificationModal={handleCloseNotificationModal}
            error={error}
            gameOver={gameOver}
            currentTurn={currentTurn}
          />
        )}
        <div className={`app__header ${error || gameOver ? "disabled" : ""}`}>
          <h1 className={currentTurn === "red" ? "red" : "black"}>
            Xiang Qi App
          </h1>
          <BoardOptions
            handleFlipBoard={handleFlipBoard}
            handleInit={handleInit}
          />
        </div>
        <div className={`app__container ${error ? "disabled" : ""}`}>
          <Board squares={sqr} />
          <BoardInfo />
        </div>
      </div>
    </BoardContext.Provider>
  );
}

export default App;
