var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");

var keys = []; //array of keys booleans

var width = canvas.width; //width int
var height = canvas.height; //height int
var score = 0;
var time = 0;
var timeSec = 0;
var tileAni = 0;
var flowerAni = 0; //animation var flower
var gotFlower = false; //if player got flower
var playerDown = false; //player is down
var playerAni = 0; //animation var player
var gameState = 0; //0 = title screen 1 = game 2 = game over
var title = "Bee and Flower BETA v1.6" //title
var PlayerSprite = 0; //0 = up, 1 = down 2 = left 3 = right
var debug = false; //debug mode boolean
var b; //temp cookie read var

var fps = 0, now, lastUpdate = (new Date)*1; //fps counter vars
var fpsFilter = 50;
var fpsFix = 0;

//welcome message
console.log(title+" | width: "+width+" | height: "+height+" | Please don`t try to cheat with Console");
console.log("Q / E toggle hit boxes");

//entities
var player = new entity("img/Player/down_still.png", width / 2, 10, 32, 32, 3);
var player_down = new entity("img/Player/Down/down_1.png", 0, 0, 32, 32, 0);
var flower = new entity("img/Flower/flower.png", Math.floor(Math.random() * width) - 16, Math.floor(Math.random() * height) - 16, 16, 16, 0);

//hit box image blue (entity)
var box16 = new Image(); 
box16.src = "img/Flower/box16_flower.png";

//hit box image red (flower)
var box32 = new Image(); 
box32.src = "img/Bee/box32_bee.png";

//hit box image blue (player)
var box32_player = new Image();
box32_player.src = "img/Player/box32_player.png";

//gameStates
var bgTitle = new obj("img/bgTitle.png",0,0,0,0); //gs 0
var bgGame = new obj("img/grass.png",0,0,0,0); //gs 1
var bgGameOver = new obj("img/bgGameOver.png",0,0,0,0); //gs 2

//bee
var norBees = new Array();
for (var i = 0; i < 3; i++) {
	norBees[i] = new entity("img/Bee/up_right.png", 0, 0, 32, 32, 1);
}

//events
canvas.addEventListener("click", function(e) {
	// tile screen
	if (gameState == 0) gameState = 1;
	//game over
	if (gameState == 2) {
		score = 0;
		time = 0;
		timeSec = 0;
		player.x = width / 2;
		player.y = 10;
		gameState = 0;

	}
}, false);

window.addEventListener("keydown" , function(e) {
	keys[e.keyCode] = true;
}, false);

window.addEventListener("keyup" , function(e) {
	delete keys[e.keyCode];
}, false);

/*
up = 38
down = 40
left = 37
right = 39

q = 81
e = 69
*/

function game() {
	if (timeSec >= 60 && gameState == 1) {
		gameState = 2;
	}
}

