exports.simon = {
  pattern: [],
  currentStep:  0,

  /**
   * Randomly generated a number between 0 and 3, inclusive.
   * @returns {number} Randomly generated a number between 0 and 3, inclusive.
   */
  getNextInPattern: function () {
    return Math.floor(Math.random() * 4);
  },

  /**
   * Prints out the pattern to the log.
   */
  printPattern: function () {
    for (var i = 0; i < this.pattern.length; i++) {
      console.log(this.pattern[i])
    }
  },

  /**
   * Compares the selection to the pattern at the current step.
   * @param step
   * @param selection
   * @returns {boolean}
   */
  compareSelection: function (step, selection) {
    return this.pattern[step] === selection;
  },

  /**
   * Main driver of the application. Can be used as a reset by passing no args.
   * @param selection - An integer value matching the current pattern step.
   * @returns {Array|Boolean} True if the player has won. Pattern segment up to the
   * current step, otherwise.
   */
  go: function (selection) {
    if (this.pattern.length === 0 || selection === undefined) {
      return this.reset();
    }
    // is selection correct for current step?
    if (this.compareSelection(this.currentStep, selection)) {
      if (this.isGameOver()) {
        // Win!
        return true;
      }
      else if (this.isLastInPattern() && (this.currentStep !== this.pattern.length -1)) {
        this.pattern.push(this.getNextInPattern());
        return this.pattern;
      }
      else {
        this.currentStep++;
        this.pattern.push(this.getNextInPattern());
        return this.pattern;
      }
    }
    else {
      // wrong selection, repeat.
      return this.pattern;
    }
  },

  /**
   * Resets the pattern, the step, and returns a new starting pattern.
   * @returns {Array} The pattern.
   */
  reset: function () {
    this.pattern = [];
    this.currentStep = 0;
    this.pattern.push(this.getNextInPattern());
    return this.pattern;
  },

  /**
   * Checks if the player has one the game.
   * @returns {boolean}
   */
  isGameOver: function () {
    return (this.isLastInPattern && this.isLastStepInGame());
  },

  /**
   * Used to check if the player has completed the current sequence.
   * @returns {boolean}
   */
  isLastInPattern: function () {
    return this.currentStep === this.pattern.length -1;
  },

  /**
   * Checks if the current step is the last step in the game.
   * @returns {boolean}
   */
  isLastStepInGame: function () {
    return this.currentStep === 19;
  }
};

