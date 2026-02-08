var board = null;
var game = new Chess();
var $status = $('#status');

function onDragStart (source, piece, position, orientation) {
  if (game.game_over()) return false;
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
}

function onDrop (source, target) {
  var move = game.move({ from: source, to: target, promotion: 'q' });
  if (move === null) return 'snapback';
  updateStatus();
}

function updateStatus () {
  var status = '';
  var moveColor = (game.turn() === 'w') ? 'الأبيض' : 'الأسود';
  if (game.in_checkmate()) { status = 'انتهت اللعبة! ' + moveColor + ' خسر.'; }
  else if (game.in_draw()) { status = 'تعادل!'; }
  else { status = 'الدور على: ' + moveColor; }
  $status.html(status);
}

var config = { draggable: true, position: 'start', onDragStart: onDragStart, onDrop: onDrop };
board = Chessboard('board', config);
updateStatus();