function update() {

	//debug key
	if(keys[81]) debug = true;
	if(keys[69]) debug = false;
	
	if (keys[38] || keys[87] && !playerDown) {
		var up = true;
	} else {
		up = false;
	}
	
	if (keys[40] || keys[83] && !playerDown) {
		var down = true;
	} else {
		down = false;
	}
	
	if (keys[37] || keys[65] && !playerDown) {
		var left = true;
	} else {
		left = false;
	}
	
	if (keys[39] || keys[68] && !playerDown) {
		var right = true;
	} else {
		right = false;
	}
	
	//player input control
	if (up && !(left || right)) { //up
		player.y-=player.speed;
		if(time < 20) player.Sprite.src = "img/Player/up_walkA.png";
		if(time > 20 && time < 40) player.Sprite.src = "img/Player/up_still.png";
		if(time > 40) player.Sprite.src = "img/Player/up_walkB.png";
		PlayerSprite = 0;
	} else if(PlayerSprite == 0) {
		player.Sprite.src = "img/Player/up_still.png";
	}
	if (down && !(left || right)) { //down
		player.y+=player.speed;
		if(time < 20) player.Sprite.src = "img/Player/down_walkA.png";
		if(time > 20 && time < 40) player.Sprite.src = "img/Player/down_still.png";
		if(time > 40) player.Sprite.src = "img/Player/down_walkB.png";
		PlayerSprite = 1;
	} else if(PlayerSprite == 1) {
		player.Sprite.src = "img/Player/down_still.png";
	}
	if (left && !(up || down)) { //left
		player.x-=player.speed;
		if(time < 20) player.Sprite.src = "img/Player/left_walkA.png";
		if(time > 20 && time < 40) player.Sprite.src = "img/Player/left_still.png";
		if(time > 40) player.Sprite.src = "img/Player/left_walkB.png";
		PlayerSprite = 2;
	} else if(PlayerSprite == 2) {
		player.Sprite.src = "img/Player/left_still.png";
	}
	if (right && !(up || down)) { //right
		player.x+=player.speed;
		if(time < 20) player.Sprite.src = "img/Player/right_walkA.png";
		if(time > 20 && time < 40) player.Sprite.src = "img/Player/right_still.png";
		if(time > 40) player.Sprite.src = "img/Player/right_walkB.png";
		PlayerSprite = 3;
	} else if(PlayerSprite == 3) {
		player.Sprite.src = "img/Player/right_still.png";
	}
	
	if (down && left) { //down left
		player.y+=player.speed;
		player.x-=player.speed;
		if(time < 20) player.Sprite.src = "img/Player/down_left_walkA.png";
		if(time > 20 && time < 40) player.Sprite.src = "img/Player/down_left_still.png";
		if(time > 40) player.Sprite.src = "img/Player/down_left_walkB.png";
		PlayerSprite = 4;
	} else if(PlayerSprite == 4) {
		player.Sprite.src = "img/Player/down_left_still.png";
	}
	if (down && right) { //down right
		player.y+=player.speed;
		player.x+=player.speed;
		if(time < 20) player.Sprite.src = "img/Player/down_right_walkA.png";
		if(time > 20 && time < 40) player.Sprite.src = "img/Player/down_right_still.png";
		if(time > 40) player.Sprite.src = "img/Player/down_right_walkB.png";
		PlayerSprite = 5;
	} else if(PlayerSprite == 5) {
		player.Sprite.src = "img/Player/down_right_still.png";
	}
	if (up && left) { //up left
		player.y-=player.speed;
		player.x-=player.speed;
		if(time < 20) player.Sprite.src = "img/Player/up_left_walkA.png";
		if(time > 20 && time < 40) player.Sprite.src = "img/Player/up_left_still.png";
		if(time > 40) player.Sprite.src = "img/Player/up_left_walkB.png";
		PlayerSprite = 6;
	} else if(PlayerSprite == 6) {
		player.Sprite.src = "img/Player/up_left_still.png";
	}
	if (up && right) { //up right
		player.y-=player.speed;
		player.x+=player.speed;
		if(time < 20) player.Sprite.src = "img/Player/up_right_walkA.png";
		if(time > 20 && time < 40) player.Sprite.src = "img/Player/up_right_still.png";
		if(time > 40) player.Sprite.src = "img/Player/up_right_walkB.png";
		PlayerSprite = 7;
	} else if(PlayerSprite == 7) {
		player.Sprite.src = "img/Player/up_right_still.png";
	}

	//bee 0 movemend
	norBees[0].y = height / 2;
	if (norBees[0].x >= width) {
		norBees[0].x = 0;
	} else {
		norBees[0].x+=norBees[0].speed;
	}

	if (time < 30) { 
		norBees[0].y+=norBees[0].height;
		norBees[0].Sprite.src = "img/Bee/down_right.png";
	}
	if (time > 30) {
		norBees[0].y-=norBees[0].height;
		norBees[0].Sprite.src = "img/Bee/up_right.png";
	}

	//bee 1 movemend
	norBees[1].y = (height / 2) - 75;
	norBees[1].speed = 2;
	if (norBees[1].x >= width) {
		norBees[1].x = 0;
	} else {
		norBees[1].x+=norBees[1].speed;
	}

	if (time < 30) { 
		norBees[1].y+=norBees[1].height;
		norBees[1].Sprite.src = "img/Bee/up_right.png";
	}
	if (time > 30) {
		norBees[1].y-=norBees[1].height;
		norBees[1].Sprite.src = "img/Bee/down_right.png";
	}

	//bee 2 movemend
	norBees[2].y = (height / 2) + 75;
	norBees[2].speed = 0.5;
	if (norBees[2].x >= width) {
		norBees[2].x = 0;
	} else {
		norBees[2].x+=norBees[2].speed;
	}

	if (time < 30) { 
		norBees[2].y+=norBees[2].height;
		norBees[2].Sprite.src = "img/Bee/up_right.png";
	}
	if (time > 30) {
		norBees[2].y-=norBees[2].height;
		norBees[2].Sprite.src = "img/Bee/down_right.png";
	}

	//player bonds
	if (player.x < 0) player.x = 0;
	if (player.y < 0) player.y = 0;
	if (player.x >= width - player.width) player.x = width - player.width;
	if (player.y >= height - player.height) player.y = height - player.height;

	//flower animation
	if(!gotFlower) {
		flower.Sprite.src = "img/Flower/flower.png";
	}
	if(flowerAni == 0 && gotFlower && time < 15) {
		flower.Sprite.src = "img/Flower/flower_1.png";
		flowerAni++;
	}
	if(flowerAni == 1 && gotFlower && time < 30 && time > 15) {
		flower.Sprite.src = "img/Flower/flower_2.png";
		flowerAni++;
	}
	if(flowerAni == 2 && gotFlower && time < 45 && time > 30) {
		flower.Sprite.src = "img/Flower/flower_3.png";
		flowerAni++;
	}
	if(flowerAni == 3 && gotFlower && time < 60 && time > 45) {
		flower.Sprite.src = "img/Flower/flower_4.png";
		flower.x = Math.floor(Math.random() * width) - 16;
		flower.y = Math.floor(Math.random() * height) - 16;
		gotFlower = false;
		flowerAni = 0;
	}
	
	//player down
	if(playerAni == 0 && playerDown && time < 15) {
		player_down.Sprite.src = "img/Player/Down/down_1.png";
		playerAni++;
	}
	if(playerAni == 1 && playerDown && time < 30 && time > 15) {
		player_down.Sprite.src = "img/Player/Down/down_2.png";
		playerAni++;
	}
	if(playerAni == 2 && playerDown && time < 45 && time > 30) {
		player_down.Sprite.src = "img/Player/Down/down_3.png";
		playerAni++;
	}
	if(playerAni == 3 && playerDown && time < 60 && time > 45) {
		player_down.Sprite.src = "img/Player/Down/down_4.png";
		playerAni++;
	}
	if(playerAni == 4 && playerDown && time < 15) {
		player_down.Sprite.src = "img/Player/Down/down_5.png";
		playerAni++;
	}
	if(playerAni == 5 && playerDown && time < 30 && time > 15) {
		player_down.Sprite.src = "img/Player/Down/down_6.png";
		playerAni++;
	}
	if(playerAni == 6 && playerDown && time < 45 && time > 30) {
		player_down.Sprite.src = "img/Player/Down/down_7.png";
		playerAni++;
	}
	if(playerAni == 7 && playerDown && time < 60 && time > 45) {
		player_down.Sprite.src = "img/Player/Down/down_8.png";
		playerAni = 0;
		playerDown = false;
		if (gameState == 1) gameState = 2;
		player_down.Sprite.src = "img/Player/Down/down_1.png";
	}

	//check collisions
	if (collision(player, flower)) process();
	for (var i = 0; i < norBees.length; i++) {
		if (collision(player, norBees[i])) hit();
	}

}

