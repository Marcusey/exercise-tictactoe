import { useState } from "react";

type SquareValue = "X" | "O" | null;

function Board() {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index: number) => {
    if (squares[index]) return;

    const nextSquares = [...squares];
    nextSquares[index] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  return (
    <div className="board">
      {squares.map((value, index) => (
        <button
          className="square"
          key={index}
          onClick={() => handleClick(index)}
        >
          {value}
        </button>
      ))}
    </div>
  );
}

export default Board;