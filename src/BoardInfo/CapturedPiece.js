import React, {useContext} from 'react'
import Piece from '../Board/Piece'
import { BoardContext } from '../App'
import {v4 as uuidv4} from 'uuid'
export default function CapturedPiece({color}) {
  const {capturedPieceList} = useContext(BoardContext);
  const newCapturedPieceList = [...capturedPieceList].map(p => ({...p, id:uuidv4()}));
  const filteredList = newCapturedPieceList.filter(p => p.color === color );
  filteredList.sort((a,b) => {
    const pieceA = a.piece;
    const pieceB = b.piece;
    return (pieceA > pieceB ? -1 : 1)
  })
  return (
    <div className='captured-piece-list__container'>
      {filteredList.map(p => (
        <Piece pieceInfo={p} key={p.id}/>
      ))}
    </div>
  )
}
