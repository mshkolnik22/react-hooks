import React, { useEffect, useState } from "react";

const Game = () => {

  function Square({ input, onClick }) {
    return (
      <button 
        className="squareStyle"
        onClick={onClick}>
          {input}
      </button>
    );
  }
  function Board() {
      const [eachMove, setEachMove] = useState(Array(9).fill(null));
      const [winner, setWinner] = useState('None')
      const [input, setInput] = useState('')

    const drawSq = (n) => {
      return (
        <Square 
        // we are looking for that single element of the array
          input = {eachMove[n]}
          onClick={() => handleClick(n)}
        />
      )
    }
    const handleClick = n => {
 
      if (winner !== 'None') {
        console.log(`The winner is: ${winner}`)
        return
      }
      let myTiles = [...eachMove]

      if (input === 'x') {
        myTiles[n] = 'o'
      } else {
        myTiles[n] = 'x'
      }

      setInput(myTiles[n])
      setEachMove(myTiles)
    }

    const handleReset = () => {
  
      let state = {
        eachMove: Array(9).fill(null),
      }
      let recetWinner = 'None'
      let input = 'o'

      setEachMove(state.eachMove)
      setWinner(recetWinner)
      setInput(input)
    }

    useEffect(()=> {
      let newWinner = findWinner(eachMove)

      if (newWinner === 'x') {
        setWinner('X')
      } else if (newWinner === 'o') {
        setWinner('O')
      } else if (newWinner === 'draw') {
        setWinner('DRAW')
      }
    }, [eachMove]);

    const findNextPlayer = (input) => {
      let nextPlayer
      if (input === 'o') {
        nextPlayer = 'x'
      } else {
        nextPlayer = 'o'
      }
      return nextPlayer
    }

      return (
        <div className="containerStyle gameBoard">
          <div className="instructionsStyle">Next player: {findNextPlayer(input)}</div>
          <div className="instructionsStyle">Winner: {winner} </div>
          <button className="buttonStyle" onClick={() => handleReset()}>Reset</button>
          <div className="boardStyle">
            <div className="board-row rowStyle">
              {drawSq(0)}
              {drawSq(1)}
              {drawSq(2)}
            </div>
            <div className="board-row rowStyle">
              {drawSq(3)}
              {drawSq(4)}
              {drawSq(5)}
            </div>
            <div className="board-row rowStyle">
              {drawSq(6)}
              {drawSq(7)}
              {drawSq(8)}
            </div>
          </div>
        </div>
      );
    }


  function Game() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
        </div>
      );
    }
  // ========================================
  
  function findWinner(tiles) {
    let winner
    let winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let [pos1, pos2, pos3] of winningCombos) {
      if (tiles[pos1] === tiles[pos2] && tiles[pos2] === tiles[pos3]) {
        if (tiles[pos1] === 'x') {
          winner = 'x'
        } else if (tiles[pos1] === 'o') {
          winner = 'o'
        } 
      }
    }
    if (winner !== 'x' && winner !== 'o' && !tiles.includes(null)) {
      winner = 'draw'
    }
    return winner 
  }

  return (
    <div>
      <Game />,
    </div>
  );
}

export default Game;