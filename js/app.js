var Xstep = 101;
var Ystep = 82;
var Xleft = 0;
var Xright = 505;
var Yup = 0;
var Ydown = 606;
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    //sets random speed for enemies
    eSpeed = [170, 110, 150, 180, 130, 190, 140, 200];
    var randomSpeed = eSpeed[Math.floor(Math.random() * eSpeed.length)];
    this.speed = randomSpeed;
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
this.x += this.speed * dt;
//repositions bugs to the beginning when they reach up the right side of the screen
if (this.x > Xright) {
        this.x = -50
    };
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
var Player = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    //chooses random character every time the game is loaded
    myCharacters = ['images/char-boy.png','images/char-cat-girl.png','images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
    var randomCharacter = myCharacters[Math.floor(Math.random() * myCharacters.length)];
    this.sprite = randomCharacter;
};
Player.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
//allows user to move player using keyboard & prvents player from moving offscreen
Player.prototype.handleInput = function (key) {
    switch(key){
    case 'left':
        if (this.x > 0)
        this.x -=Xstep
        break;
    case 'right':
        if (this.x < 400)
        this.x +=Xstep
        break;
    case 'up':
        if (this.y > 0)
        this.y -=Ystep
        else this.y = 410
        break;
    case 'down':
        if (this.y < 400)
        this.y +=Ystep
        break;
    default:
        return;
    }
}
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
//resets player to its starting position
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 410;
}
Player.prototype.update = function(dt) {
//resets game on enemies/player collisions    
for(var e = 0, quantityEnemies = allEnemies.length; e < quantityEnemies; e++) {
        if(player.x <= (allEnemies[e].x + 70)
            && allEnemies[e].x <= (player.x + 50)
            && player.y <= (allEnemies[e].y + 70)
            && allEnemies[e].y <= (player.y + 60)) {
                player.reset();
                
            }
}
}
//creates enemies
var allEnemies = [];
var enemy1 = new Enemy(0, 150);
allEnemies.push(enemy1);
var enemy2 = new Enemy(0, 70);
allEnemies.push(enemy2);
var enemy3 = new Enemy(0, 220);
allEnemies.push(enemy3);
var enemy4 = new Enemy(-200, 70);
allEnemies.push(enemy4);
var enemy5 = new Enemy(-300, 150)
allEnemies.push(enemy5);
//creates player
var player = new Player(200, 410);



