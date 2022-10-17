import React, {useEffect} from 'react'

export default function BoardOptions(props) {
  const {
    handleCreatePiece,
    handleFlipBoard,
    handleClearBoard
  } = props;

  useEffect(()=>{
    console.log('mounted')
    init();
  }, []);
  
  function init(){
    handleClearBoard();
    handleCreatePiece('rook', 'red', 1, 1);
    handleCreatePiece('rook', 'red', 1, 9);
    handleCreatePiece('rook', 'black', 10, 1);
    handleCreatePiece('rook', 'black', 10, 9);
    handleCreatePiece('knight', 'red', 1, 2)
    handleCreatePiece('knight', 'red', 1, 8)
    handleCreatePiece('knight', 'black', 10, 2)
    handleCreatePiece('knight', 'black', 10, 8)
    handleCreatePiece('pawn','red',4,1)
    handleCreatePiece('pawn','red',4,3)
    handleCreatePiece('pawn','red',4,5)
    handleCreatePiece('pawn','red',4,7)
    handleCreatePiece('pawn','red',4,9)
    handleCreatePiece('pawn','black',7,1)
    handleCreatePiece('pawn','black',7,3)
    handleCreatePiece('pawn','black',7,5)
    handleCreatePiece('pawn','black',7,7)
    handleCreatePiece('pawn','black',7,9)
    handleCreatePiece('cannon','red',3,2)
    handleCreatePiece('cannon','red',3,8)
    handleCreatePiece('cannon','black',8,2)
    handleCreatePiece('cannon','black',8,8)
    handleCreatePiece('bishop','red',1,3)
    handleCreatePiece('bishop','red',1,7)
    handleCreatePiece('bishop','black',10,3)
    handleCreatePiece('bishop','black',10,7)
    handleCreatePiece('advisor','red',1,4)
    handleCreatePiece('advisor','red',1,6)
    handleCreatePiece('advisor','black',10,4)
    handleCreatePiece('advisor','black',10,6)
    handleCreatePiece('king','red',1,5)
    handleCreatePiece('king','black',10,5)
  }
  return (
    <div className='board-options-container'>
        <button className='btn btn--primary' onClick={()=>{handleFlipBoard()}}>Flip Board</button>
        <button className='btn btn--primary'>Change Theme</button>
        <button className='btn btn--primary' onClick={init}>Restart Game</button>
    </div>
  )
}
