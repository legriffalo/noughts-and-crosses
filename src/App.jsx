import Player from "./components/Player.jsx";
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from "./components/GameOver.jsx";
import { useState } from "react";

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
}}}






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
// const [ activePlayer, setActivePlayer ] = useState('X');

const [startPlayer, setStartPlayer] = useState(''); 

const currentPlayer = deriveActivePlayer(gameTurns, startPlayer);
const aWinner = winner(gameTurns,startPlayer)
const hasDraw = gameTurns.length === 9 && !aWinner

function handleSelectSquare(rowIndex,colIndex,){
// setActivePlayer((curActivePlayer)=> curActivePlayer === 'X' ? 'O':'X');
// console.log(activePlayer==='X')


setGameTurns((prevTurns)=>{

  const currentPlayer = deriveActivePlayer(prevTurns, startPlayer);
  // console.log(currentPlayer)
  // if (prevTurns.length > 0 && prevTurns[0].player ==='X'){
  //   currentPlayer='O';
  // }

  
  const updatedTurns = [
    {square: { row: rowIndex, col: colIndex }, player: currentPlayer}, ...prevTurns];
    // console.log(updatedTurns);
    // const checkWinner = winner(updatedTurns)

return updatedTurns;
})
} ;



function handleRestart(startPlayer){
  console.log(startPlayer)
  
  setStartPlayer(prevStarter => (prevStarter === 'X' || prevStarter === '') ? 'O' : 'X');
  console.log(startPlayer) 
  setGameTurns([]);
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
  </div>
  <Log turns = {gameTurns}/>

 </div>   
  )
}

export default App
