$(document).ready(function () {
  var Simon = exports.simon;
  var $buttons = $('#simon > button');
  var $powerSwitch = $('#power');
  var $errorFlash = $('#errorFlash');
  var $winningModal = $('#winningModal');

  var colors = [
    {base: '#00c100', highlight: '#00ff00'},
    {base: '#d20306', highlight: '#FF4D52'},
    {base: '#CCCA4B', highlight: '#FFFF00'},
    {base: '#0605C5', highlight: '#009CFF'}
  ];

  /**
   * Play the pattern on screen.
   */
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

  /**
   * Play the audio for the provided button ID.
   * @param id - the ID of the button.
   */
  function playSound(id) {
    $('#audio-' + id).trigger('play');
  }

  /**
   * Flash the button for the provided ID.
   * @param id - the ID of the button.
   */
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

  /**
   * Zero pad the number by the width.
   * @param n - the number.
   * @param width - how many zeros to left pad.
   * @returns {string} - the zero padded string.
   */
  function zfill(n, width) {
    var tmp = '';
    while ((tmp + n).length < width) {
      tmp = '0' + n;
    }
    return tmp;
  }

  /**
   * Update the score display.
   */
  function updateScore() {
    if (Simon.pattern.length === 0) {
      $('#score').text('--');
    }
    else {
      $('#score').text(zfill(Simon.pattern.length - 1, 2));
    }
  }

  /**
   * Turn on and setup the game.
   */
  function turnOn() {
    $buttons.prop('disabled', false);
    Simon.reset();
    updateScore();
    playPattern();
  }

  /**
   * Turn off the game.
   */
  function turnOff() {
    Simon.currentStep = 0;
    Simon.pattern = [];
    updateScore();
    $buttons.prop('disabled', true);
  }

  /**
   * Flash the screen red twice and replays the pattern.
   * @param time - time in milliseconds for the time of each flash.
   */
  function selectionError(time) {
    setTimeout(function () {
      $errorFlash.modal('show');
      setTimeout(function () {
        $errorFlash.modal('hide');
        setTimeout(function () {
          $errorFlash.modal('show');
          setTimeout(function () {
            $errorFlash.modal('hide');
          }, time)
        }, time)
      }, time)
    }, time);

    console.log('Incorrect selection');
    console.log(Simon.pattern);
    Simon.currentStep = 0;
    playPattern();
  }

  $buttons.prop('disabled', true);

  $powerSwitch.bootstrapSwitch();

  $powerSwitch.on('switchChange.bootstrapSwitch', function (event, state) {
    if (state) {
      turnOn();
    }
    else {
      turnOff();
    }
  });

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
        $winningModal.modal('show');
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
      // flash on error
      selectionError(250);
    }
  });

  $('button[data-dismiss="modal"]').on('click', function () {
    turnOff();
    $powerSwitch.bootstrapSwitch('state', false, false);
  });

  $('button.btn.btn-primary').on('click', function () {
    $winningModal.modal('hide');
    turnOn();
  })
});

