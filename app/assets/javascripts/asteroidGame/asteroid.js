(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    options.color = Asteroid.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = Asteroid.randomRadius();
    options.vel = options.vel || Asteroids.Util.randomVec(Asteroid.SPEED);

    Asteroids.MovingObject.call(this, options);
    this.sprite = new Image();

    var randIndex = Math.floor(Math.random() * 3);
    // this.sprite.src = "assets/asteroid-1.png";

    this.sprite.src = Asteroids.PNGS[randIndex];

  };

  // Asteroid.PNGS = ["assets/asteroid-1.png", "assets/asteroid-2.png", "assets/asteroid-3.png"]
  Asteroid.COLOR = "#ccc";
  Asteroid.RADIUS = 25;
  Asteroid.SPEED = 4;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.randomRadius = function() {
    return Asteroid.RADIUS + Math.floor(Math.random() * Asteroid.RADIUS);
  };

  Asteroid.prototype.draw = function (ctx) {
      ctx.drawImage(this.sprite, this.pos[0] - this.radius
                    ,this.pos[1] - this.radius
                    ,this.radius * 2, this.radius * 2);
  };

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {

      if ( isNaN(Asteroids.Game.death) ) { Asteroids.Game.death = 0 }
      Asteroids.Game.death += 1;
      $(".death-count").html("Death Count: " + Asteroids.Game.death );

      otherObject.relocate();
    }
  };
})();
