import "./popup.css";

interface Props {
  winlose: boolean;
  start: boolean;
  startGame: () => void;
}

function PopUpGameOver({ winlose, start, startGame }: Props) {
  return (
    <article className={`overlay_popup ${start && "close_popup"}`}>
      <div className={`pop_start_game ${start && "close_popup"}`}>
        <h1>
          {
            !winlose ? 'Game Over!' :
            `Congratulations! You Win!`
          }
        </h1>

        <div>
          {
            
          }
        </div>

        <button onClick={startGame} className="start_game_button">
          Restart the game!
        </button>
      </div>
    </article>
  );
}

export default PopUpGameOver;
