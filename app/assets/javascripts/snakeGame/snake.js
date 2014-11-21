(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }


  var Snake = SnakeGame.Snake = function(options){
    this.board = options.board;
    this.startX = Math.floor( this.board.width/2);
    this.startY = Math.floor( this.board.height/2);

    this.dir = new Coord([1,0]);
    this.segments = [new Coord([this.startY, this.startX ]),
                     new Coord([this.startY, this.startX+1 ]),
                     new Coord([this.startY, this.startX +2])];
    this.snakeHeadIndex = this.segments.length-1;
    this.growCounter = 0; //how long snake is allow to grow
  }

  Snake.DIRS = ["N", "E", "W", "S"];

  Snake.prototype.move = function () {
    this.segments.push(this.segments[ this.snakeHeadIndex ].plus(this.dir));
    if ( this.ateApple(this.segments[ this.snakeHeadIndex ]) ) {
      this.growCounter += 3;
    }

    if ( this.growCounter === 0) {
      this.segments.shift();

    } else if (this.growCounter > 0) {
      this.growCounter -= 1;
    }

    this.snakeHeadIndex = this.segments.length-1;
  };


  Snake.prototype.turn = function (dir) {
    //prevent snake from being able to turn 180deg back;
    switch (dir){
    case "N":
      var newDir = new Coord([-1,0]);
      if ( this.dir.y !== 1) { this.dir = newDir; }
      break;
    case "E":
      var newDir = new Coord([0,1]);
      if ( this.dir.x !== -1) { this.dir = newDir; }
      break;
    case "W":
      var newDir = new Coord([0,-1]);
      if ( this.dir.x !== 1) { this.dir = newDir; }
      break;
    case "S":
      var newDir = new Coord([1,0]);
      if ( this.dir.y !== -1) { this.dir = newDir; }
      break;
    }
  };

  Snake.prototype.selfImpacted = function () {

    for (var i = 0; i < this.segments.length; i++) {
      for (var j = i + 1; j < this.segments.length; j++) {
        if (this.segments[i].equal(this.segments[j]) ) {
          return true;
        }
      }
    }
    return false;
  };


  var Coord = SnakeGame.Coord = function (pos) {
    this.x = pos[1];
    this.y = pos[0];
  }


  Coord.prototype.plus = function (coord2) {
    var newX = this.x + coord2.x;
    var newY = this.y + coord2.y;
    return new Coord([newY, newX]);
  };


  Coord.prototype.equal = function(otherCoord) {
    return (this.x === otherCoord.x && this.y === otherCoord.y);
  };

  var Board = SnakeGame.Board = function(options) {
    this.initializeGrid({ height: options.height, width: options.width });
    this.snake = new Snake({ board: this });
  };

  Board.prototype.initializeGrid = function (options) {
    this.height = options.height;
    this.width = options.width;
    this.score = 0;
    this.apples = [];

    this.grid = new Array( this.height );
    for(var i = 0; i < this.height; i++) {
      this.grid[i] = new Array( this.width );
    };
  };

  Board.prototype.lost = function () {

    return (this.isOutOfBounds() || this.snake.selfImpacted());
  };

  Board.prototype.isOutOfBounds = function () {
    var head_index = this.snake.segments.length - 1
    var tooFarRight = this.snake.segments[head_index].x > this.grid.length;
    var tooFarDown = this.snake.segments[head_index].y > this.grid.length;
    var tooFarLeft = this.snake.segments[head_index].x < 0;
    var tooFarUp = this.snake.segments[head_index].y < 0;

    return tooFarRight || tooFarDown || tooFarLeft || tooFarUp;
  };


  Board.prototype.newApple = function() {
    if (!this.over) {
      var appleCoord = new Coord([ Math.floor(Math.random() * this.width),
                                   Math.floor(Math.random() * this.height)
                                 ]);
      if (this.snake.isOccupy( appleCoord ) || this.appleAt(appleCoord)) {
        this.apples.push(this.newApple());
      } else {
        this.apples.push(appleCoord);
      }
    }
  };

  Snake.prototype.isOccupy = function(coord) {
    for (var i = 0; i < this.segments.length; i++) {
      if (this.segments[i].equal(coord)) {
        return true;
      }
    }
    return false;
  };

  Snake.prototype.ateApple = function(coord) {
    if (this.board.appleAt(coord)) {
      this.board.eatApple(coord);
      return true;
    }
    return false;
  };

  Board.prototype.appleAt = function(coord) {
    for (var i = 0; i < this.apples.length; i++) {
      if (this.apples[i] === undefined) { continue; }
      if (this.apples[i].equal(coord)) {
        return true;
      }
    }
    return false;
  };



  Board.prototype.eatApple = function(coord) {
    var appleIndex;
    for (var i = 0; i < this.apples.length; i++) {
      if (this.apples[i] === "undefined") { continue; }
      if (this.apples[i].equal(coord)) {
        appleIndex = i;
        break;
      }
    }
    this.apples[appleIndex] = this.apples[this.apples.length - 1];
    this.apples = this.apples.slice(0, -1);
    this.score += 10;
  };
  //


})();
