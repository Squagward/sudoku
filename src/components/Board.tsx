import { useState } from "react";

const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export const Board = () => {
  const SIZE = 9;
  const [board, setBoard] = useState<(number | null)[]>(Array(81).fill(null));
  const [corners, setCorners] = useState<number[][]>(Array(81).fill([]));
  const [selected, setSelected] = useState(-1);

  const setCornerNumbers = (index: number, corners: number[] = []) => {
    setCorners((prev) => {
      const temp = [...prev];
      temp[index] = corners;
      return temp;
    });
  };

  const isSelected = (index: number) => index === selected;

  const isAdjacent = (index: number) => {
    return (
      index % 9 === selected % 9 ||
      Math.floor(index / 9) === Math.floor(selected / 9)
    );
  };

  const inSame3x3 = (row: number, col: number) => {
    const selectedX = Math.floor(selected / 9);
    const selectedY = Math.floor(selected % 9);
    return (
      Math.floor(row / 3) === Math.floor(selectedX / 3) &&
      Math.floor(col / 3) === Math.floor(selectedY / 3)
    );
  };

  const resetBoard = () => {
    setBoard(Array(81).fill(null));
    setSelected(-1);
  };

  const handleArrowMovements = (e: React.KeyboardEvent<any>) => {
    switch (e.key) {
      case "ArrowLeft":
        if (selected % 9 > 0) setSelected(selected - 1);
        break;
      case "ArrowRight":
        if (selected % 9 < 8) setSelected(selected + 1);
        break;
      case "ArrowUp":
        if (Math.floor(selected / 9) > 0) setSelected(selected - 9);
        break;
      case "ArrowDown":
        if (Math.floor(selected / 9) < 8) setSelected(selected + 9);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <table className="board">
        <tbody>
          {rows.map((row) => (
            <tr key={row}>
              {rows.map((col) => {
                const index = row * SIZE + col;
                return (
                  <td
                    key={col}
                    tabIndex={-1}
                    onClick={() => setSelected(index)}
                    onKeyDown={(e) => {
                      e.preventDefault();
                      handleArrowMovements(e);

                      const key = parseInt(e.key);
                      if (key >= 1 && key <= 9) {
                        setBoard((prev) => {
                          const temp = [...prev];
                          temp[index] = key;
                          return temp;
                        });
                      }
                    }}
                    className={
                      isSelected(index)
                        ? "selected"
                        : isAdjacent(index) || inSame3x3(row, col)
                        ? "adjacent"
                        : ""
                    }
                  >
                    {board[index]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={resetBoard}>Reset Board</button>
    </>
  );
};
