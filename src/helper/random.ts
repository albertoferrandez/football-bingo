import { Player } from "../types/players";
import data from "../data/players.json";

export const getRandomPlayer = (playersAppeared: Player[]): Player => {
  
  const randomIndex = Math.floor(Math.random() * data.length);
  const newPlayer = data[randomIndex];
  
  if (!playersAppeared.some((player) => player.name === newPlayer.name)) {
    return newPlayer;
  } else {
    return getRandomPlayer(playersAppeared);
  }
};