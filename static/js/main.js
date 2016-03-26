$(document).ready(function () {
  var Simon = exports.simon;
  var $buttons = $('#simon > button');

  var colors = [
    {base: '#00c100', highlight: '#00ff00'},
    {base: '#d20306', highlight: '#FF4D52'},
    {base: '#CCCA4B', highlight: '#FFFF00'},
    {base: '#0605C5', highlight: '#009CFF'}
  ];

  function playPattern() {
    var seqFunctions = [];
    setTimeout(
      (function (){
        for (var i = 0; i < Simon.pattern.length; i++) {
          seqFunctions.push([flash, Simon.pattern[i]]);
        }

        seqFunctions.map(function(fun, index) {
          setTimeout(fun[0], 1000 * index, fun[1]);
        });
      }), 2000 );
  }

  function playSound(id) {
    $('#audio-' + id).trigger('play');
  }

  function flash(id) {
    var $sel = $('#' + id);
    (function() {
      playSound(id);
      $sel.animate({backgroundColor: colors[id].highlight}, 'fast');
    })();
    (function() {
      $sel.animate({backgroundColor: colors[id].base}, 'slow');
    })();
  }

  function zfill(n, width) {
    var tmp = '';
    while ((tmp + n).length < width) {
      tmp = '0' + n;
    }
    return tmp;
  }

  function updateScore() {
    $('#score').text(zfill(Simon.pattern.length - 1, 2));
  }

  Simon.pattern.push(Simon.getNextInPattern());
  updateScore();
  playPattern();

  $buttons.on('mousedown', function() {
    $(this).animate({backgroundColor: colors[this.id].highlight}, 'fast');
    playSound(this.id);
  });

  $buttons.on('mouseup', function () {
    $(this).animate({backgroundColor: colors[this.id].base}, 'fast');
    // Selection correct?
    if (Simon.compareSelection(Simon.currentStep, parseInt(this.id))) {
      console.log('Correct selection');
      if (Simon.isLastStepInGame() && Simon.isLastInPattern()) {
        // won the game
        console.log('You win!');
      }
      else if (Simon.isLastInPattern()) {
        console.log('Last in pattern. Getting next, and playing pattern');
        Simon.pattern.push(Simon.getNextInPattern());
        Simon.currentStep = 0;
        updateScore();
        playPattern();
      }
      else {
        console.log('Incrementing step');
        Simon.currentStep++;
      }
    }
    else {
      console.log('Incorrect selection');
      console.log(Simon.pattern);
      Simon.currentStep = 0;
      playPattern();
    }
  })
});

