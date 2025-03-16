import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import image1 from '../images/1 (1).png';
import image2 from '../images/1 (2).png';
import image3 from '../images/1 (3).png';
import image4 from '../images/1 (4).png';
import image5 from '../images/1 (5).png';
import image6 from '../images/1 (6).png';
import image7 from '../images/1 (7).png';
import image8 from '../images/1 (8).png';
import image9 from '../images/1 (9).png';
import image10 from '../images/1 (10).png';
import image11 from '../images/1 (11).png';
import image12 from '../images/1 (12).png';
import image13 from '../images/1 (13).png';
import image14 from '../images/1 (14).png';
import image15 from '../images/1 (15).png';
import image16 from '../images/1 (16).png';

const images = [
  image1, image2, image3, image4, image5, image6, image7, image8,
  image9, image10, image11, image12, image13, image14, image15, image16,
];

const generateImagePairs = (pairs: number): string[] => {
  const selectedImages = images.slice(0, pairs);
  return [...selectedImages, ...selectedImages].sort(() => Math.random() - 0.5); 
};

interface GameState {
  difficulty: 'easy' | 'medium' | 'hard' | null;
  attempts: number;
  elapsedTime: number;
  revealedTiles: number[];
  matchedPairs: number[];
  gameHistory: Array<{
    attempts: number;
    elapsedTime: number;
    date: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }>;
  isGameStarted: boolean;
  images: string[];
  matchedAnimationTiles: number[];
  timerInterval: number | null;
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard' | null) => void;
  startGame: () => void;
  endGame: () => void;
  incrementAttempts: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  resetGame: () => void;
  revealTile: (index: number) => void;
  checkMatch: () => void;
  addGameToHistory: () => void;
  triggerMatchedAnimation: (tiles: number[]) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      difficulty: null,
      attempts: 0,
      elapsedTime: 0,
      revealedTiles: [],
      matchedPairs: [],
      gameHistory: [],
      isGameStarted: false,
      images: [],
      matchedAnimationTiles: [],
      timerInterval: null,
      setDifficulty: (difficulty) => {
        const pairs = difficulty === 'easy' ? 6 : difficulty === 'medium' ? 8 : difficulty === 'hard' ? 16 : 0;
        set({ difficulty, images: difficulty ? generateImagePairs(pairs) : [] });
      },
      startGame: () => {
        const { difficulty } = get();
        if (!difficulty) return;
        const pairs = difficulty === 'easy' ? 6 : difficulty === 'medium' ? 8 : 16;
        set({
          isGameStarted: true,
          attempts: 0,
          elapsedTime: 0,
          revealedTiles: [],
          matchedPairs: [],
          images: generateImagePairs(pairs),
          matchedAnimationTiles: [],
          timerInterval: null,
        });
      },
      endGame: () => set({ isGameStarted: false }),
      incrementAttempts: () => set((state) => ({ attempts: state.attempts + 1 })),
      startTimer: () => {
        const interval = setInterval(() => {
          set((state) => ({ elapsedTime: state.elapsedTime + 1 }));
        }, 1000);
        set({ timerInterval: interval });
      },
      stopTimer: () => {
        const { timerInterval } = get();
        if (timerInterval) {
          clearInterval(timerInterval);
          set({ timerInterval: null });
        }
      },
      resetGame: () => set({ attempts: 0, elapsedTime: 0, revealedTiles: [], matchedPairs: [], matchedAnimationTiles: [], timerInterval: null }),
      revealTile: (index) => {
        const { revealedTiles, matchedPairs } = get();
        if (matchedPairs.includes(index)) return;
        if (revealedTiles.length === 2 && !revealedTiles.includes(index)) return;
        set((state) => ({ revealedTiles: [...state.revealedTiles, index] }));
      },
      checkMatch: () => {
        const { revealedTiles, matchedPairs, images, incrementAttempts } = get();
        if (revealedTiles.length === 2) {
          incrementAttempts();
          const [first, second] = revealedTiles;
          if (images[first] === images[second]) {
            setTimeout(() => {
              set((state) => ({
                matchedPairs: [...state.matchedPairs, first, second],
                revealedTiles: [],
              }));
              get().triggerMatchedAnimation([first, second]);
            }, 600);
          } else {
            setTimeout(() => set({ revealedTiles: [] }), 1000);
          }
        }
      },
      addGameToHistory: () => {
        const { attempts, elapsedTime, gameHistory, difficulty } = get();
        if (!difficulty) return;
        const newGame = { attempts, elapsedTime, date: new Date().toLocaleString(), difficulty };
        set({ gameHistory: [...gameHistory, newGame] });
      },
      triggerMatchedAnimation: (tiles) => {
        set({ matchedAnimationTiles: tiles });
        setTimeout(() => set({ matchedAnimationTiles: [] }), 500);
      },
    }),
    {
      name: 'memory-game-storage',
    }
  )
);