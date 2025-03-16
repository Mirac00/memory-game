import { useGameStore } from './stores/useGameStore';
import { StartScreen } from './views/StartScreen';
import { GameBoard } from './views/GameBoard';
import './styles/global.scss';

function App() {
  const isGameStarted = useGameStore((state) => state.isGameStarted);

  return <div className="app">{isGameStarted ? <GameBoard /> : <StartScreen />}</div>;
}

export default App;