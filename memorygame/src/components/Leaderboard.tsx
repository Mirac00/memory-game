import { useGameStore } from '../stores/useGameStore';
import '../styles/Leaderboard.scss';

export const Leaderboard = () => {
    const gameHistory = useGameStore((state) => state.gameHistory);
    const difficulty = useGameStore((state) => state.difficulty);
  
    const getFilteredHistory = () => {
      if (!difficulty) return []; 
      return gameHistory
        .filter((game) => game.difficulty === difficulty) 
        .sort((a, b) => a.elapsedTime - b.elapsedTime) 
        .slice(0, 10); 
    };
  
    return (
      <div className="leaderboard">
        <h3>Najlepsze wyniki</h3>
        {difficulty ? (
          <ol>
            {getFilteredHistory().map((game, index) => (
              <li key={index}>
                <p>Czas: {game.elapsedTime}s</p>
                <p>Próby: {game.attempts}</p>
                <p>Data: {game.date}</p>
              </li>
            ))}
          </ol>
        ) : (
          <p>Spróbuj zapamiętać! Wybierz poziom trudności.</p>
        )}
      </div>
    );
  };