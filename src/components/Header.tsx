import CircleTimer from './CircleTimer';
import SkipIcon from './SkipIcon';
import { Player } from '../types/players';
import './header.css'

interface Props {
    actualPlayer: Player | null
    skipPlayer: () => void
    start: boolean
    key: number
    time: number
    remainingPlayers: number
}

function Header({ actualPlayer, skipPlayer, start, key, time, remainingPlayers  }: Props) {
  return (
    <header className="game_header">
      <div>
        <h2>{actualPlayer?.name}</h2>
      </div>
      <div>
        <CircleTimer change={key} start={start} time={time}></CircleTimer>
      </div>

      <div className='button_players_left'>
        <button className="skip_button" onClick={skipPlayer} disabled={!start}>
          Skip
          <SkipIcon />
        </button>

        <p className='remaining_players'>
          {remainingPlayers} players left
        </p>
      </div>
    </header>
  );
}

export default Header
