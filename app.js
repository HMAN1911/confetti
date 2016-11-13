(function() {

  var allParticles = [];
  var lastTime = Date.now();
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function Particle() {
    this.repl();
  }

  Particle.prototype.render = function(dt) {

    this.x += (((this.endX - this.startX) + this.speed) * dt) / 3;
    this.y += (((this.endY - this.startY) + this.speed) * dt) / 3;
  
    ctx.fillStyle = 'rgba(' + this.colour[0] + ',' + this.colour[1] + ',' + this.colour[2] + ',' + this.opacity + ')';

    ctx.fillRect(this.x, this.y, this.scale * 4, this.scale * 4);

  
    if (this.life < Date.now()) {
      this.repl(); 
    }

    if (this.opacity > 0.99 && !this.dying) {
      this.dying = true;
    } 

    if (this.dying) {
      this.opacity -= 0.05;
      this.scale -= 0.06;  
    } else if (!this.dying){
      this.scale += 0.01;  
      this.opacity += 0.01;
    }

    // if (this.opacity > 1 || this.x < 0 || this.y < 0 || this.x > window.innerWidth || this.y > window.innerHeight) {
    //   this.repl();
    // }
  }

  Particle.prototype.repl = function() {
    this.startX = getRange(0, window.innerWidth);
    this.startY = getRange(-100, window.innerHeight - 300);
    this.endX = getRange(this.startX - 60, this.startX + 60);
    this.endY = getRange(this.startY + 200, this.startY + 500);
    this.x = this.startX;
    this.y = this.startY;
    this.speed = Math.random();
    this.opacity = 0.1;
    this.scale = 0.01;
    this.colour = [Math.floor(getRange(0, 255)), Math.floor(getRange(0, 255)), Math.floor(getRange(0, 255))];
    this.life = Date.now() + (Math.random() * 2000);
    this.dying = false;
  }
  
  // the engine itself
  function main() {
    var now = Date.now();
    var dt = ((now - lastTime) / 1000);

    update(dt);
    window.requestAnimationFrame(main);
  }

  function init(particleCount) {
    // make the particles
    allParticles = Array.apply(null, Array(particleCount)).map(function() {
      return new Particle();
    });
    main();
  }

  function getRange(a, b) {
    return ~~((b + 1) - a) * Math.random() + a;
  }

  function update(dt) {
    lastTime = Date.now();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    allParticles.forEach(function(particle) {
      particle.render(dt);
    });
  }

  init(300);

})();