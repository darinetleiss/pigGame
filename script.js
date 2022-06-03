'use strict';

//selecting elements
const score0El = document.querySelector('#score--0');
//or use const score1=document.getElementId('score--1');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const swicthPlayer = function () {
  //turnery operation
  //if the activePlay is 0  then we want the ActivrPlayer to be 1
  // else we want it to be 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  //toggle: will add the class if it is no there and if it is their
  // it will be removed
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//starting conditions
//cannot be set inside the function because it will be reset
//each time the roll btn is clicked
//to stop the game when one of the players win
//to disable the buttons
let scores, currentScore, activePlayer, playing;
const initialization = function () {
    scores = [0, 0];
   currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

initialization();

//reacting to roll btn
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generate a random dice roll
    //dice in not a  global variable :outside the fucntion
    //because we want on every click to generate new dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2-display the dice
    diceEl.classList.remove('hidden');
    //src is used to change the image each time the roll is clicked
    diceEl.src = `dice-${dice}.png`;
    //3-chechk for rolled 1:
    if (dice != 1) {
      // add dice to the current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    // if true ,switch to next player
    else {
      swicthPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add current score to the score of the active's play score
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1]+currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.chechk if the player's score is >=100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //swicth to the next player
      swicthPlayer();
    }
  }
});

btnNew.addEventListener('click', initialization);
