function addAvailableSqrId(ary, row, column) {
  ary.push(`${row}-${column}`);
}
const palace = {
  redRow: [1, 2, 3],

  blackRow: [10, 9, 8],

  column: [4, 5, 6],
};

export function pawn(color, row, column) {
  const availableSqrId = [];
  if (color === "red") {
    if (row >= 4 && row <= 9) {
      // move forward
      addAvailableSqrId(availableSqrId, parseInt(row) + 1, column);
    }
    if (row >= 6 && column > 1) {
      // move to the left
      addAvailableSqrId(availableSqrId, row, parseInt(column) - 1);
    }
    if (row >= 6 && column < 9) {
      // move to the right
      addAvailableSqrId(availableSqrId, row, parseInt(column) + 1);
    }
  } else if (color === "black") {
    if (row <= 7 && row >= 2) {
      // move forward
      addAvailableSqrId(availableSqrId, parseInt(row) - 1, column);
    }
    if (row <= 5 && column > 1) {
      // move to the left
      addAvailableSqrId(availableSqrId, row, parseInt(column) - 1);
    }
    if (row <= 5 && column < 9) {
      addAvailableSqrId(availableSqrId, row, parseInt(column) + 1);
    }
  }
  return availableSqrId;
}

export function advisor(color, row, column) {
  const availableSqrId = [];
  if (color === "red") {
    if (palace.redRow.includes(parseInt(row) + 1)) {
      // if the advisor is at 1st floor or 2nd floor
      if (palace.column.includes(parseInt(column) + 1)) {
        // if column is 4 or 5
        // move top-right
        addAvailableSqrId(
          availableSqrId,
          parseInt(row) + 1,
          parseInt(column) + 1
        );
      }
      if (palace.column.includes(parseInt(column) - 1)) {
        // // if column is 6 or 5
        // move top-left
        addAvailableSqrId(
          availableSqrId,
          parseInt(row) + 1,
          parseInt(column) - 1
        );
      }
    }
    if (palace.redRow.includes(parseInt(row) - 1)) {
      // if the advisor is at 3rd floor or 2nd floor
      if (palace.column.includes(parseInt(column) + 1)) {
        // if column is 4 or 5
        // move bottom-right
        addAvailableSqrId(
          availableSqrId,
          parseInt(row) - 1,
          parseInt(column) + 1
        );
      }
      if (palace.column.includes(parseInt(column) - 1)) {
        // if column is 5 or 6
        // move bottom-left
        addAvailableSqrId(
          availableSqrId,
          parseInt(row) - 1,
          parseInt(column) - 1
        );
      }
    }
  } else if (color === "black") {
    if (palace.blackRow.includes(parseInt(row) + 1)) {
      // if the advisor is at 8th floor or 9th floor
      if (palace.column.includes(parseInt(column) + 1)) {
        // if column is 4 or 5
        // move top-right
        addAvailableSqrId(
          availableSqrId,
          parseInt(row) + 1,
          parseInt(column) + 1
        );
      }
      if (palace.column.includes(parseInt(column) - 1)) {
        // // if column is 6 or 5
        // move top-left
        addAvailableSqrId(
          availableSqrId,
          parseInt(row) + 1,
          parseInt(column) - 1
        );
      }
    }
    if (palace.blackRow.includes(parseInt(row) - 1)) {
      // if the advisor is at 3rd floor or 2nd floor
      if (palace.column.includes(parseInt(column) + 1)) {
        // if column is 4 or 5
        // move bottom-right
        addAvailableSqrId(
          availableSqrId,
          parseInt(row) - 1,
          parseInt(column) + 1
        );
      }
      if (palace.column.includes(parseInt(column) - 1)) {
        // if column is 5 or 6
        // move bottom-left
        addAvailableSqrId(
          availableSqrId,
          parseInt(row) - 1,
          parseInt(column) - 1
        );
      }
    }
  }
  return availableSqrId;
}

