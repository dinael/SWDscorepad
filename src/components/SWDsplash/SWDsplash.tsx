import { useGameContext } from '../../providers/GameContext';

function Configuration() {
  const {
    player1,
    setPlayer1,
    player2,
    setPlayer2,
    handleConfigChange,
    startGame,
  } = useGameContext();

  return (
    <div>
      <h2>Configuración del juego</h2>
      <input
        type="text"
        placeholder="Nombre del jugador 1"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nombre del jugador 2"
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
      />
      <button onClick={() => handleConfigChange('agora')}>Agora</button>
      <button onClick={() => handleConfigChange('pantheon')}>Pantheon</button>
      <button onClick={() => handleConfigChange('solo')}>Solo</button>
      <button onClick={startGame}>Comenzar</button>
    </div>
  );
}

export default Configuration;
