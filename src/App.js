import './App.css';
import {useState, useEffect, useRef, useLayoutEffect} from 'react'
import {getNextGeneration} from "./game-logic";
import {testGame} from "./test-game";


//Shamelessly stolen from https://usehooks-ts.com/react-hook/use-interval
function useInterval(callback, delay) {
    const savedCallback = useRef(callback)

    // Remember the latest callback if it changes.
    useLayoutEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        // Don't schedule if no delay is specified.
        // Note: 0 is a valid value for delay.
        if (!delay && delay !== 0) {
            return
        }

        const id = setInterval(() => savedCallback.current(), delay)

        return () => clearInterval(id)
    }, [delay])
}


function GameBoard({gameState}) {
    const {world} = gameState;
    return <div>
        {
            world.map((row, rowIndex) => {
                return (<div className={'gameBoardRow'} key={rowIndex}>
                    {row.map((column, columnIndex) => {
                        return <div className={'gameBoardCell'} key={`${rowIndex}${columnIndex}`}>
                            {!!column && <img className={'gameBoardCell'} src="/gain-logo.png" alt="image" />}
                        </div>
                    })}
                </div>)
            })
        }
    </div>
}


function App() {
    const [delay, setDelay] = useState(1000);
    const [gameState, setGameState] = useState({...testGame})
    const [isPlaying, setPlaying] = useState(false)
    const [generationCount, setGenerationCount] = useState(0);
    const [runningGenerations, setRunningGenerations] = useState([testGame.world])

    useInterval(() => {
        console.log('evaluating next state')
        const newGameState = getNextGeneration({...gameState})
        setRunningGenerations(prevState => [...prevState, newGameState])
        setGenerationCount(generationCount => generationCount + 1)
        setGameState({
            ...gameState,
            world: newGameState
        })
    }, isPlaying ? delay : null,);

    function handleDelayChange(e) {
        setDelay(Number(e.target.value));
    }

    return (
        <div className="App">
            <div style={{display: 'flex'}}>
                <button onClick={()=>{
                    fetch('https://game-of-life-service-ai3nmiz7aa-uc.a.run.app/world/CRU1VCfQ', {mode: 'no-cors'})
                        .then(data => console.log(data))
                }}>New Game</button>
                <div style={{color: 'blue', fontSize: 'x-large'}}>Gen Count: {runningGenerations.length}</div>
            </div>
            <GameBoard className={'gameBoard'} gameState={gameState}/>
            Speed: <input value={delay} onChange={handleDelayChange}/>
            <div style={{display: 'flex'}}>
                <button onClick={()=>{
                    const newGameState = getNextGeneration(gameState);
                    console.table(newGameState)
                    setGenerationCount(generationCount => generationCount + 1)
                    setRunningGenerations([...runningGenerations, newGameState])

                    setGameState({
                        ...gameState,
                        world: newGameState
                    })
                }}>Next Generation</button>
                <button onClick={() => setPlaying(!isPlaying)}>
                    {isPlaying ? 'pause' : 'play'}
            </button>
                <button onClick={()=>console.log(runningGenerations)}>Print Gens</button>
            </div>
        </div>
    );
}

export default App;
