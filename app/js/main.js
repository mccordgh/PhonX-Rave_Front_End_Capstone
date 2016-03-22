var GAME_WIDTH = 450;
var GAME_HEIGHT = 700;

//Game Variables
// var ship;
var lasersBlue;
var lasersRed;
var lasersGreen;
var mouseTouchDown = false;
var j_TouchDown = false;
var k_TouchDown = false;
var l_TouchDown = false;
var laserArray = [];
var playerScore = 0;
var game;

// Create a Phaser game instance
function createGame() {
	game = new Phaser.Game(
		GAME_WIDTH,
		GAME_HEIGHT,
		Phaser.AUTO,
		'container',
		{ preload: preload, create: create, update: update, init: init, render: render }
	);
}

// Preload assets
function preload() {
	var dir = 'app/img/assets/';
	game.load.image('laser', dir + 'laserBlue02.png');
}

// Init
function init() {
	// Listen to j key
	var keys = [Phaser.KeyCode.SPACEBAR, Phaser.KeyCode.ENTER];
	// Create Phaser.Key objects for listening to the state
	phaserKeys = game.input.keyboard.addKeys(keys);
	// Capture these keys to stop the browser from receiving this event
	game.input.keyboard.addKeyCapture(keys);
}

// Assets are available in create
function create() {
	// Create the group using the group factory
	lasersBlue = game.add.group();
	lasersRed = game.add.group();
	lasersGreen = game.add.group();
	// To move the sprites later on, we have to enable the body
	lasersBlue.enableBody = true;
	lasersRed.enableBody = true;
	lasersGreen.enableBody = true;
	// We're going to set the body type to the ARCADE physics, since we don't need any advanced physics
	lasersBlue.physicsBodyType = Phaser.Physics.ARCADE;
	lasersRed.physicsBodyType = Phaser.Physics.ARCADE;
	lasersGreen.physicsBodyType = Phaser.Physics.ARCADE;

	/*
		This will create 20 sprites and add it to the stage. They're inactive and invisible, but they're there for later use.
		We only have 20 laser bullets available, and will 'clean' and reset they're off the screen.
		This way we save on precious resources by not constantly adding & removing new sprites to the stage
	*/

	lasersBlue.createMultiple(20, 'laser');
	lasersRed.createMultiple(20, 'laser');
	lasersGreen.createMultiple(20, 'laser');
	lasersBlue.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetLaser);
	lasersRed.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetLaser);
	lasersGreen.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetLaser);
	// Same as above, set the anchor of every sprite to 0.5, 1.0
	lasersBlue.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
	lasersRed.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
	lasersGreen.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
	// This will set 'checkWorldBounds' to true on all sprites in the group
	lasersBlue.setAll('checkWorldBounds', true);
	lasersRed.setAll('checkWorldBounds', true);
	lasersGreen.setAll('checkWorldBounds', true);

	button = game.add.button(game.world.centerX - 95, 400, 'button', startGame, this, 2, 1, 0);

}


// Start Game
function startGame () {
	// Load audio
	var audio = new Audio("app/Slime - Zionexx (PhonX Remix).mp3");
	// Play audio
	audio.oncanplaythrough = function(){
		setTimeout(function() { audio.play(); }, 325);
	}
	// Launch Notes
	fireSong()
}

function resetLaser(laser) {
	laser.kill();
}


function init() {
	// Listen to space & enter keys
	var keys = [Phaser.KeyCode.J, Phaser.KeyCode.K, Phaser.KeyCode.L];
	// Create Phaser.Key objects for listening to the state
	phaserKeys = game.input.keyboard.addKeys(keys);
	// Capture these keys to stop the browser from receiving this event
	game.input.keyboard.addKeyCapture(keys);
}


// Update
function update() {

	// Loop over the keys
	for (var index in phaserKeys) {
		// Save a reference to the current key
		var key = phaserKeys[index];
		// Check all key presses
		if (key.justDown) {
			// Check the key that was pressed and the position of the note
			// Calculate score with the current note
			if (key.keyCode === 74) {
				console.log("captured j");
				calScore(lasersBlue);
			};
			if (key.keyCode === 75) {
				console.log("captured k");
				calScore(lasersRed);
			};
			if (key.keyCode === 76) {
				console.log("captured l");
				calScore(lasersGreen);
			};
		}
	}

	// Game.input.activePointer is either the first finger touched, or the mouse
	if (game.input.activePointer.isDown) {
		// We'll manually keep track if the pointer wasn't already down
		if (!mouseTouchDown) {
			touchDown();
		}
	} else {
		if (mouseTouchDown) {
			touchUp();
		}
	}
}

// Calculate Score
function calScore(curNote) {
	for (var i = 0; i < curNote.children.length; i++) {
		// Check the position of the note
		if (curNote.children[i].y > GAME_HEIGHT - 75 && curNote.children[i].y < GAME_HEIGHT - 25) {
			console.log("curNote", curNote);
			playerScore += 50;
			console.log("playerScore", playerScore);
		} else if (curNote.children[i].y > GAME_HEIGHT - 100 && curNote.children[i].y < GAME_HEIGHT) {
			console.log("curNote", curNote);
			playerScore += 25;
			console.log("playerScore", playerScore);
		}
	};
}

function touchDown() {
	// Set touchDown to true, so we only trigger this once
	mouseTouchDown = true;
	console.log("lasersBlue.children", lasersBlue.children);
	for (var i = 0; i < lasersBlue.children.length; i++) {
		if (lasersBlue.children[i].y > GAME_HEIGHT - 50 && lasersBlue.children[i].y < GAME_HEIGHT) {
			console.log("fuck ya");
		};
	};
}

function touchUp() {
	// Set touchDown to false, so we can trigger touchDown on the next click

	mouseTouchDown = false;
}

function fireBlueLaser() {
	// Get the first laser that's inactive, by passing 'false' as a parameter
	var laser = lasersRed.getFirstExists(false);
	if (laser) {
		// If we have a laser, set it to the starting position
		laser.reset(200, 0);
		// Give it a velocity of -500 so it starts shooting
		laser.body.velocity.y = 500;
	}
}
function fireGreenLaser() {
	// Get the first laser that's inactive, by passing 'false' as a parameter
	var laser = lasersBlue.getFirstExists(false);
	if (laser) {
		// If we have a laser, set it to the starting position
		laser.reset(50, 0);
		// Give it a velocity of -500 so it starts shooting
		laser.body.velocity.y = 500;
	}
}
function fireRedLaser() {
	// Get the first laser that's inactive, by passing 'false' as a parameter
	var laser = lasersGreen.getFirstExists(false);
	if (laser) {
		// If we have a laser, set it to the starting position
		laser.reset(400, 0);
		// Give it a velocity of -500 so it starts shooting
		laser.body.velocity.y = 500;
	}
}


// Song Notes //

// setTimeout(function() { fireBlueLaser(); }, 500);
// setTimeout(function() { fireRedLaser(); }, 1000);
// setTimeout(function() { fireGreenLaser(); }, 3000);


// function update() {
//  // Check for the click to the falling item
//  game.physics.arcade.collide(player, candyGroup, clickCandy, null, this);
// }


// Render some debug text on screen
function render() {
  // game.debug.text('CodeCaptain Shooting Demo', 10, 30);
  // game.debug.text('Click or press space / enter to shoot', 10, 55);
}