import './App.css';
import {useState, useEffect, useRef} from 'react'
import {getNextGeneration} from "./game-logic";
import {testGame} from "./test-game";


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


function GameBoard({gameState}) {
    const {world} = gameState;
    const cellStyle = {width: '10px', height: '10px', color: 'blue', border: 'solid'}
    return <div>
        {
            world.map(row => {
                return (<div style={{display: 'flex'}}>
                    {row.map(column => {
                        return <div style={{...cellStyle, backgroundColor: column? 'blue': 'white'}}/>
                    })}
                </div>)
            })
        }
    </div>
}

function App() {
    const [delay, setDelay] = useState(30000);
    const [gameState, setGameState] = useState(testGame)

    useInterval(() => {
        console.log('evaluating next state')
        const newGameState = getNextGeneration(gameState)
        setGameState({
            ...gameState,
            world: newGameState
        })
    }, delay);

    function handleDelayChange(e) {
        setDelay(Number(e.target.value));
    }

    return (
        <div className="App">
            <GameBoard gameState={gameState}/>
            Speed: <input value={delay} onChange={event => setDelay(event.target.value)}/>
        </div>
    );
}

export default App;
