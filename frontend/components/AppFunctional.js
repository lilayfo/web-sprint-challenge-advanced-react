import React, { useState } from 'react'
import axios from "axios"

//INSERTS!!!------
const wrapperStyle = {
  fontFamily: 'Arial, sans-serif',
  textAlign: 'center',
  padding: '20px',
};
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '10px',
  maxWidth: '400px',
  margin: '0 auto',
};

const squareStyle = {
  background: '#f0f0f0',
  borderRadius: '5px',
  padding: '20px',
  textAlign: 'center',
};

const activeSquareStyle = {
  background: '#007bff',
  color: '#fff',
};
const buttonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '3px',
  cursor: 'pointer',
  margin: '5px',
};

const inputStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '3px',
  margin: '5px',
};

const submitStyle = {
  ...buttonStyle,
  backgroundColor: '#0056b3',
};
//STYLING!!!------


const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;
export default function AppFunctional(props) {
 
  function getXY(coordinate, x, y) {
    
    if (coordinate === "11"){
      move(0, x, y)
    }
    else if (coordinate === "21"){
      move(1, x, y)
    }
    else if (coordinate === "31"){
      move(2, x, y)
    }
    else if (coordinate === "12"){
      move(3, x, y)
    }
    else if (coordinate === "22"){
      move(4, x, y)
    }
    else if (coordinate === "32"){
      move(5, x, y)
    }
    else if (coordinate === "13"){
      move(6, x, y)
    }
    else if (coordinate === "23"){
      move(7, x, y)
    }
    else if (coordinate === "33"){
      move(8, x, y)
    }
  }
  function getXYMessage(direction) {
   
    if (direction === "left"){
      setGameState({
          ...gameState,
          message: "You can't go left"
      })
    }
    else if (direction === "right"){
      setGameState({
          ...gameState,
          message: "You can't go right"
      })
    }
    else if (direction === "up"){
      setGameState({
          ...gameState,
          message: "You can't go up"
      })
    }
    else if (direction === "down"){
      setGameState({
          ...gameState,
          message: "You can't go down"
      })
    }
  }
  function reset() {
  
    setGameState({
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
      xCoord: 2,
      yCoord: 2
    });
  }
  function getNextIndex(direction) {
    
    if (direction === "left" && gameState.xCoord !== 1){
      const newXCoord = gameState.xCoord - 1;
      const newYCoord = gameState.yCoord;
      getXY(("" + newXCoord + newYCoord), newXCoord, newYCoord);
    }
    else if (direction === "right" && gameState.xCoord !== 3){
      const newXCoord = gameState.xCoord + 1;
      const newYCoord = gameState.yCoord;
      getXY(("" + newXCoord + newYCoord), newXCoord, newYCoord);
    }
    else if (direction === "up" && gameState.yCoord !== 1){
      const newXCoord = gameState.xCoord;
      const newYCoord = gameState.yCoord - 1;
      getXY(("" + newXCoord + newYCoord), newXCoord, newYCoord);
    }
    else if (direction === "down" && gameState.yCoord !== 3){
      const newXCoord = gameState.xCoord;
      const newYCoord = gameState.yCoord + 1;
      getXY(("" + newXCoord + newYCoord), newXCoord, newYCoord);
    }
    else {
      getXYMessage(direction);
    }
  }
  function move(newIndex, x, y) {
    
    setGameState({
      ...gameState,
      index: newIndex,
      steps: gameState.steps + 1,
      xCoord: x,
      yCoord: y,
      message: ""
    })
  }
  function onChange(evt) {
   
    const emailInput = evt.target.value;
    setGameState({
      ...gameState,
      email: emailInput
    })
  }
  function onSubmit(evt) {

    evt.preventDefault();
    const URL = "http://localhost:9000/api/result"; 
    axios.post(URL, {"x": gameState.xCoord, "y": gameState.yCoord, "steps": gameState.steps, "email": gameState.email})
    .then(res => {
      setGameState({
        ...gameState,
        message: res.data.message,
        email: ""
      })
    })
    .catch(err => {
      setGameState({
        ...gameState,
        message: err.response.data.message
      })
    })
  }
  const [gameState, setGameState] = useState({
    message: initialMessage,
    email: initialEmail,
    index: initialIndex,
    steps: initialSteps,
    xCoord: 2,
    yCoord: 2
  })


//TEST RETURN!!!-----
return (
  <div id="wrapper" className={props.className} style={wrapperStyle}>
    <div className="info">
      <h3 id="coordinates">Coordinates ({gameState.xCoord}, {gameState.yCoord})</h3>
      <h3 id="steps">You moved {gameState.steps} {gameState.steps === 1 ? "time" : "times"}</h3>
    </div>
    <div id="grid" style={gridStyle}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
        <div
          key={idx}
          className={`square${idx === gameState.index ? ' active' : ''}`}
          style={{ ...squareStyle, ...(idx === gameState.index ? activeSquareStyle : {}) }}
        >
          {idx === gameState.index ? 'B' : null}
        </div>
      ))}
    </div>
    <div className="info">
      <h3 id="message">{gameState.message}</h3>
    </div>
    <div id="keypad">
      <button id="left" onClick={() => getNextIndex("left")} style={buttonStyle}>
        LEFT
      </button>
      <button id="up" onClick={() => getNextIndex("up")} style={buttonStyle}>
        UP
      </button>
      <button id="right" onClick={() => getNextIndex("right")} style={buttonStyle}>
        RIGHT
      </button>
      <button id="down" onClick={() => getNextIndex("down")} style={buttonStyle}>
        DOWN
      </button>
      <button id="reset" onClick={reset} style={buttonStyle}>
        Reset
      </button>
    </div>
    <form onSubmit={onSubmit}>
      <input
        id="email"
        type="email"
        placeholder="Type email"
        value={gameState.email}
        onChange={onChange}
        style={inputStyle}
      />
      <input id="submit" type="submit" value="Submit" style={submitStyle} />
    </form>
  </div>
);
}





