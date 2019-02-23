var Letter = require("./letter");


var Word = function (word) {
    this.wordArray = [];


    for (i = 0; i < word.length; i++) {
        var newLetter = new Letter(word[i]);
        this.wordArray.push(newLetter);
    };
    this.returnWordState = function () {
        var word = "";
        for (i = 0; i < this.wordArray.length; i++) {
            word += this.wordArray[i].currentState() + " "
        };
        return word;
    }
    this.makeGuess = function (guess) {
        for (i = 0; i < this.wordArray.length; i++) {
            this.wordArray[i].makeGuess(guess)
        }
    }
    
}

module.exports = Word;