function render() {

	//clear screen
	context.clearRect(0, 0, width, height);
	
	//canvas bg
	for (var bx = 0; bx < width; bx+=32) {
		for (var by = 0; by < height; by+=32) {
			context.drawImage(bgGame.Sprite, bx, by);
		}
	}
	
	if (gameState == 1) {
	
		if(debug) {
			context.drawImage(box32_player, player.x, player.y);
			context.drawImage(box16, flower.x, flower.y);
		}
	
	//draw player
	if(!playerDown) {
		context.drawImage(player.Sprite, player.x, player.y);
	} else {
		context.drawImage(player_down.Sprite, player.x, player.y);
	}

	//draw frower
	context.drawImage(flower.Sprite, flower.x-8, flower.y-8); //-8 cut image is 32x and hit box is 16x

	//draw bee
	for (var i = 0; i < norBees.length; i++) {
		context.drawImage(norBees[i].Sprite, norBees[i].x, norBees[i].y);
		if(debug) context.drawImage(box32, norBees[i].x, norBees[i].y);
	}

	//draw text
	context.fillStyle = "black";
	context.font = "bold 12px courier";
	context.fillText("Score " + score + " Time " + (60-timeSec) + "." + (60-time), 10, 35);
	context.font = "bold 10px helvetica";
	context.fillText(player.x + " X|Y " + player.y, 10, 15);

	//doc title
	document.title = title + " - Score " + score + " Time " + timeSec + "." + time;

	} else if (gameState == 2) {

		//canvas bg
		context.drawImage(bgGameOver.Sprite, bgGameOver.x, bgGameOver.y);

		var str;
		if (timeSec != 60) {
			str = "You have been hit by a bee!";
		} else {
			str = "Time up!";
		}
		
		playerDown = false; //player down is false

		document.title = title + " - Game Over!";
		context.fillStyle = "black";
		context.font = "bold 16px helvetica";
		centerText(context, str, height / 2 - 64);
		centerText(context, "Thanks for playing! Click to continue", height / 2 - 32);
		centerText(context, "Your score: " + score + " in time " + timeSec + "." + time + " seconds.", height / 2);
		//cookie check
		if (score >= 1) {
			b = parseInt(getCookie("c_scoreTop"));
			if(score > b) {
				setCookie("c_scoreTop", score);
			}
		}

	} else if  (gameState == 0) {
		tileAni++;
		if (tileAni >= 255) tileAni = 0;

		//canvas bg

		context.drawImage(bgTitle.Sprite, bgTitle.x, bgTitle.y);

		document.title = title;
		var top = getCookie("c_scoreTop");
		if(top === null) setCookie("c_scoreTop", 0);

		context.fillStyle = "rgb(255," + tileAni + "," + tileAni + ")"
		context.font = "bold 20px helvetica";
		centerText(context, "Click on the screen!", height / 2);
		context.fillStyle = "rgb(0,0,0)";
		context.fillText("YourTopScore: " + top, 10, height / 12);
	}
	
	var thisFrameFPS = 1000 / ((now=new Date) - lastUpdate);
	if (now!=lastUpdate){
		fps += (thisFrameFPS - fps) / fpsFilter;
		lastUpdate = now;
	}
	
	if (debug) {
		context.font = "bold 12px helvetica";
		context.fillText("  Fps " + fpsFix.toFixed(1), 0, 400);
	}
}

