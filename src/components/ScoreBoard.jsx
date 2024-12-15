export default function ScoreBoard({scores}){
    
    return(
    <div className="scoreboard">
        <div className = "title">
            <h4>Scores</h4>
        </div>
        

        <div className="scores">
          <div>
            <span><b>X -</b> {scores.X}</span>
          </div>

          <div>
            <span><b>O -</b> {scores.O}</span>
          </div>
        </div>

    </div>
    )
}