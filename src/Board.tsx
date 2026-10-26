
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

function calculateWinningLine(squares: SquareValue[]): number[] | null {
  for (const [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return [a, b, c];
    }
  }

  return null;
}

function Board() {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [showWin, setShowWin] = useState(true);

  const winningLine = calculateWinningLine(squares);
  const winner = winningLine ? squares[winningLine[0]] : null;
  const isDraw = !winner && squares.every((square) => square !== null);

  const handleClick = (index: number) => {
    if (winner) {
      setShowWin((current) => !current);
      return;
    }

    if (squares[index]) return;

    const nextSquares = [...squares];
    nextSquares[index] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

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
    setShowWin(true);
  };

  return (
    <div>
      <p className="status">
        {winner ? (
          <>
            Winner:{" "}
            <span className={winner === "X" ? "x" : "o"}>{winner}</span>
          </>
        ) : isDraw ? (
          "It's a draw"
        ) : (
          <>
            Next player:{" "}
            <span className={xIsNext ? "x" : "o"}>
              {xIsNext ? "X" : "O"}
            </span>
          </>
        )}
      </p>
      
      <div className="board">
        {squares.map((value, index) => {
          const showWinningResult = winner && showWin;

          const squareClass = showWinningResult
            ? winningLine?.includes(index)
              ? "square winner winning-square"
              : "square winner"
            : value === "X"
              ? "square x"
              : value === "O"
                ? "square o"
                : "square";

          return (
            <button
              className={squareClass}
              key={index}
              onClick={() => handleClick(index)}
            >
              {showWinningResult ? "WIN" : value}
            </button>
          );
        })}
      </div>

      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default Board;
