

/* The theme of my hangman will be...America The Beautiful */

var hangman = {
  hint: "",
  currentAnswer: "",
  wins: 0,
  guessesLeft: 10,
  lettersUsed: "",
  answerDiv: "",
  targetArray: [],
  victoryCounter: 0,
  answerArray: ["MOUNT RUSHMORE", "NIAGARA FALLS", "WASHINGTON MONUMENT", "GATEWAY ARCH", "CARLSBAD CAVERNS", "BROOKLYN BRIDGE"],
  hintArray: ["Chiselled into the Black Hills...", "Cascading on the border...","The obelisk...", "The gateway to the west...", "The Hall of the Giants lies within...", "Above the East River..."],
  generateAnswerAndHint: function() {
    var randomNumber = Math.floor(Math.random() * 6);
    this.hint = this.hintArray[randomNumber];
    hangman.currentAnswer = this.answerArray[randomNumber];
  },
  genTargetArray: function() {
    this.targetArray = this.currentAnswer.split("");
  },
  generateAnswerDiv: function() {
    for (var i = 0; i < this.targetArray.length; i++) {
      this.answerDiv += "<p class='target-letters'>" + this.targetArray[i] + "</p>";
    }
  }
};

// Prepares the data for the html to be generated on page load.
hangman.generateAnswerAndHint();

//  This generates the targetArray, which holds the Array with the answer in it.
hangman.genTargetArray();

// This generates the HTML for the page, based on the data geberate by the prior two functions.
hangman.generateAnswerDiv();

// Generates the initial HTML
var html =
        "<h4>Hint: " + hangman.hint + "</h4>" +
        "<p>Wins: " + hangman.wins + "</p>" +
        "<p>Guesses Left: " + hangman.guessesLeft + "</p>" +
        "<p>Letters Used: " + hangman.lettersUsed + "</p>" +
        hangman.answerDiv;

document.querySelector("#game").innerHTML = html;

function updateHTML() {
  var html =
  "<h4>Hint: " + hangman.hint + "</h4>" +
  "<p>Wins: " + hangman.wins + "</p>" +
  "<p>Guesses Left: " + hangman.guessesLeft + "</p>" +
  "<p>Letters Used: " + hangman.lettersUsed + "</p>" +
  hangman.answerDiv;

  document.querySelector("#game").innerHTML = html;
}

var userGuess;
// Captures Key Clicks
document.onkeyup = function(event) {
  // Sets a counter, if counter is 0, that means the user's guess did not match
  var counter = 0;
  // Determines which exact key was selected. Make it lowercase
  userGuess = String.fromCharCode(event.keyCode).toUpperCase();

  for (var i = 0; i < hangman.targetArray.length;  i++) {
    if (userGuess === hangman.targetArray[i]) {
      console.log(hangman.targetArray[i] + "you matched");
      //currentAnswer[i].setAttribute("class", "visible");
      // Adds one to the counter, meaning the user's guess was correct (so the loss if statement below doesn't trigger)
      hangman.victoryCounter++;
      console.log(hangman.victoryCounter);
      counter++;
      if (hangman.victoryCounter === (hangman.targetArray.length -1)) {
        hangman.wins++;
        updateHTML();
      }
    }
  }
  if (counter === 0) {
    hangman.guessesLeft--;
    updateHTML();
  }
  counter = 0;
  hangman.lettersUsed += userGuess;
  updateHTML();
};
