/*jshint esversion: 6 */
'use strict';

// Enemies our player must avoid
var Enemy = function() {

  this.setVariables();
  this.sprite = 'images/enemy-bug.png';

};

//Randomly set the offscreen starting point of the enemy.
Enemy.prototype.setVariables = function() {
  let x, y, movement;
  let enemyStartX = [-101, -202, -303, -404];
  let enemyStartY = [63, 146, 229];
  let enemyStartMov = [101, 202, 303, 404];
  // assigns x to one of 4 presets 1=-101, 2=-202, 3=-303 4=-404.
  let debugX = Math.floor(Math.random() * Math.floor(3)) + 1;
  //console.log(debugX);
  this.x = enemyStartX[debugX];
  // assigns y to one of the three lanes. 63(Top lane), 146(middle lane) 229(bottom lane).
  let debugY = Math.floor(Math.random() * Math.floor(3)) + 1;
  //console.log(debugY);
  this.y = enemyStartY[debugY];
  // assigns movement to one of four presets. 1=101, 2=202, 3=303 and 4=404.
  let debugMov = Math.floor(Math.random() * Math.floor(2)) + 1;
  //console.log(debugMov);
  this.movement = enemyStartMov[debugMov];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.movement * dt);
    if (this.x > 505) {
      this.setVariables();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player function
var Player = function() {
  this.reset();
  this.sprite = 'images/char-cat-girl.png';
  this.lives = 3;
  this.livesDisplay = document.querySelector('.lives');
};

// Updates the player. Collision detection.
Player.prototype.update = function(dt) {
  //console.log(this.x + ' ' + this.y);
};

//Render the image.
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Moves the player via keypress.
Player.prototype.handleInput = function(keycode) {
  switch(keycode) {
    case 'left':
      if ((this.x - 101) > 0) {
        this.x = this.x - 101;
      }
      break;
    case 'right':
      if ((this.x + 101) < 404) {
        this.x = this.x + 101;
      }
      break;
    case 'up':
      if ((this.y - 83) > -83) {
        this.y = this.y - 83;
        if (this.y === -41.5) {
          this.gameOver();
        }
      }
      break;
    case 'down':
      if ((this.y + 83) < 415) {
        this.y = this.y + 83;
      }
      break;
  }
};

// Resets the player to a start screen.
Player.prototype.reset = function() {
  this.x = 202;
  this.y = 373.5;
};

//Shows lives of Player.
Player.prototype.showLives = function () {
  let liveDisplay = document.querySelector('.lives');
  // Changed to be based on a idea from stackoverflow.
  if (liveDisplay.firstChild) {
    while (liveDisplay.firstChild) {
      liveDisplay.removeChild(liveDisplay.firstChild);
    }
  } else {
    player.reset();
  }
  for (let i = 0; i < this.lives; i++) {
    let livesImg = document.createElement('img');
    livesImg.setAttribute('src', this.sprite);
    livesImg.setAttribute('alt', 'Life');
    livesImg.classList.add('liveimg');
    this.livesDisplay.appendChild(livesImg);
  }
};

Player.prototype.removeLife = function () {
  this.lives--;
  let aLife = this.livesDisplay.firstElementChild;
  this.livesDisplay.removeChild(aLife);
  if (this.lives === 0) {
    player.gameOver();
  }
};

Player.prototype.gameOver = function () {
  let gmOver = document.querySelector('.gameOver');
  let gameOverMsg = document.querySelector('.gameOverMsg');
  if (this.lives > 0) {
    gameOverMsg.textContent = "You've Won!";
  } else {
    gameOverMsg.textContent = "You've Lost!";
  }
  gmOver.classList.toggle("hidden");
  gmOver.classList.toggle("shown");
};

//Instatiate player and enemies.
var player = new Player();
player.showLives();
var allEnemies = [];
var totalEnemies = 3;
for (let i = 0; i < totalEnemies; i++) {
  let enemy = new Enemy();
  enemy.setVariables();
  allEnemies.push(enemy);
}
var gameOverBtn = document.querySelector('.gameOverBtn');
gameOverBtn.addEventListener('click', function() {
  player.lives = 3;
  player.reset();
  player.showLives();
  let gameOverBrd = document.querySelector('.gameOver');
  gameOverBrd.classList.toggle('hidden');
  gameOverBrd.classList.toggle('shown');
});
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
