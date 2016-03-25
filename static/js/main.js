$(document).ready(function () {
  var Simon = exports.simon;
  var seqFunctions = [];
  var colors = [
    {base: '#00c100', highlight: '#00ff00'},
    {base: '#d20306', highlight: '#FD2C19'},
    {base: '#CCCA4B', highlight: '#FFFF00'},
    {base: '#0000FF', highlight: '#4371EE'}
  ];


  function playPattern() {
    for (var i = 0; i < Simon.pattern.length; i++) {
      seqFunctions.push([flash, Simon.pattern[i]]);
    }

    console.log(seqFunctions);
    seqFunctions.map(function(fun, index) {
      setTimeout(fun[0], 500 * index, fun[1]);
    });
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

  Simon.pattern.push(Simon.getNextInPattern());
  playPattern();
});

