$(document).ready(function () {
  var Simon = exports.simon;
  var $buttons = $('#simon > button');
  var sounds = [
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  ];

  var colors = [
    {base: '#00c100', highlight: '#00ff00'},
    {base: '#d20306', highlight: '#FF4D52'},
    {base: '#CCCA4B', highlight: '#FFFF00'},
    {base: '#0605C5', highlight: '#009CFF'}
  ];

  function playPattern() {
    var seqFunctions = [];
    for (var i = 0; i < Simon.pattern.length; i++) {
      seqFunctions.push([flash, Simon.pattern[i]]);
    }

    seqFunctions.map(function(fun, index) {
      setTimeout(fun[0], 1000 * index, fun[1]);
    });
  }

  function flash(id) {
    var $sel = $('#' + id);
    (function() {
      $sel.animate({backgroundColor: colors[id].highlight}, 750);
      sounds[id].play();
    })();
    (function() {
      $sel.animate({backgroundColor: colors[id].base}, 300);
    })();
  }

  Simon.pattern.push(Simon.getNextInPattern());
  playPattern();

  $buttons.on('mousedown', function() {
    $(this).animate({backgroundColor: colors[this.id].highlight}, 'fast');
    sounds[this.id].play();
  });

  $buttons.on('mouseup', function () {
    $(this).animate({backgroundColor: colors[this.id].base}, 'fast');
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

