$(document).ready(function () {
  var Simon = exports.simon;

  function playPattern() {
    var seqFunctions = [];
    for (var i = 0; i < Simon.pattern.length; i++) {
      seqFunctions.push([flash, Simon.pattern[i]]);
    }

    seqFunctions.map(function(fun, index) {
      setTimeout(fun[0], 500 * index, fun[1]);
    });
  }

  function flash(id) {
    var $sel = $('#' + id);
    var colors = [
      {base: '#00c100', highlight: '#00ff00'},
      {base: '#d20306', highlight: '#FD2C19'},
      {base: '#CCCA4B', highlight: '#FFFF00'},
      {base: '#0605C5', highlight: '#3A38FF'}
    ];

    (function() {
      $sel.animate({backgroundColor: colors[id].highlight}, 500);
    })();
    (function() {
      $sel.animate({backgroundColor: colors[id].base}, 300);
    })();
  }

  Simon.pattern.push(Simon.getNextInPattern());
  playPattern();

  $('#simon > div').on('click', function() {
    // Selection correct?
    if (Simon.compareSelection(Simon.currentStep, parseInt(this.id))) {
      console.log('Correct selection');
      if (Simon.isLastInPattern()) {
        console.log('Last in pattern. Getting next, and playing pattern');
        Simon.pattern.push(Simon.getNextInPattern());
        playPattern();
      }
      else {
        console.log('Incrementing step');
        Simon.currentStep++;
      }
    }
    else {
      console.log('Incorrect selection');
    }
  })
});

