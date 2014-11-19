(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.game = game;
    this.ship = this.game.addShip();
    this.timerId = null;
  };

  GameView.MOVES = {
    "w": [ 0, -1],
    "a": [-1,  0],
    "s": [ 0,  1],
    "d": [ 1,  0],
  };


  GameView.prototype.MouseEventHanlder = function (){
    var ship = this.ship;
    var ctx = this.ctx;
    var offsetX = this.canvas.offsetLeft;
    var offsetY = this.canvas.offsetTop;
    var windowX = $(window).innerWidth()*0.244;
    // var windowY = window.offsety-900/2;
    // console.log(windowX)
    $(this.canvas).mousemove( function(event){
      var x = event.pageX - offsetX - windowX;
      var y = event.pageY - offsetY -120;
      var dx = x - ship.pos[0];
      var dy = y - ship.pos[1];
      var mag = Math.sqrt( dx*dx + dy*dy);
      var dvx = (dx-ship.vel[0])/100;
      var dvy = (dy-ship.vel[1])/100;
      ship.dir = [ship.vel[0], ship.vel[1]];
      move = [dvx, dvy];
      ship.power(move);
    }.bind(this));


    $(this.canvas).click( function(event){
        ship.fireBullet();
    });
  };



  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { ship.power(move); });
    });

    key("space", function () { ship.fireBullet() });

    //pause and unpuase the game
    key("e", function(event){
      event.preventDefault();
      if (this.isPause === true) {
        this.restart();
      } else {
        this.stop();
      }

    }.bind(this));
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.isPause = false;

    this.timerId = this.restart();
    this.MouseEventHanlder();
    this.bindKeyHandlers();
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
    this.isPause = true;
  };

  GameView.prototype.restart = function() {
    this.timerId =  setInterval(
      function () {
        this.game.step();
        this.game.draw(this.ctx);
      }.bind(this), 50
    );
    this.isPause = false;
    return this.timerId;
  };


})();
