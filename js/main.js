

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
  answerArray: ["MOUNT-RUSHMORE", "NIAGARA-FALLS", "WASHINGTON-MONUMENT", "GATEWAY-ARCH", "CARLSBAD-CAVERNS", "BROOKLYN-BRIDGE", "CLOUD-GATE", "THE-ALAMO", "KAUFMANN-RESIDENCE"],
  hintArray: ["Chiselled into the Black Hills...", "Cascading on the border...","The obelisk...", "The gateway to the west...", "The Hall of the Giants lies within...", "Above the East River...", "A reflective bean...", "Remember this...", "Falling water..."],
  generateAnswerAndHint: function() {
    var randomNumber = Math.floor(Math.random() * 9);
    this.hint = this.hintArray[randomNumber];
    hangman.currentAnswer = this.answerArray[randomNumber];
  },
  genTargetArray: function() {
    this.targetArray = this.currentAnswer.split("");
  },
  generateAnswerDiv: function() {
    for (var i = 0; i < this.targetArray.length; i++) {
      if (this.targetArray[i] === "-") {
        console.log(hangman.targetArray);
        this.answerDiv += "<p class='target-letters'>" + "-" + "</p>";
      }
      else {
        this.answerDiv += "<p class='target-letters'>" + "_" + "</p>";
      }
    }
  },
  resetHangman: function () {
    this.victoryCounter = 0;
    this.lettersUsed = "";
    this.answerDiv = "";
    this.guessesLeft = 10;
    // The first line below prepares the data for the answer and hint.  The second line generates the target Array, which holds the answer within, and the third line gets the data from the first and second line and sends it down to the HTML.
    this.generateAnswerAndHint();
    this.genTargetArray();
    this.generateAnswerDiv();
    // Generates the initial HTML
    hangman.updateHTML();
    var html2 = this.answerDiv;
    document.querySelector("#gameAnswerField").innerHTML = html2;
  },
  updateHTML: function() {
    var html =
    "<h4>Hint: " + hangman.hint + "</h4>" +
    "<p>Wins: " + hangman.wins + "</p>" +
    "<p>Number of Guesses Remaining: " + hangman.guessesLeft + "</p>" +
    "<p>Letters Already Guessed: " + hangman.lettersUsed + "</p>";
    document.querySelector("#game").innerHTML = html;
  }
};

// The first line below prepares the data for the answer and hint.  The second line generates the target array, which holds the answer within, and the third line creates the answer div, with the underscores.
hangman.generateAnswerAndHint();
hangman.genTargetArray();
hangman.generateAnswerDiv();

// Generates the initial HTML for the lines before the answerDiv.
hangman.updateHTML();

var html2 = hangman.answerDiv;

document.querySelector("#gameAnswerField").innerHTML = html2;

hangman.updateHTML();

// These sounds are from soundbible.com, the sad trombone is http://soundbible.com/1830-Sad-Trombone.html and the happy kid is http://soundbible.com/2103-1-Person-Cheering.html.  I'm not sure how to give appropriate credit under Attribution 3.0, so I left this note and kept the file names unchanged.
var happyKidAudio = new Audio("sound/1_person_cheering-Jett_Rifkin-1851518140.mp3");
var sadTromboneAudio = new Audio("sound/Sad_Trombone-Joe_Lamb-665429450.mp3");
var userGuess;
// Captures Key Clicks
document.onkeyup = function(event) {
  // Sets a counter, if counter is 0, that means the user's guess did not match
  var counter = 0;
  // Determines which exact key was selected. Make it lowercase
  userGuess = String.fromCharCode(event.keyCode).toUpperCase();
  var par = document.getElementsByClassName("target-letters");

  // The line below, was added to prevent a user entering letters previously entered, and inflating the victory point count (or subtracting from the number of guesses remaining)
  if (hangman.lettersUsed.indexOf(userGuess) < 0) {
    for (var i = 0; i < hangman.targetArray.length;  i++) {
      if (userGuess === hangman.targetArray[i]) {
        console.log(hangman.targetArray[i] + "you matched");
        hangman.victoryCounter++;
        console.log(hangman.victoryCounter);
        counter++;
        hangman.lettersUsed += userGuess;
        par[i].innerHTML = userGuess;
        if (hangman.victoryCounter === (hangman.targetArray.length - 1)) {
          hangman.wins++;
          happyKidAudio.play();
          alert("Your score is " + hangman.wins +". Keep going!");
          hangman.resetHangman();
        }
      }
    }
    if (counter === 0) {
      hangman.guessesLeft = hangman.guessesLeft - 1;
      hangman.lettersUsed += userGuess;
      hangman.updateHTML();
    }
    counter = 0;

    hangman.updateHTML();
    if (hangman.guessesLeft === 0) {
      sadTromboneAudio.play();
      alert("Sorry, you've lost, try again!");
      hangman.resetHangman();
    }
  }
};
