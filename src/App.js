// CSS
import './App.css';

//React
import {useCallBack, useEffect, useState} from "react";

//Data
import { wordsList } from './data/words';

//Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},

]

function App() {

  const [gameStage,setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const[guessedLetters, setGuessedLetters] = useState([]);
  const[wrongLetters, setWrongLetters] = useState([]);
  const[guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {
    //pick a random category
    const categories = Object.keys(words)
    const category = 
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //pick a random word in category
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return {category,word}
  }

  const startGame = () => {
    //Pick word and pick category
    const {word, category} = pickWordAndCategory();

    //Create an array of letter
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    console.log(word, category);
    console.log(wordLetters);

    //fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name)
  }

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    //check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    //push guessed letter or remove a guess
    if(letter.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    }else {
      setWrongLetters((actualWrongLetter) => [
        ...actualWrongLetter,
        normalizedLetter
      ])
    }

    console.log(guessedLetters);
    console.log(wrongLetters);
  };

  //restarts the game
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && (<Game
       verifyLetter={verifyLetter}
       pickedWord={pickedWord}
       pickedCategory={pickedCategory}
       letters={letters}
       guessedLetters={guessedLetters}
       wrongLetters={wrongLetters}
       guesses={guesses}
       score={score}
       />)
       }
      {gameStage === "end" && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
