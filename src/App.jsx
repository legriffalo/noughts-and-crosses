import Player from "./components/Player.jsx";
import ScoreBoard from "./components/ScoreBoard";
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from "./components/GameOver.jsx";
import { useState } from "react";
import { useEffect } from "react";



function winner(turns, startPlayer){

  const previousPlayer = [deriveActivePlayer(turns,startPlayer )==='O'? 'X':'O'];
  console.log(previousPlayer);
  let check = turns.filter(turn => turn.player == previousPlayer );
  console.log(check);

  for (let i = 0; i<3; i++){
    // console.log(`i is curretly ${i}`)
    //filter to each player and check
    if(check.filter(turn=>turn.square.row == i).length > 2
    || check.filter(turn=>turn.square.col == i).length > 2
    || check.filter(turn=>turn.square.row == turn.square.col).length >2
    || check.filter(turn=>turn.square.row == 2-turn.square.col).length > 2
    )

    {
      console.log('win triggered')
      // console.log(`${previousPlayer} won`)
      return previousPlayer
    }
  else{
    console.log('no winners yet!')
  }}
}






function deriveActivePlayer(gameTurns, startPlayer){
  console.log(startPlayer);
  let currentPlayer = startPlayer===''? 'X':startPlayer;
  // console.log(currentPlayer);
  // let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player ==='X'){
    currentPlayer='O';}
    else if (gameTurns.length > 0 && gameTurns[0].player ==='O'){
      currentPlayer='X';
    }
    // console.log(currentPlayer);
    return currentPlayer;
}


function App() {
  const [gameTurns, setGameTurns] = useState([])
  const [startPlayer, setStartPlayer] = useState(''); 
  const currentPlayer = deriveActivePlayer(gameTurns, startPlayer);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const aWinner = winner(gameTurns,startPlayer)
  const [hasScoreBeenUpdated, setHasScoreBeenUpdated] = useState(false);

  useEffect(() => {
    if (aWinner && !hasScoreBeenUpdated) {
      setScores(prevScores => ({
        ...prevScores,
        [aWinner]: prevScores[aWinner] + 1
      }));
      setHasScoreBeenUpdated(true);

    }
  }, [aWinner]);

  const hasDraw = gameTurns.length === 9 && !aWinner


  function handleSelectSquare(rowIndex,colIndex,){
    setGameTurns((prevTurns)=>{

      const currentPlayer = deriveActivePlayer(prevTurns, startPlayer);     
      const updatedTurns = [
        {square: { row: rowIndex, col: colIndex }, player: currentPlayer}, ...prevTurns];

    return updatedTurns;
    })
  } ;



  function handleRestart(startPlayer){
    console.log(startPlayer)
    
    setStartPlayer(prevStarter => (prevStarter === 'X' || prevStarter === '') ? 'O' : 'X');
    console.log(startPlayer) 
    setGameTurns([]);
    setHasScoreBeenUpdated(false); // Reset the flag

  }


  console.log(winner(gameTurns,startPlayer))
  // const Winner = winner(gameTurns);

  return (
    <div>
     


    <div id ='game-container'>

      {/* Players list */}
      <ol id = 'players' className='highlight-player'>
      <Player initialName='player1' symbol = 'X' isActive = {currentPlayer==='X'}/>
      <Player initialName='player2' symbol = 'O' isActive = {currentPlayer==='O'}/>
      </ol> 
  {(aWinner||hasDraw)&& <GameOver winner ={aWinner} onRestart ={handleRestart} />}


  <GameBoard 
  onSelectSquare={handleSelectSquare} 
  // activePlayerSymbol = {activePlayer}
  turns = {gameTurns}
  /> 

  <ScoreBoard scores = {scores}/>

  </div>
  <Log turns = {gameTurns}/>

 </div>   
  )
}

export default App
