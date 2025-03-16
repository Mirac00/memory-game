import { useGameStore } from '../stores/useGameStore';

export const GameStats = () => {
  const { attempts, elapsedTime, gameHistory } = useGameStore();

  return (
    <div className="game-stats">
      <p>Attempts: {attempts}</p>
      <p>Time: {elapsedTime}s</p>
      <div className="game-history">
        <h3>Game History</h3>
        {gameHistory.map((game, index) => (
          <div key={index}>
            <p>Attempts: {game.attempts}</p>
            <p>Time: {game.elapsedTime}s</p>
            <p>Date: {game.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};