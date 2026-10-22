
function Board() {
  return (
    <div className="board">
      {Array.from({ length: 9 }).map((_, index) => (
        <button className="square" key={index}>
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default Board;
