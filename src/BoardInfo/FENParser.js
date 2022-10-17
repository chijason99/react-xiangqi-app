import React, {useContext, useState} from 'react'
import { BoardContext } from '../App'
export default function FENParser() {
  const [isClicked, setIsClicked] = useState(true)
  const [inputFEN, setInputFEN, FEN] = useState('')
  const {handleParseFENInput, validFENInput} = useContext(BoardContext)

  function handleClickParseFEN(){
    handleParseFENInput(inputFEN)
  }

  function handleInputFEN(e){
    setInputFEN(e.target.value)
  }
  return (
    <>
    {!isClicked && <button className='btn btn--primary'>Parse FEN</button>}
    {isClicked  &&  <textarea className='FEN-input' type="text" onChange={(e) => handleInputFEN(e)} />}
    {isClicked  &&  <button className='btn btn--blue' onClick={()=>{handleParseFENInput(inputFEN)}}>Parse</button>}
    {isClicked  &&  <button className='btn btn--close'>&times;</button>}
    </>
  )
}
