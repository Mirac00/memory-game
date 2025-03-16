import '../styles/Tile.scss';
import { useGameStore } from '../stores/useGameStore';

interface TileProps {
  index: number;
  isRevealed: boolean;
  isMatched: boolean;
  image: string;
  onClick: () => void;
}

export const Tile = ({ index, isRevealed, isMatched, image, onClick }: TileProps) => {
  const matchedAnimationTiles = useGameStore((state) => state.matchedAnimationTiles);
  const shouldJump = matchedAnimationTiles.includes(index);

  return (
    <div
      className={`tile ${isRevealed || isMatched ? 'revealed' : ''} ${shouldJump ? 'jump' : ''}`}
      onClick={onClick}
    >
      <div className="front"></div>
      <div className="back">
        <img src={image} alt={`Tile ${index}`} className="tile-image" />
      </div>
    </div>
  );
};