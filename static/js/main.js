$(document).ready(function () {
  var Simon = exports.simon;
  var colors = [
    {base: '#00c100', highlight: '#00ff00'},
    {base: '#B20000', highlight: '#fa0000'},
    {base: '#B5B200', highlight: '#f4f000'},
    {base: '#0000A9', highlight: '#0000f6'}
  ];


  function playPattern() {
    for (var i = 0; i < Simon.pattern.length; i++) {
      flash(i);
      console.log("Beep: " + Simon.pattern[i]);
    }
  }

  function flash(id) {
    var $sel = $('#' + id);
    (function() {
      $sel.animate({backgroundColor: colors[id].highlight}, 500);
    })();
    (function() {
      $sel.animate({backgroundColor: colors[id].base}, 300);
    })();
  }

  setTimeout(function () {
    flash(0);
    setTimeout(function () {
      flash(1);
      setTimeout(function () {
        flash(2);
        setTimeout(function () {
          flash(3);
        }, 500);
      }, 500);
    }, 500);
  }, 500);
});

