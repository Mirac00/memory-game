import { useGameStore } from '../stores/useGameStore';
import { DifficultySelector } from '../components/DifficultySelector';
import { Leaderboard } from '../components/Leaderboard';

export const StartScreen = () => {
  const startGame = useGameStore((state) => state.startGame);

  return (
    <div className="start-screen">
      <h1>Memory Game</h1>
      <button onClick={startGame}>Start gry</button>
      <DifficultySelector />
      <Leaderboard />
    </div>
  );
};