export function bishop(sqr, color, row, column) {
  const availableSqrId = [];
  if (color === "red") {
    if (row < 5) {
      // if the bishop is at row 1 or row 3
      const topLeftObstacle = sqr.find(
        (s) => s.id === `${parseInt(row) + 1}-${parseInt(column) - 1}`
      );
      const topRightObstacle = sqr.find(
        (s) => s.id === `${parseInt(row) + 1}-${parseInt(column) + 1}`
      );
      if (column != 1) {
        if (topLeftObstacle.piece == null) {
          // if there is no pieces on its top left corner
          addAvailableSqrId(
            availableSqrId,
            parseInt(row) + 2,
            parseInt(column) - 2
          );
        }
      }
      if (column != 9) {
        if (topRightObstacle.piece == null) {
          addAvailableSqrId(
            availableSqrId,
            parseInt(row) + 2,
            parseInt(column) + 2
          );
        }
      }
    }
    if (row > 1) {
      // if the bishop is at row 3 or row 5
      const bottomLeftObstacle = sqr.find(
        (s) => s.id === `${parseInt(row) - 1}-${parseInt(column) - 1}`
      );
      const bottomRightObstacle = sqr.find(
        (s) => s.id === `${parseInt(row) - 1}-${parseInt(column) + 1}`
      );

      if (column != 1) {
        if (bottomLeftObstacle.piece == null) {
          // if there is no pieces on its top left corner
          addAvailableSqrId(
            availableSqrId,
            parseInt(row) - 2,
            parseInt(column) - 2
          );
        }
      }
      if (column != 9) {
        if (bottomRightObstacle.piece == null) {
          addAvailableSqrId(
            availableSqrId,
            parseInt(row) - 2,
            parseInt(column) + 2
          );
        }
      }
    }
  } else if (color === "black") {
    if (row < 10) {
      // if the bishop is at row 6 or row 8
      const topLeftObstacle = sqr.find(
        (s) => s.id === `${parseInt(row) + 1}-${parseInt(column) - 1}`
      );
      const topRightObstacle = sqr.find(
        (s) => s.id === `${parseInt(row) + 1}-${parseInt(column) + 1}`
      );
      if (column != 1) {
        if (topLeftObstacle.piece == null) {
          // if there is no pieces on its top left corner
          addAvailableSqrId(
            availableSqrId,
            parseInt(row) + 2,
            parseInt(column) - 2
          );
        }
      }
      if (column != 9) {
        if (topRightObstacle.piece == null) {
          addAvailableSqrId(
            availableSqrId,
            parseInt(row) + 2,
            parseInt(column) + 2
          );
        }
      }
    }
    if (row > 6) {
      // if the bishop is at row 8 or row 10
      const bottomLeftObstacle = sqr.find(
        (s) => s.id === `${parseInt(row) - 1}-${parseInt(column) - 1}`
      );
      const bottomRightObstacle = sqr.find(
        (s) => s.id === `${parseInt(row) - 1}-${parseInt(column) + 1}`
      );

      if (column != 1) {
        if (bottomLeftObstacle.piece == null) {
          // if there is no pieces on its top left corner
          addAvailableSqrId(
            availableSqrId,
            parseInt(row) - 2,
            parseInt(column) - 2
          );
        }
      }
      if (column != 9) {
        if (bottomRightObstacle.piece == null) {
          addAvailableSqrId(
            availableSqrId,
            parseInt(row) - 2,
            parseInt(column) + 2
          );
        }
      }
    }
  }
  return availableSqrId;
}
export function king(color, row, column) {
  const availableSqrId = [];
  if (column > 4) {
    // if the king is at 5th or 6th column
    // move to the left
    addAvailableSqrId(availableSqrId, row, column - 1);
  }
  if (column < 6) {
    // if the king is at 4th or 5th column
    // move to the right
    addAvailableSqrId(availableSqrId, row, column + 1);
  }
  if (color === "red") {
    if (row < 3) {
      // if the king is at 1st or 2nd floor
      //move upwards
      addAvailableSqrId(availableSqrId, row + 1, column);
    }
    if (row > 1) {
      // if the king is at 2nd or 3rd floor
      //move downwards
      addAvailableSqrId(availableSqrId, row - 1, column);
    }
  } else if (color === "black") {
    if (row < 10) {
      // if the king is at 1st or 2nd floor
      //move upwards
      addAvailableSqrId(availableSqrId, row + 1, column);
    }
    if (row > 8) {
      // if the king is at 2nd or 3rd floor
      //move downwards
      addAvailableSqrId(availableSqrId, row - 1, column);
    }
  }

  return availableSqrId;
}
export function rook(ary, row, column) {
  const availableSqrId = [];
  const horizontal = ary.filter((s) => s.row === row);
  const vertical = ary.filter((s) => s.column === column);
  if (row < 10) {
    // if it is not at the top, then it can try going up
    const up = vertical
      .filter((sqr) => sqr.row > row)
      .sort((a, b) => a.row - b.row); // sort them from bottom to top
    const havePiece = up.filter((sqr) => sqr.piece != null);
    if (havePiece.length !== 0) {
      for (let i = row + 1; i <= havePiece[0].row; i++) {
        addAvailableSqrId(availableSqrId, i, column);
      }
    } else if (havePiece.length === 0) {
      // if it is not at the bottom
      up.forEach((item) => {
        addAvailableSqrId(availableSqrId, item.row, item.column);
      });
    }
  }
  if (row > 1) {
    const down = vertical
      .filter((sqr) => sqr.row < row)
      .sort((a, b) => b.row - a.row); // sort them from top to bottom
    const havePiece = down.filter((sqr) => sqr.piece != null);
    if (havePiece.length != 0) {
      for (let i = parseInt(row) - 1; i >= parseInt(havePiece[0].row); i--) {
        addAvailableSqrId(availableSqrId, i, column);
      }
    } else if (havePiece.length == 0) {
      down.forEach((item) => {
        addAvailableSqrId(availableSqrId, item.row, item.column);
      });
    }
  }
  if (column < 9) {
    // if it is not on the right edge
    const right = horizontal
      .filter((sqr) => sqr.column > column)
      .sort((a, b) => a.row - b.row); // sort them from left to right
    const havePiece = right.filter((sqr) => sqr.piece != null);
    if (havePiece.length != 0) {
      for (
        let i = parseInt(column) + 1;
        i <= parseInt(havePiece[0].column);
        i++
      ) {
        addAvailableSqrId(availableSqrId, row, i);
      }
    } else if (havePiece.length == 0) {
      // if it is not at the bottom
      right.forEach((item) => {
        addAvailableSqrId(availableSqrId, item.row, item.column);
      });
    }
  }

  if (column > 1) {
    // if it is not on the left edge
    const left = horizontal
      .filter((sqr) => sqr.column < column)
      .sort((a, b) => b.column - a.column); // sort them from right to left
    const havePiece = left.filter((sqr) => sqr.piece != null);
    if (havePiece.length != 0) {
      for (
        let i = parseInt(column) - 1;
        i >= parseInt(havePiece[0].column);
        i--
      ) {
        addAvailableSqrId(availableSqrId, row, i);
      }
    } else if (havePiece.length == 0) {
      // if it is not at the bottom
      left.forEach((item) => {
        addAvailableSqrId(availableSqrId, item.row, item.column);
      });
    }
  }

  return availableSqrId;
}
export function cannon(ary, color, row, column) {
  const availableSqrId = [];
  const horizontalC = ary.filter((s) => s.row === row);
  const verticalC = ary.filter((s) => s.column === column);

  if (row < 10) {
    // if it is not at the top, then it can try going up
    const up = verticalC
      .filter((sqr) => sqr.row > row)
      .sort((a, b) => parseInt(a.row) - parseInt(b.row)); // sort them from bottom to top
    const havePiece = up.filter((sqr) => sqr.piece != null);
    if (havePiece.length != 0) {
      for (let i = parseInt(row) + 1; i < parseInt(havePiece[0].row); i++) {
        addAvailableSqrId(availableSqrId, i, column);
      }
      if (havePiece.length > 1) {
        // if there is at least 2 pieces in front
        if (havePiece[1].color != color)
          addAvailableSqrId(
            availableSqrId,
            havePiece[1].row,
            havePiece[1].column
          );
      }
    } else if (havePiece.length == 0) {
      // if it is not at the bottom
      up.forEach((item) => {
        addAvailableSqrId(availableSqrId, item.row, item.column);
      });
    }
  }
  if (row > 1) {
    const down = verticalC
      .filter((sqr) => sqr.row < row)
      .sort((a, b) => b.row - a.row); // sort them from top to bottom
    const havePiece = down.filter((item) => item.piece != null);
    if (havePiece.length != 0) {
      for (let i = row - 1; i > havePiece[0].row; i--) {
        addAvailableSqrId(availableSqrId, i, column);
      }
      if (havePiece.length > 1) {
        // if there is at least 2 pieces downwards
        if (havePiece[1].color != color)
          addAvailableSqrId(
            availableSqrId,
            havePiece[1].row,
            havePiece[1].column
          );
      }
    } else if (havePiece.length == 0) {
      down.forEach((item) => {
        addAvailableSqrId(availableSqrId, item.row, item.column);
      });
    }
  }
  if (column < 9) {
    // if it is not on the right edge
    const right = horizontalC
      .filter((sqr) => sqr.column > column)
      .sort((a, b) => parseInt(a.column) - parseInt(b.column)); // sort them from left to right
    const havePiece = right.filter((sqr) => sqr.piece != null);
    if (havePiece.length != 0) {
      for (
        let i = parseInt(column) + 1;
        i < parseInt(havePiece[0].column);
        i++
      ) {
        addAvailableSqrId(availableSqrId, row, i);
      }
      if (havePiece.length > 1) {
        // if there is at least 2 pieces on right
        if (havePiece[1].color != color)
          addAvailableSqrId(
            availableSqrId,
            havePiece[1].row,
            havePiece[1].column
          );
      }
    } else if (havePiece.length == 0) {
      // if it is not at the bottom
      right.forEach((item) => {
        addAvailableSqrId(availableSqrId, item.row, item.column);
      });
    }
  }
  if (column > 1) {
    // if it is not on the left edge
    const left = horizontalC
      .filter((sqr) => sqr.column < column)
      .sort((a, b) => parseInt(b.column) - parseInt(a.column)); // sort them from right to left
    const havePiece = left.filter((item) => item.piece != null);
    if (havePiece.length != 0) {
      for (
        let i = parseInt(column) - 1;
        i > parseInt(havePiece[0].column);
        i--
      ) {
        addAvailableSqrId(availableSqrId, row, i);
      }
      if (havePiece.length > 1) {
        // if there is at least 2 pieces on left
        if (havePiece[1].color != color)
          addAvailableSqrId(
            availableSqrId,
            havePiece[1].row,
            havePiece[1].column
          );
      }
    } else if (havePiece.length == 0) {
      // if it is not at the bottom
      left.forEach((item) => {
        addAvailableSqrId(availableSqrId, item.row, item.column);
      });
    }
  }
  return availableSqrId;
}
export function knight(sqr, row, column){
    const availableSqrId = []
    const upObstacle = sqr.find(s => s.id === `${row + 1}-${column}`)
    const downObstacle = sqr.find(s => s.id === `${row -1}-${column}`)
    const leftObstacle = sqr.find(s => s.id === `${row}-${column - 1}`)
    const rightObstacle = sqr.find(s => s.id === `${row}-${column + 1}`)

    if(row < 9 && upObstacle.piece == null ){
        if(column > 1){
            addAvailableSqrId(availableSqrId ,row + 2 , column - 1)
        };
        if(column < 9){
            addAvailableSqrId(availableSqrId ,row + 2 , column + 1)
        }
    };
    if(row > 2 && downObstacle.piece == null ){
        if(column > 1){
            addAvailableSqrId(availableSqrId ,row - 2 , column - 1)
        };
        if(column < 9){
            addAvailableSqrId(availableSqrId ,row - 2 , column + 1)
        }
    };
    if(column > 2 && leftObstacle.piece == null){
        if(row > 1){
            addAvailableSqrId(availableSqrId ,row - 1 , column - 2)
        };
        if(row < 10){
            addAvailableSqrId(availableSqrId ,row + 1 , column - 2)
        }
    };
    if(column < 8 && rightObstacle.piece == null){
        if(row > 1){
            addAvailableSqrId(availableSqrId ,row - 1 , column + 2)
        };
        if(row < 10){
            addAvailableSqrId(availableSqrId ,row + 1 , column + 2)
        }
    };
    return availableSqrId
}

