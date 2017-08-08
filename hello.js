var squares = document.getElementsByClassName("square");
var state = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
];
var gameOver = false;
var visible = false;
var human = false;
var computer = true;
var humanValue = -1;
var compValue = 1;
var currentPlayer = human;
var winCombo = [
  [
    0, 1, 2
  ],
  [
    3, 4, 5
  ],
  [
    6, 7, 8
  ],
  [
    0, 3, 6
  ],
  [
    1, 4, 7
  ],
  [
    2, 5, 8
  ],
  [
    0, 4, 8
  ],
  [2, 4, 6]
];

function reset() {
  for (var x = 0; x < 9; x++) {
    squares[x].style.background = "#fff";
    squares[x].style.borderRadius = "20px";
    squares[x].innerText = "";
    state[x] = 0;
  }
  document.getElementById("winnerBox").style.visibility = "hidden";
  gameOver = false;
  currentPlayer = human;
}

function showAiBrain() {
  for (var x = 0; x < 9; x++)
    squares[x].style.fontSize = visible
      ? "0px"
      : "1.5vh";
  document.getElementById("showAiBrain").innerText = visible
    ? "Show Values"
    : "Hide Values";
  visible = !visible;
}

function claim(clicked) {
  if (gameOver)
    return;
  for (var x = 0; x < 9; x++) {
    if (squares[x] == clicked && state[x] == 0) {
      set(x, currentPlayer);
    }
  }
}

function findWinner() {
  var winner = null;
  if (checkWin(state, human)) {
    winner = "Blue";
  } else if (checkWin(state, computer)) {
    winner = "Red";
  } else {
    winner = "No Winner";
  }
  return winner;
}

function set(index, player) {
  if (gameOver)
    return;
  if (state[index] == 0) {
    squares[index].style.background = player == human
      ? "rgb(16, 108, 193)"
      : "rgb(224, 84, 84)";
    squares[index].style.borderRadius = "100%";
    state[index] = player == human
      ? humanValue
      : compValue;
    currentPlayer = !currentPlayer;
    aiTurn(state, 0, currentPlayer, false);
    if (checkWin(state, player) || checkBoardFull(state)) {
      for (var x = 0; x < 9; x++)
        squares[x].innerText = "";
      gameOver = true;
      document.getElementById("winnerBox").style.visibility = "";
      if (findWinner() == "Red" || findWinner() == "Blue") {
        document.getElementById("winnerBox").innerText = findWinner() + " is the winner!";
      } else {
        document.getElementById("winnerBox").innerText = "Its a Draw!";
      }
    }
  }
}

function checkWin(board, player) {
  var value = player == human
    ? humanValue
    : compValue;
  for (var y = 0; y < 8; y++) {
    if (value === board[winCombo[y][0]] && board[winCombo[y][0]] === board[winCombo[y][1]] && board[winCombo[y][1]] === board[winCombo[y][2]]) {
      return true;
    }
  }
  return false;
}

function checkBoardFull(board) {
  for (var x = 0; x < 9; x++)
    if (board[x] == 0) {
      return false;
    }
  return true;
}

function aiTurn(board, depth, player, turn) {
  // basecase
  if (checkWin(board, !player))
    return -10 + depth;
  if (checkBoardFull(board))
    return 0;

  // switch between checking for player and AI
  // retrun the max value and the index of that position
  var value = player == human
    ? humanValue
    : compValue;
  var max = -Infinity;
  var index = 0;

  for (var x = 0; x < 9; x++) {
    // if (depth == 0)
    // squares[x].innerText = "";

    // using a new board to test for value
    if (board[x] == 0) {
      var newBoard = board.slice();
      newBoard[x] = value;
      var moveValue = -aiTurn(newBoard, depth + 1, !player, false);

      if (depth == 0)
        squares[x].innerText = moveValue;
      if (moveValue > max) {
        max = moveValue;
        index = x;
      }
    }
  }
  if (turn)
    set(index, player)
}
