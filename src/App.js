import React, { useEffect } from "react";

import Die from "./components/Die";

import { nanoid } from "nanoid";
import Confetti from "react-confetti";

import "./App.css";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  useEffect(() => {
    const allHeld = dice.every(
      (item) => item.isHeld && dice[0].value === item.value
    );

    if (allHeld) {
      setTenzies(true);
    }
  }, [dice]);

  function generatenewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function allNewDice() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push(generatenewDie());
    }

    return newDice;
  }

  function rollDice() {
    setDice((prevState) =>
      prevState.map((item) => (item.isHeld ? item : generatenewDie()))
    );
  }

  function holdDice(id) {
    setDice((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, isHeld: !item.isHeld } : { ...item }
      )
    );
  }

  function newGame() {
    setDice(allNewDice);
    setTenzies(false);
  }
  const diceElments = dice.map((item) => (
    <Die
      isHeld={item.isHeld}
      key={item.id}
      value={item.value}
      holdDice={() => holdDice(item.id)}
    />
  ));

  return (
    <main className="main">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="container">{diceElments}</div>
      <button onClick={tenzies ? newGame : rollDice} className="roll-btn">
        {tenzies ? "New Game" : "Roll"}
      </button>
      {tenzies && <Confetti />}
    </main>
  );
}
