import { useEffect, useState } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { Tile } from '../components/Tile';
import '../styles/GameBoard.scss';

export const GameBoard = () => {
  const {
    difficulty,
    revealedTiles,
    matchedPairs,
    attempts,
    elapsedTime,
    images,
    revealTile,
    checkMatch,
    startTimer,
    stopTimer,
    endGame,
    addGameToHistory,
    resetGame,
  } = useGameStore();

  const [isGameFinished, setIsGameFinished] = useState(false);

  useEffect(() => {
    startTimer();
    return () => {
      stopTimer();
    };
  }, [startTimer, stopTimer]);

  useEffect(() => {
    checkMatch();
  }, [revealedTiles, checkMatch]);

  useEffect(() => {
    if (matchedPairs.length === images.length && images.length > 0) {
      setIsGameFinished(true);
      stopTimer();
      addGameToHistory();
    }
  }, [matchedPairs, images, stopTimer, addGameToHistory]);

  const handleEndGame = () => {
    stopTimer();
    resetGame();
    endGame();
  };

  const gridClass = difficulty === 'easy' ? 'easy' : difficulty === 'medium' ? 'medium' : 'hard';

  return (
    <div className="game-board">
      <div className="game-info">
        <p>Czas: {elapsedTime}s</p>
        <p>Próby: {attempts}</p>
        {isGameFinished && (
          <div className="congratulations">
            <h2>Gratulacje, oto twój wynik!</h2>
          </div>
        )}
        <button onClick={handleEndGame}>Zakończ grę</button>
      </div>
      <div className={`tiles-container ${gridClass}`}>
        {images.map((image, index) => (
          <Tile
            key={index}
            index={index}
            isRevealed={revealedTiles.includes(index)}
            isMatched={matchedPairs.includes(index)}
            image={image}
            onClick={() => revealTile(index)}
          />
        ))}
      </div>
    </div>
  );
};