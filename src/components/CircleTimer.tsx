import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface Props {
  time: number;
  change: number;
  start: boolean;
}

function CircleTimer({ time, change, start }: Props) {
  return (
    <CountdownCircleTimer
      key={change}
      isPlaying={start}
      duration={time}
      colors={"#48fb47"}
      trailColor="#000"
      size={100}
      onComplete={() => {
        return { shouldRepeat: true };
      }}
    >
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  );
}

export default CircleTimer;
