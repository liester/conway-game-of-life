import './App.css';
import {useState, useEffect, useRef} from 'react'

//Shamelessly stolen
function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
const initialGameState = {
    "id": "abc123",
    "generationCount": 5,
    "size": 5,
    "world": [[1,0,0,0,1],
        [1,0,0,1,1],
        [1,0,1,0,0],
        [1,1,0,1,1],
        [1,0,1,0,0]]
}

function GameBoard({gameState}) {
    const {world} = gameState;
    const cellStyle = {width: '30px', height: '30px', color: 'blue', border: 'solid'}
    return <div>
        {
            world.map(row => {
                return (<div style={{display: 'flex'}}>
                    {row.map(column => {
                        return <div style={cellStyle}>{column}</div>
                    })}
                </div>)
            })
        }
    </div>
}

function App() {
    const [delay, setDelay] = useState(1000);

    useInterval(() => {
        console.log('evaluating next state')
        const newGameState = {...initialGameState}
        setGameState(newGameState)
    }, delay);

    function handleDelayChange(e) {
        setDelay(Number(e.target.value));
    }
  const [gameState, setGameState] = useState(initialGameState)
  return (
    <div className="App">
      <GameBoard gameState={gameState}/>
    </div>
  );
}

export default App;
