import { useEffect } from "react";
import { useState } from "react";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomColorOptions(correctColor) {
  const colorOptions = [correctColor];
  while (colorOptions.length < 6) {
    const newColor = getRandomColor();
    if (colorOptions.includes(newColor)) return;
    colorOptions.push(newColor);
  }
  return colorOptions;
}

function App() {
  const [mainColor, setMainColor] = useState(getRandomColor());
  const [colorOptions, setColorOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");

  useEffect(() => {
    setColorOptions(getRandomColorOptions(mainColor));
  }, [mainColor]);

  function handleColorGuess(guessColor) {
    if (guessColor === mainColor) {
      setGameStatus("correct");
      setScore((prev) => prev + 1);
    } else {
      setGameStatus("wrong");
    }
  }

  function startNewGame() {
    setMainColor(getRandomColor());
    setGameStatus("playing");
  }
  return (
    <div className="container">
      <div className="header">
        <h1>Can You Guess the Color 😀</h1>
        <p data-testid="gameInstructions">
          Pick from the options which is the correct color
        </p>
      </div>
      <div className="stats">
        <p data-testid="score">Score: {score}</p>
        <button data-testid="newGameButton" onClick={() => startNewGame()}>
          New Game
        </button>
      </div>
      <div className="main-game">
        <div
          className="target-color"
          data-testid="colorBox"
          style={{ backgroundColor: mainColor }}
        ></div>

        {gameStatus !== "playing" && (
          <div
            data-testid="gameStatus"
            className={` answer ${
              gameStatus === "correct" ? "right-answer" : "wrong-answer"
            }`}
          >
            {gameStatus === "correct"
              ? "Correct! Well done! 🎉"
              : "Wrong guess! Try again! 🥲"}
          </div>
        )}
        <div className="color-options">
          {colorOptions.map((color, index) => (
            <div key={index}>
              <span>({index + 1})</span>
              <button
                data-testid="colorOption"
                className="color-option"
                key={index}
                onClick={() => handleColorGuess(color)}
                style={{ backgroundColor: color }}
                disabled={gameStatus !== "playing"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
