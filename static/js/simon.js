exports.simon = {
  pattern: [],
  currentStep:  0,

  getNextInPattern: function () {
    return Math.floor(Math.random() * 4);
  },

  printPattern: function () {
    for (var i = 0; i < this.pattern.length; i++) {
      console.log(this.pattern[i])
    }
  },

  compareSelection: function (step, selection) {
    return this.pattern[step] === selection;
  },
  
  go: function (selection) {
    // is selection correct for current step?
    if (this.compareSelection(this.currentStep, selection)) {
      if (this.isLastInPattern && this.isLastStepInGame()) {
        // Win!
      }
      else if (this.isLastInPattern()) {
        this.pattern.push(this.getNextInPattern());
        return this.pattern.slice(0, this.currentStep);
      }
      else {
        this.currentStep++;
        this.pattern.push(this.getNextInPattern());
        return this.pattern.slice(0, this.currentStep);
      }
    }
    else {
      // wrong selection, repeat.
      return this.pattern.slice(0, this.currentStep);
    }
  },
  
  isLastInPattern: function () {
    return this.currentStep === this.pattern.length -1;
  },
  
  isLastStepInGame: function () {
    return this.currentStep === 19;
  }
};

