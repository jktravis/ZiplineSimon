exports.simon = {
  pattern: [],
  currentStep:  0,
  strictMode: false,

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
   * Resets the pattern, the step, and sets a new starting pattern.
   */
  reset: function () {
    this.pattern = [];
    this.currentStep = 0;
    this.pattern.push(this.getNextInPattern());
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
    return this.currentStep === 5;
  },

  /**
   * Toggle strict mode on and off.
   */
  toggleStrict: function toggleStrict() {
    this.strictMode = !this.strictMode;
  }
};

