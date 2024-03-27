interface Props {
  start: boolean;
  board: string[][];
  correctIndex: {
    rowIndex: number;
    cellIndex: number;
  }[];
  selectResponse: (logo: string, rowIndex: number, cellIndex: number) => void;
}

function Board({ start, board, correctIndex, selectResponse }: Props) {
  return (
    <main>
      <div className="board">
        {start &&
          board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((logo, cellIndex) => (
                <div
                  key={cellIndex}
                  className={`cell ${
                    correctIndex.some(
                      (index) =>
                        index.rowIndex === rowIndex &&
                        index.cellIndex === cellIndex
                    )
                      ? "correct"
                      : ""
                  }`}
                  onClick={() => selectResponse(logo[0], rowIndex, cellIndex)}
                >
                  <div>
                    <img
                      height={40}
                      width={40}
                      src={logo[1]}
                      alt={logo[0]}
                      className="logo"
                    />
                    <h3>{logo[0]}</h3>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </main>
  );
}

export default Board;