//check danger squares for king
export function checkDanger(sqr,color,row,column){
    const vertical = sqr.filter(s => s.column === column);
    const horizontal = sqr.filter(s => s.row === row);

    //threats from top
    if(row < 10){
        const piecesAbove = vertical.filter(item => item.piece != null && parseInt(item.row) > row);
        piecesAbove.sort((a,b) => parseInt(a.row) - parseInt(b.row)) //from bottom to top
        if (piecesAbove.length > 0) {
            if(piecesAbove[0].color != color){
                if(piecesAbove[0].piece == 'rook' || piecesAbove[0].piece == 'king'){
                    return true
                };
                if(piecesAbove[0].piece == 'pawn'){            // if there is an black pawn 1 step away in front(only applicable for red)
                    if(color == 'red' && parseInt(piecesAbove[0].row) == row + 1){
                        return true
                    };
                };
            };
            if(piecesAbove.length > 1){
                if(piecesAbove[1].color != color){
                    if(piecesAbove[1].piece == 'cannon'){
                        return true
                    };
                };
            }
        }
    };
        //threats from bottom
        if(row > 1){
            const piecesBelow = vertical.filter(item => item.piece != null && parseInt(item.row) < row);
            piecesBelow.sort((a,b) => parseInt(b.row - parseInt(a.row))) //from bottom to top
            if (piecesBelow.length > 0) {
                if(piecesBelow[0].color != color){
                    if(piecesBelow[0].piece == 'rook' || piecesBelow[0].piece == 'king'){
                        return true
                    };
                    if(piecesBelow[0].piece == 'pawn'){            // if there is an black pawn 1 step away in front(only applicable for red)
                        if(color == 'black' && parseInt(piecesBelow[0].row) == row - 1){
                            return true
                        };
                    };
                };
                if(piecesBelow.length > 1){
                    if(piecesBelow[1].color != color){
                        if(piecesBelow[1].piece == 'cannon'){
                            return true
                        };
                    };
                }
            }
        };
        //threats from the left
        if(column > 1){
            const piecesLeft = horizontal.filter(item => item.piece != null && parseInt(item.column) < column);
            piecesLeft.sort((a,b) => parseInt(b.column) - parseInt(a.column)); // sort from right to left
            if (piecesLeft.length > 0) {
                if(piecesLeft[0].color != color){
                    if(piecesLeft[0].piece == 'rook'){
                        return true
                    };
                    if(piecesLeft[0].piece == 'pawn'){            // if there is an black pawn 1 step away in front(only applicable for red)
                        if(parseInt(piecesLeft[0].column) == column - 1){
                            return true
                        };
                    };
                };
                if(piecesLeft.length > 1){
                    if(piecesLeft[1].color != color){
                        if(piecesLeft[1].piece == 'cannon'){
                            return true
                        };
                    };
                }
            }
        };
        //threats from the right
        if(column < 9){
            const piecesRight = horizontal.filter(item => item.piece != null && parseInt(item.column) > column);
            piecesRight.sort((a,b) => parseInt(a.column) - parseInt(b.column)); // sort from left to right
            if (piecesRight.length > 0) {
                if(piecesRight[0].color != color){
                    if(piecesRight[0].piece == 'rook'){
                        return true
                    };
                    if(piecesRight[0].piece == 'pawn'){            // if there is an black pawn 1 step away in front(only applicable for red)
                        if(parseInt(piecesRight[0].column) == column + 1){
                            return true
                        };
                    };
                };
                if(piecesRight.length > 1){
                    if(piecesRight[1].color != color){
                        if(piecesRight[1].piece == 'cannon'){
                            return true
                        };
                    };
                }
            }
        };
        // threats from the horse
        const topLeftObstacle = sqr.find(s => s.id === `${row + 1}-${column - 1}`)
        const bottomLeftObstacle = sqr.find(s => s.id === `${row - 1}-${column - 1}`)

        const topRightObstacle = sqr.find(s => s.id === `${row + 1}-${column + 1}`)
        const bottomRightObstacle = sqr.find(s => s.id === `${row - 1}-${column + 1}`)

        function checkKnightSquare(r,c){
            const target = sqr.find(s => s.id === `${r}-${c}`)
            if(target.piece === 'knight' && target.color !== color){  //check if there is a knight on sqr(r,c))
                return true
            }else{
                return false
            }
        };
        if(row < 9){
            if(column > 1 && topLeftObstacle.piece == null ){        // if no obstacle on the top left
                if(checkKnightSquare(row + 2, column - 1)){
                    return true
                }
            };
            if(column < 9 && topRightObstacle.piece == null){        // if no obstacle on the top right
                if(checkKnightSquare(row + 2, column + 1)){
                    return true
                }
            };
        };
        if(row > 2){
            if(column > 1 && bottomLeftObstacle.piece == null){        // if no obstacle on the bottom left
                if(checkKnightSquare(row - 2, column - 1)){
                    return true
                }
            };
            if(column < 9 && bottomRightObstacle.piece == null){        // if no obstacle on the bottom right
                if(checkKnightSquare(row - 2, column + 1)){
                    return true
                }
            };
        };
        if(column > 2){
            if( row < 10 && topLeftObstacle.piece == null){        // if no obstacle on the top left
                if(checkKnightSquare(row + 1, column - 2)){
                    return true
                }
            };
            if(row > 1 && bottomLeftObstacle.piece == null ){        // if no obstacle on the bottom left
                if(checkKnightSquare(row - 1, column - 2)){
                    return true
                }
            };
        };
        if(column < 8){
            if(row < 10 && topRightObstacle.piece == null ){        // if no obstacle on the top right
                if(checkKnightSquare(row + 1, column + 2)){
                    return true
                }
            };
            if(row > 1 && bottomRightObstacle.piece == null){        // if no obstacle on the top right
                if(checkKnightSquare(row - 1, column + 2)){
                    return true
                }
            };
        };
};

    // function validateLegalMove(validatedAry, oldPiece, oldColor, oldRow, oldColumn,newPiece, newColor, newRow, newColumn) {
    //   //parameter is the moving piece
    //   const newSqr = [...sqr];
    //   const oldIndex = newSqr.findIndex((s) => s.id === `${oldRow}-${oldColumn}`);
    //   // const oldInfo = { ...newSqr[oldIndex] };
    //   const kingSqr = newSqr.find(
    //     (s) => s.piece === "king" && s.color === oldColor
    //   );
    //   // t.forEach((target) => {
    //     // target is the original piece on available sqr
    //     const newIndex = newSqr.findIndex(
    //       (s) => s.id === `${newRow}-${newColumn}`
    //     );
    //     // const newInfo = { ...newSqr[newIndex] };

    //     if (newPiece != null) {
    //       if (newColor !== oldColor) {
    //         // if the available move is to capture pieces
    //         newSqr[newIndex].piece = oldPiece;
    //         newSqr[newIndex].color = oldColor;
    //         newSqr[oldIndex].piece = null;
    //         newSqr[oldIndex].color = null;
    //         setSqr(newSqr);
    //         // simulate what happen after the move
    //         if (oldPiece !== "king") {
    //           if (!checkDanger(latestSqr.current, oldColor, kingSqr.row, kingSqr.column)) {
    //             // add the available spots if our king will be captured after the move
    //             const legalSqr = newSqr.find(s => s.id === `${oldRow}-${}`)
    //             validatedAry.push()
    //           }
    //         } else if (piece === "king") {
    //           if (!checkDanger(latestSqr.current, oldColor, newRow, newColumn)) {
    //             // if we want to move the king, then the king would be in the new square
    //             const illegalIndex = newTargetSqr.findIndex(
    //               (s) => s.id !== `${target.row}-${target.column}`
    //             );
    //             newTargetSqr.splice(0, illegalIndex);
    //           }
    //         }
    //         newSqr[newIndex] = { ...newInfo };
    //         newSqr[oldIndex] = { ...oldInfo };
    //         setSqr(newSqr);
    //       }
    //     } else if (target.piece == null) {
    //       // if the potential move is not capturing a piece
    //       const newIndex = newSqr.findIndex(
    //         (s) => s.id === `${target.row}-${target.column}`
    //       );
    //       const newInfo = { ...newSqr[newIndex] };

    //       newSqr[newIndex] = {
    //         ...newSqr[newIndex],
    //         piece: piece,
    //         color: color,
    //       };
    //       newSqr[oldIndex] = { ...oldInfo, piece: null, color: null };
    //       setSqr(newSqr);
    //       if (piece !== "king") {
    //         if (checkDanger(newSqr, color, kingSqr.row, kingSqr.column)) {
    //           const illegalIndex = newTargetSqr.findIndex(
    //             (s) => s.id !== `${target.row}-${target.column}`
    //           );
    //           newTargetSqr.splice(0, illegalIndex);
    //         }
    //       } else if (piece === "king") {
    //         if (checkDanger(newSqr, color, target.row, target.column)) {
    //           const illegalIndex = newTargetSqr.findIndex(
    //             (s) => s.id !== `${target.row}-${target.column}`
    //           );
    //           newTargetSqr.splice(0, illegalIndex);
    //         }
    //       }
    //       newSqr[newIndex] = { ...newInfo };
    //       newSqr[oldIndex] = { ...oldInfo };
    //       setSqr(newSqr);
    //     }
    //   // });
    //   return newTargetSqr
    // }
    // validateLegalMove(piece, color, row, column);