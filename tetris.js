const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const COLORS = [
  null,
  'cyan',
  'blue',
  'orange',
  'yellow',
  'green',
  'purple',
  'red'
];

const SHAPES = [
  [],
  [[1, 1, 1, 1]],
  [[2, 0, 0], [2, 2, 2]],
  [[3, 3, 3], [0, 0, 3]],
  [[4, 4], [4, 4]],
  [[0, 5, 5], [5, 5, 0]],
  [[6, 6, 6], [0, 6, 0]],
  [[7, 7, 0], [0, 7, 7]]
];

class Board {
  constructor(context) {
    this.context = context;
    this.grid = this.getEmptyBoard();
  }

  getEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  draw() {
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.context.fillStyle = COLORS[value];
          this.context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
      });
    });
  }
}

class Piece {
  constructor(context) {
    this.context = context;
    this.spawn();
  }

  spawn() {
    this.typeId = this.randomizeTetrominoType(COLORS.length - 1);
    this.shape = SHAPES[this.typeId];
    this.color = COLORS[this.typeId];
    this.x = 3;
    this.y = 0;
  }

  draw() {
    this.context.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.context.fillRect((this.x + x) * BLOCK_SIZE, (this.y + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
      });
    });
  }

  randomizeTetrominoType(noOfTypes) {
    return Math.floor(Math.random() * noOfTypes) + 1;
  }
}

const board = new Board(context);
const piece = new Piece(context);

function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  board.draw();
  piece.draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    piece.x -= 1;
  } else if (event.key === 'ArrowRight') {
    piece.x += 1;
  } else if (event.key === 'ArrowDown') {
    piece.y += 1;
  }
});

gameLoop();
