import { useSudoku } from "../hooks/sudokuContext";
import { useTime } from "../hooks/timeContext";
import useInterval from "../hooks/useInterval";
import styles from "../styles/Timer.module.css";

export const Timer = () => {
  const { board, won } = useSudoku();
  const { time, setTime } = useTime();

  useInterval(!won && !board.every((cell) => cell.number === null), () =>
    setTime((prev) => prev + 1000)
  );

  const formatTime = () => {
    let seconds = Math.floor(time / 1000);
    const mins = Math.floor(seconds / 60);
    if (seconds >= 60) {
      seconds -= 60 * mins;
    }
    return `${`${mins}`.padStart(2, "0")}:${`${seconds}`.padStart(2, "0")}`;
  };

  return <div className={styles.timer}>{formatTime()}</div>;
};