import { useState } from 'react'
import Start from './components/Start'
import Game from './components/Game'
import './App.css'

function App() {

    const [isPlaying, setIsPlaying] = useState(false);

    function startTransition() {
        setIsPlaying(true);
    }

    return (
        <div className="App">
            {!isPlaying && <Start onStart={startTransition} />}
            {isPlaying && <Game />}
        </div>
    )
}

export default App
