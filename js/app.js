var score = 0;
$('#score').text(score);
$('#level').text("Easy");

//Enemy class
var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

//update enemies x and y position
Enemy.prototype.update = function(dt) {
    if(this.x < 505) {
        this.x += dt * this.speed;
        this.x += 3;
    } else {
        this.x = -5;
    }
    this.collision();
};

//When enemy and player collided
Enemy.prototype.collision = function() {
     if(this.x < player.x + 50 &&
        this.x + 40 > player.x &&
        this.y < player.y + 50 &&
        this.y + 40 > player.y) {
        player.reset(200,350);
    } else {
        player.update;
    }
}

//draw an image of enemy
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player class
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

//update score when player reaches at water level
Player.prototype.update = function() {
    if(player.y <= 0) {
        //$('#score').text(score);
        this.displayScore();
    }
};

//Display score
Player.prototype.displayScore =  function() {
    score++;
    $('#score').text(score);
    if(score == 6) {
        swal("Easy level crossed!!cross Difficult level to win the game.");
        $('#level').text("Difficult");
        enemies.increaseEnemyAndSpeed();
    } else if(score === 10) {
        swal("Well done!!You crossed both levels.");
        setTimeout(function() {
            document.location.reload();
            score = 0;
            $('#level').text("Easy");
        },2000);
    }
    //swal("Your Score: " + score);
    player.reset(200,350);
};

//draw an image of player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

//update player postion when user clciked arrow keys
Player.prototype.handleInput = function(direction) {
    if(direction === "left" && this.x > 0) {
        this.x -= 50;
    }
    if(direction === "right" && this.x < 400) {
        this.x += 50;
    }
    if(direction === "up" && this.y > 0) {
        this.y -= 50;
    }
    if(direction === "down" && this.y < 350) {
        this.y += 50;
    }
};

//reset player position
Player.prototype.reset = function(x,y) {
    this.x = x;
    this.y = y;
};

//initialize variables
var allEnemies = [];
var enemies;

//increase enemies and speed when player makes more than 5 score
Enemy.prototype.increaseEnemyAndSpeed = function() {
    for(var i = 0;i < 2;i++) {
        var speed= 110 * Math.random();
        enemies = new Enemy(-100,70 + (80 * i),speed);
        allEnemies.push(enemies);
    }
};

//initial enemies
for(var i = 0;i < 3;i++) {
    var speed= 80 * Math.random();
    enemies = new Enemy(-100 + (200 * i),60 +  (80 * i),speed);
    allEnemies.push(enemies);
}

//create object of Player class
var player = new Player(200,350);

//add event when arrow keys are clicked
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
