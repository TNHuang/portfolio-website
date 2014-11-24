(function(){
  if(typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function($el) {
    var height = 25;
    var width = 25;

    this.isPause = true;
    this.hasStart = false;
    this.el = $el;
    this.board = new SnakeGame.Board({height: height, width: width});

    this.bindEvents();
    this.setUpBoard( {height: height, width: width} );

    this.render();
  }

  View.prototype.bindEvents = function () {
    var that = this;

    $(window).on('keydown', function(event){
      var dir = that.parseKeyCode(event.keyCode);
      if (dir) {
        that.board.snake.turn(dir);
      }
    });

    $(".start-game").click( function(){
      if(this.isPause === true){
        this.start();
        if (this.hasStart === false){
          $(".game-start").addClass("hidden");
          this.hasStart = true;
        }
      } else {
        this.pause();
      }
    }.bind(this))
  };

  View.prototype.start = function() {
    if (this.isPause === true) {
      this.isPause = false;
      this.stepIntervalId = setInterval(this.step.bind(this), 300);
      this.appleSpawn = setInterval(function() {
        this.board.newApple();
      }.bind(this), 3000);
    }

  };

  View.prototype.pause = function() {
    this.isPause = true;
    clearInterval(this.stepIntervalId);
    clearInterval(this.appleSpawn);
  };

  View.prototype.parseKeyCode = function (keycode) {
    switch (keycode) {
    case 38:
      return "N";
      break;
    case 37:
      return "W";
      break;
    case 39:
      return "E";
      break;
    case 40:
      return "S";
      break;
    default:
      return null;
    }
  };

  View.prototype.step = function () {
    this.board.snake.move();
    this.render();
    if (this.board.lost()) {
      $('.game-over').removeClass('hidden');
      clearInterval(this.stepIntervalId);
      clearInterval(this.appleSpawn);
    }
  };

  View.prototype.render = function () {
    var $listItem = $('ul.col li');
    $listItem.removeClass();
    $listItem.css("background", "#DDD");

    $('.score').html("Score: "+ this.board.score);
    this.board.apples.forEach( function(apple){
      $("ul.col:nth-child(" + (apple.x + 1) + ") li:nth-child(" + (apple.y + 1) + ")").css("background", "red");
    })

    var segments = this.board.snake.segments;
    var headIndex = this.board.snake.snakeHeadIndex;

    segments.forEach(function (segment) {
      if (segments.indexOf(segment) == headIndex ){
        picColor = "blue";
        drawSnakeHead = true;
      } else {
        picColor = "green";
      }
      $("ul.col:nth-child(" + (segment.x + 1) + ") li:nth-child(" + (segment.y + 1) + ")").css("background", picColor);

    })

  };

  View.prototype.setUpBoard = function (options) {
    var height = options.height;
    var width = options.width;

    for (var i = 0; i <= height; i++) {
      this.el.append("<ul class='col'>");
      for (var j = 0; j <= width; j++) {
        $('ul.col:last').append("<li></li>");
      }
    }

  };
})();
