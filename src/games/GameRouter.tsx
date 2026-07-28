import type { GameDefinition } from '../types';
import TrafficLightGame from './TrafficLightGame';
import CrossRoadGame from './CrossRoadGame';
import SignMatchGame from './SignMatchGame';
import FindDangerGame from './FindDangerGame';
import EscapeMazeGame from './EscapeMazeGame';
import EmergencyCallGame from './EmergencyCallGame';
import ScamFinderGame from './ScamFinderGame';
import PasswordBuilderGame from './PasswordBuilderGame';
import ProtectInfoGame from './ProtectInfoGame';
import SortWasteGame from './SortWasteGame';
import SortingRaceGame from './SortingRaceGame';
import CleanParkGame from './CleanParkGame';

// Har bir o'yin identifikatoriga (id) mos komponentni bog'laydi
const gameComponents: Record<string, (props: { config: GameDefinition }) => JSX.Element> = {
  'traffic-light': TrafficLightGame,
  'cross-road': CrossRoadGame,
  'sign-match': SignMatchGame,
  'find-danger': FindDangerGame,
  'escape-maze': EscapeMazeGame,
  'emergency-call': EmergencyCallGame,
  'scam-finder': ScamFinderGame,
  'password-builder': PasswordBuilderGame,
  'protect-info': ProtectInfoGame,
  'sort-waste': SortWasteGame,
  'sorting-race': SortingRaceGame,
  'clean-park': CleanParkGame,
};

export default function GameRouter({ config }: { config: GameDefinition }) {
  const GameComponent = gameComponents[config.id];
  if (!GameComponent) return null;
  return <GameComponent config={config} />;
}
