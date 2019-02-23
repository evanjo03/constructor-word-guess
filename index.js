//setting up our variables and our wordlist
var inquirer = require("inquirer");
var Word = require("./word");

var wordArray = ["test", "envelope", "intricacy", "benevolent", "jazz", "optimization", "pneumonic"];
var wrongGuessArray = [];
var guessesMade = [];
var guessesLeft = 10;

//start game function
function startGame() {

    //pick a word
    var wordArrayIndex = Math.floor(Math.random() * wordArray.length)
    var myWord = wordArray[wordArrayIndex];
    var myWordObject = new Word(myWord);


    //begin guessing with selected word
    makeAGuess(myWordObject);
}

function makeAGuess(wordObject) {
    //if the user has guesses left
    if (guessesLeft > 0) {

        //set up string of word for testing if entire word is guessed
        var trueWordString = "";
        for (i = 0; i < wordObject.wordArray.length; i++) {
            trueWordString += wordObject.wordArray[i].value + " ";
        };

        //win condition test - if the word state isn't equal to the word itself
        if (trueWordString !== wordObject.returnWordState()) {

            //show the user the number of spaces
            console.log("\n" + wordObject.returnWordState() + "\n");

            //ask the user for their first guess
            inquirer
                .prompt([
                    {
                        name: "guess",
                        message: "What is your guess?"
                    }
                ]).then(function (result) {
                    //display the guess
                    console.log("*********************************************")
                    console.log("Your guess: " + result.guess)

                    //making our guess with our word object
                    var preState = wordObject.returnWordState();
                    wordObject.makeGuess(result.guess);
                    var postState = wordObject.returnWordState();

                    //if the guess was incorrect
                    if (preState === postState) {
                        //and if the guess hasn't already been made
                        if (guessesMade.indexOf(result.guess) == -1) {

                            //add the guessed letter to the incorrect guess array
                            wrongGuessArray.push(result.guess);

                            //subtract guesses left from 10 to start
                            guessesLeft--;
                        }
                    }
                    //add the guessed letter to our array
                    if (guessesMade.indexOf(result.guess) == -1) {
                        guessesMade.push(result.guess);
                    }

                    //display the number of guesses remaining
                    console.log("You have " + guessesLeft + " guesses left!")

                    //creating our incorrect guess list
                    var wrongGuessString = wrongGuessArray.join(", ");

                    //display incorrect guess list to user
                    console.log("Your incorrect guesses: " + wrongGuessString);

                    console.log("*********************************************")

                    //make the next guess
                    makeAGuess(wordObject);
                });
        }
        else { //this runs when the word state equals the word itself
            console.log("\n*********************************************" + "\n###################YOU WIN!##################" + "\n*********************************************\n");
            var trueWordString = "";
            for (i = 0; i < wordObject.wordArray.length; i++) {
                trueWordString += wordObject.wordArray[i].value;
            };
    
            console.log("The word was " + trueWordString + ".\n")
            endGame();

        }
    } else if (guessesLeft === 0) { //this runs when the player makes 10 incorrect guesses
        console.log("\n*********************************************" + "\n###################YOU LOSE!#################" + "\n*********************************************\n");
        var trueWordString = "";
        for (i = 0; i < wordObject.wordArray.length; i++) {
            trueWordString += wordObject.wordArray[i].value;
        };

        console.log("The word was " + trueWordString + ".\n")
        endGame();
    }
}

//this function resets variables and takes user back to the start
function endGame() {
    inquirer
        .prompt([
            {
                name: "replay",
                message: "Do you want to play again? (y/n)"
            }
        ]).then(function (result) {
            if (result.replay === "y") {
                wrongGuessArray = [];
                guessesMade = [];
                guessesLeft = 10;
                startGame();
            }

            else if (result.replay === "n") {
                //end the node application
                process.exit();
            }
        });
}

//run that game!!!!!!
startGame();