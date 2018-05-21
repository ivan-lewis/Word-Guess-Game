// Variables
var words = ["animality", "subzero", "fight", "raiden", "getoverhere", "netherrealm", "shangtsung", "fatality", "shaokahn", "cyrax", "sonyablade","johnnycage"];
var pickedWord = "";
var pickedWordLetters = [];
var blankNumbers = 0;
var lettersGuessed = [];
var wrongGuess = [];

// Counters
var winsCount = 0;
var lossesCount = 0;
var guessedNumber = 10;

// Game
function Game() {
  // Reset guesses
  guessedNumber = 10;

  // Randomly picks word from words array
  pickedWord = words[Math.floor(Math.random() * words.length)];

  // Get the letters from the word picked
  pickedWordLetters = pickedWord.split("");

  // Count letters
  blankNumbers = pickedWordLetters.length;

  console.log(pickedWord);

  // Resets
  lettersGuessed = [];
  wrongGuess = [];

  // Replace blank spots
  for (var i = 0; i < blankNumbers; i++) {
    lettersGuessed.push("_");
  }

  // Reset counts
  document.getElementById("guessLimit").innerHTML = guessedNumber;
  document.getElementById("blanks").innerHTML = lettersGuessed.join(" ");
  document.getElementById("wrong").innerHTML = wrongGuess.join(" ");
}

function letterCheck(letter) {

  var letterInWord = false;

  // Checks if letter is in ARRAY at all
  for (var i = 0; i < blankNumbers; i++) {
    if (pickedWord[i] === letter) {
      letterInWord = true;
    }
  }

  // Find where letters exist in word
  if (letterInWord) {
    for (var j = 0; j < blankNumbers; j++) {
      //Pupulate letters
      if (pickedWord[j] === letter) {
        lettersGuessed[j] = letter;
      }
    }

  }

  else {
    // Minus the guessed number count
    wrongGuess.push(letter);
    guessedNumber--;
  }
}

// When a game is finished - do resets
function GameEnd() {
// Log/update game stats
  console.log("WinCount: " + winsCount + " | LossCount: " + lossesCount + " | guessedNumber: " + guessedNumber);

// Updates and resets
  document.getElementById("guessLimit").innerHTML = guessedNumber;
  document.getElementById("blanks").innerHTML = lettersGuessed.join(" ");
  document.getElementById("wrong").innerHTML = wrongGuess.join(" ");

// If game is won
  if (pickedWordLetters.toString() === lettersGuessed.toString()) {
    winsCount++;
    alert("Flawless Victory!");
// Update wins count in HTML
     document.getElementById("winCount").innerHTML = winsCount;
// Restart the game
    Game();
  }

// If game is loss
  else if (guessedNumber === 0) {
    lossesCount++;
    alert("*Scorpion voice* SUUCKER!!");

// Update loss count in HTML
    document.getElementById("lossCount").innerHTML = lossesCount;
// Restart the game.
    Game();
  }

}

// Initially starts the game
Game();

// Tracks what letter is pressed
document.onkeyup = function (event) {
// Changes letters to all lower case
  var letterGuessed = String.fromCharCode(event.which).toLowerCase();
// Runs the letter pressed thru the if/else statements
  letterCheck(letterGuessed);
// Restarts the game after each match
  GameEnd();


};