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

  Simon.pattern.push(Simon.getNextInPattern());
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
      if (Simon.isLastInPattern()) {
        console.log('Last in pattern. Getting next, and playing pattern');
        Simon.pattern.push(Simon.getNextInPattern());
        Simon.currentStep = 0;
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
    }
  })
});

