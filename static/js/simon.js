exports.simon = {
  pattern: [],

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
  }
};