//centers text
function centerText(ctx, text, y) {
	var measurement = ctx.measureText(text);
	var x = (ctx.canvas.width - measurement.width) / 2;
	ctx.fillText(text, x, y);
}

//when player hits flower
function process() {
	if(!gotFlower) {
		score++;
		flower.Sprite.src = "img/Flower/flower_1.png";
	}
	gotFlower = true;
}
//returns true if first colide with second
function collision(first, second) {
	return !(first.x > second.x + second.width ||
		first.x + first.width < second.x ||
		first.y > second.y + second.height ||
		first.y + first.height < second.y);
}

function hit() {
    playerDown = true;
}

//mob`s
function entity(img, x, y, width, height, speed) {
	this.Sprite = new Image();
	this.Sprite.src = img;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.speed = speed;
}

//static img`s like bg`s
function obj(img, x, y, width, height) {
	this.Sprite = new Image();
	this.Sprite.src = img;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}
//render loop
setInterval(function() {
	game();
	render();
}, 1000/30); //30 fps
setInterval(function() {
	fpsFix = fps;
}, 1000); //remember fps every second
setInterval(function() {
	update();
}, 1000/60); //update game logic 1000/60

//Game Timer
setInterval(function() {
	if (gameState == 1) timer();
}, 1000/60); //60 fps timer

function timer() {
	time++;
	if (time >= 60) timeSec++;
	if (time >= 60) time = 0;
}