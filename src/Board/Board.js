import React from "react";
import Square from "./Square";
export default function Board({squares}) {
  return (
    <div className="board">
      <Square squares={squares} />
    </div>
  );
}
