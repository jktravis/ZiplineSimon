$(document).ready(function () {
  var Simon = exports.simon;
  var colors = [
    {base: '#00c100', highlight: '#00ff00'},
    {base: '#d20306', highlight: '#FD2C19'},
    {base: '#CCCA4B', highlight: '#FFFF00'},
    {base: '#0000FF', highlight: '#4371EE'}
  ];


  function playPattern() {
    for (var i = 0; i < Simon.pattern.length; i++) {
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

