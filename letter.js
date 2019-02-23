var Letter = function(value) {
    this.value = value;
    this.wasGuessed = false;
    this.currentState = function() {
      if (this.wasGuessed === true) {
        return this.value;
      }
      else {
        return "_";
      }
    }
    this.makeGuess = function(guess) {
      if (guess === this.value) {
        this.wasGuessed = true;
      }
    }
  };
  
module.exports = Letter;
  