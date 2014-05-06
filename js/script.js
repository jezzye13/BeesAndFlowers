var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");

var keys = [];

var width = canvas.width;
var height = canvas.height;
var score = 0;
var time = 0;
var timeSec = 0;
var tileAni = 0;
var gameState = 0; //0 = title screen 1 = game 2 = game over
var title = "Bee and Flower BETA v1.3" //title
var b; //temp cookie read var

console.log(title+" | width: "+width+" | height: "+height+" | Please don`t try to cheat");

//entities
var player = new entity("img/entity_player_up.png", width / 2, 10, 32, 43, 3);
var flower = new entity("img/entity_flower.png", Math.random() * width - 20, Math.random() * height - 20, 32, 32, 0);

//load the sprites
player.Sprite.src = "img/entity_player_up.png";
player.Sprite.src = "img/entity_player_down.png";
player.Sprite.src = "img/entity_player_left.png";
player.Sprite.src = "img/entity_player_right.png";

var bgTitle = new obj("img/bgTitle.png",0,0,0,0); //gs 0
var bgGame = new obj("img/grass.png",0,0,0,0); //gs 1
var bgGameOver = new obj("img/bgGameOver.png",0,0,0,0); //gs 2

var norBees = new Array();
for (var i = 0; i < 3; i++) {
	norBees[i] = new entity("img/entity_bee.png", 0, 0, 32, 32, 1);
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
*/

function game() {
	if (timeSec >= 60 && gameState == 1) {
		gameState = 2;
	}
}

function update() {

	//player input movemend
	if (keys[38] || keys[87]) player.y-=player.speed;
	if (keys[40] || keys[83]) player.y+=player.speed;
	if (keys[37] || keys[65]) player.x-=player.speed;
	if (keys[39] || keys[68]) player.x+=player.speed;

	//player sprites
	if (keys[38] || keys[87]) player.Sprite.src = "img/entity_player_up.png";
	if (keys[40] || keys[83]) player.Sprite.src = "img/entity_player_down.png";
	if (keys[37] || keys[65]) player.Sprite.src = "img/entity_player_left.png";
	if (keys[39] || keys[68]) player.Sprite.src = "img/entity_player_right.png";


	//bee 0 movemend

	norBees[0].y = height / 2;
	if (norBees[0].x >= width) {
		norBees[0].x = 0;
	} else {
		norBees[0].x+=norBees[0].speed;
	}



	if (time < 30) norBees[0].y+=norBees[0].height;
	if (time > 30) norBees[0].y-=norBees[0].height;

	

	//bee 1 movemend

	norBees[1].y = (height / 2) - 75;
	norBees[1].speed = 2;
	if (norBees[1].x >= width) {
		norBees[1].x = 0;
	} else {
		norBees[1].x+=norBees[1].speed;
	}



	if (time < 30) norBees[1].y+=norBees[1].height;
	if (time > 30) norBees[1].y-=norBees[1].height;

	//bee 2 movemend
	norBees[2].y = (height / 2) + 75;
	norBees[2].speed = 0.5;
	if (norBees[2].x >= width) {
		norBees[2].x = 0;
	} else {
		norBees[2].x+=norBees[2].speed;
	}



	if (time < 30) norBees[2].y+=norBees[2].height;
	if (time > 30) norBees[2].y-=norBees[2].height;


	//player bonds
	if (player.x < 0) player.x = 0;
	if (player.y < 0) player.y = 0;
	if (player.x >= width - player.width) player.x = width - player.width;
	if (player.y >= height - player.height) player.y = height - player.height;



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
	//draw player
	context.drawImage(player.Sprite, player.x, player.y);

	//draw frower
	context.drawImage(flower.Sprite, flower.x, flower.y);

	//draw bee
	for (var i = 0; i < norBees.length; i++) {
		context.drawImage(norBees[i].Sprite, norBees[i].x, norBees[i].y);
	}

	//draw text
	context.fillStyle = "black";
	context.font = "bold 12px helvetica";
	context.fillText("Score " + score + " Time " + timeSec + "." + time, 10, 35);
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


	} else if (gameState == 0) {
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
		

	} else {

	}

}
//centers text
function centerText(ctx, text, y) {
	var measurement = ctx.measureText(text);
	var x = (ctx.canvas.width - measurement.width) / 2;
	ctx.fillText(text, x, y);
}
//moves the flower
function process() {
	score++;
	flower.x = Math.random() * width - 20;
	flower.y = Math.random() * height - 20;
}
//returns true if first colide with second
function collision(first, second) {
	return !(first.x > second.x + second.width ||
		first.x + first.width < second.x ||
		first.y > second.y + second.height ||
		first.y + first.height < second.y);
}

function hit() {
	if (gameState == 1) gameState = 2;
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

setInterval(function() {
	game();
}, 1000/60); //60 fps
setInterval(function() {
	render();
}, 1000/60); //60 fps
setInterval(function() {
	update();
}, 1000/60); //60 fps

//Game Timer
setInterval(function() {
	if (gameState == 1) timer();
}, 1000/60); //60 fps timer

function timer() {
	time++;
	if (time >= 60) timeSec++;
	if (time >= 60) time = 0;
}