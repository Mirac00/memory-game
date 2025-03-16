import { useGameStore } from '../stores/useGameStore';
import '../styles/DifficultySelector.scss';

export const DifficultySelector = () => {
  const difficulty = useGameStore((state) => state.difficulty);
  const setDifficulty = useGameStore((state) => state.setDifficulty);

  return (
    <div className="difficulty-selector">
      <button
        className={difficulty === 'easy' ? 'active' : ''}
        onClick={() => setDifficulty(difficulty === 'easy' ? null : 'easy')}
      >
        Łatwy
      </button>
      <button
        className={difficulty === 'medium' ? 'active' : ''}
        onClick={() => setDifficulty(difficulty === 'medium' ? null : 'medium')}
      >
        Średni
      </button>
      <button
        className={difficulty === 'hard' ? 'active' : ''}
        onClick={() => setDifficulty(difficulty === 'hard' ? null : 'hard')}
      >
        Trudny
      </button>
    </div>
  );
};