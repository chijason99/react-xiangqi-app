import React from 'react'

export default function BoardOptions(props) {
  const {
    handleFlipBoard,
    handleInit
  } = props;

  return (
    <div className='board-options-container'>
        <button className='btn btn--primary' onClick={()=>{handleFlipBoard()}}>Flip Board</button>
        <button className='btn btn--primary'>Change Theme</button>
        <button className='btn btn--primary' onClick={handleInit}>Restart Game</button>
    </div>
  )
}
