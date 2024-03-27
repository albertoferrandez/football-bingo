import './popup.css'

interface Props {
    startGame: () => void
    start: boolean
}

function PopoUpStartGame({ startGame, start }: Props) {
  return (
    <article className={`overlay_popup ${start && "close_popup"}`}>
      <div className={`pop_start_game ${start && "close_popup"}`}>
        <h1>BINGOAL!</h1>
        <button onClick={startGame} className="start_game_button">
          Start Game
        </button>
      </div>
    </article>
  );
}

export default PopoUpStartGame
