import { useState } from "react";

type SquareValue = "X" | "O" | null;

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares: SquareValue[]): SquareValue {
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board() {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index: number) => {
if (squares[index] || calculateWinner(squares)) return;

    const nextSquares = [...squares];
    nextSquares[index] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
const isDraw = !winner && squares.every(square => square !== null);

let status: string;
if (winner) {
  status = `Winner: ${winner}`;
} else if (isDraw) {
  status = "It's a draw";
} else {
  status = `Next player: ${xIsNext ? "X" : "O"}`;
}

const handleReset = () => {
  setSquares(Array(9).fill(null));
  setXIsNext(true);
};

return (
  <div>
    <p className="status">{status}</p>
    <div className="board">
      {squares.map((value, index) => (
        <button
          className={`square ${value === "X" ? "x" : value === "O" ? "o" : ""}`}
          key={index}
          onClick={() => handleClick(index)}
        >
          {value}
        </button>
      ))}
    </div>
  <button className="reset-button" onClick={handleReset}>Reset</button>
</div>
);
}

export default Board;