import App from "./App";

import { it, expect, describe } from 'vitest';
import { fireEvent, render, waitFor } from "@testing-library/react";

import data from './data/players.json'

describe("App", () => {
  it('renders "Start Game" button', () => {
    const { getByText } = render(<App />);
    const startButton = getByText("Start Game");
    expect(startButton).toBeInTheDocument();
  });

  it('clicking "Start Game" button starts the game and show random Player', async () => {
    const { getByText } = render(<App />);
    const startButton = getByText("Start Game");
    fireEvent.click(startButton);

    await waitFor(() => {
      const playerNames = data.map((player) => player.name);
      const textContent = document.body.textContent;
      const playerNameFound = playerNames.some((name) =>
        textContent?.includes(name)
      );
      expect(playerNameFound).toBeTruthy();
    });
  });
});
