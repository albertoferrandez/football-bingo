
import { useEffect, useState } from "react";
import { getRandomPlayer } from "./helper/random";
import { Player } from "./types/players";

import PopoUpStartGame from "./components/PopoUpStartGame";
import Header from "./components/Header";
import Board from "./components/Board";
import PopUpGameOver from "./components/PopUpGameOver";

import { gameLogos } from "./data/teams";
import { board } from "./data/board";
import { games } from "./data/games";

function App() {
  const [actualPlayer, setActualPlayer] = useState<Player | null>(null);
  const [playersAppeared, setPlayersAppeared] = useState<Player[]>([]);
  const [time, setTime] = useState<number>(10);
  const [key, setKey] = useState<number>(Date.now());
  const [start, setStart] = useState<boolean>(false);
  const [remainingPlayers, setRemainingPlayers] = useState<number>(25);
  const [correctIndex, setCorrectIndex] = useState<
    {
      rowIndex: number;
      cellIndex: number;
    }[]
  >([]);
  const [points, setPoints] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winlose, setWinLose] = useState<boolean>(false);

  const startGame = () => {
    if (!localStorage.getItem("game")) {
      localStorage.setItem("game", JSON.stringify([]));
    } else {
      setStart(true);
    }

    createBoard();
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (start && remainingPlayers === 25) {
      if (!actualPlayer) {
        const newPlayer = getRandomPlayer([]);
        setActualPlayer(newPlayer);
        setPlayersAppeared([newPlayer]);
      }

      interval = setInterval(() => {
        const newPlayer = getRandomPlayer(playersAppeared);
        setActualPlayer(newPlayer);
        setPlayersAppeared((prevPlayers) => [...prevPlayers, newPlayer]);
        setKey(Date.now());
      }, time * 1000);
    }

    if (remainingPlayers < 0) {
      clearInterval(interval!);
      endGame();
    }

    return () => clearInterval(interval);
  }, [playersAppeared, time, actualPlayer, remainingPlayers, start]);

  const skipPlayer = () => {
    setTime(10);
    const newPlayer = getRandomPlayer(playersAppeared);
    setActualPlayer(newPlayer);
    setPlayersAppeared((prevPlayers) => [...prevPlayers, newPlayer]);
    setRemainingPlayers((prevRemainingPlayers) => prevRemainingPlayers - 1);
    setKey(Date.now());
  };

  const createBoard = () => {
    const randomLogos: string[][] = [];
    const usedIndexes = new Set();

    while (randomLogos.length < 16) {
      const randomIndex = Math.floor(Math.random() * gameLogos.length);
      if (!usedIndexes.has(randomIndex)) {
        randomLogos.push(gameLogos[randomIndex]);
        usedIndexes.add(randomIndex);
      }
    }

    let index = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = randomLogos[index];
        index++;
      }
    }
  };

  const selectResponse = (
    logo: string,
    rowIndex: number,
    cellIndex: number
  ) => {

      if (
        correctIndex.some(
          (index) =>
            index.rowIndex === rowIndex && index.cellIndex === cellIndex
        )
      )
        return;

    if (actualPlayer?.teams.includes(logo)) {
      setRemainingPlayers((prevRemainingPlayers) => prevRemainingPlayers - 1);
      setCorrectIndex([...correctIndex, { rowIndex, cellIndex }]);
      games.corrects++;
      skipPlayer();
    } else {
      games.wrongs++;
      if (points !== 0) {
        setPoints((prevPoints) => prevPoints - 1);
      }
      setRemainingPlayers((prevRemainingPlayers) => prevRemainingPlayers - 1);
      skipPlayer();
    }
  };

  const endGame = () => {
    const allGames = JSON.parse(localStorage.getItem("game") || "[]");

    if (points < 16 || playersAppeared.length === 25) {
      setWinLose(false);
      allGames.forEach((game: { lost: number }) => {
        game.lost++;
      });

    } else {
      setWinLose(true);
      allGames.forEach((game: { wins: number }) => {
        game.wins++;
      });
    }

    const updatedGames = {
      ...games,
      date: new Date().toLocaleString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    const newGameArray = JSON.parse(localStorage.getItem("game")!);
    newGameArray.push(updatedGames);
    localStorage.setItem("game", JSON.stringify(newGameArray));

    setGameOver(true);
    resetGame();
  };

  const resetGame = () => {
    setActualPlayer(null);
    setPlayersAppeared([]);
    setTime(10);
    setKey(Date.now());
    setStart(false);
    setRemainingPlayers(25);
    setCorrectIndex([]);
    setPoints(0);
  };

  return (
    <>
      {!start && <PopoUpStartGame startGame={startGame} start={start} />}

      <Header
        remainingPlayers={remainingPlayers}
        actualPlayer={actualPlayer}
        skipPlayer={skipPlayer}
        key={key}
        start={start}
        time={time}
      />

      <Board
        board={board}
        correctIndex={correctIndex}
        start={start}
        selectResponse={selectResponse}
      />

      {
        gameOver && <PopUpGameOver winlose={winlose} start={start} startGame={startGame} />
      }
    </>
  );
}

export default App;
