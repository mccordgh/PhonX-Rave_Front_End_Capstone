var GAME_WIDTH = 450;
var GAME_HEIGHT = 700;
// Game Variables
var game;
var lasers_K_;
var lasers_L_;
var lasers_J_;
var X_cord;
var j_TouchDown = false;
var k_TouchDown = false;
var l_TouchDown = false;
var currentHighStreak = 0;
var currentStreak = 0;
var multiplier = 1;
var applauseId = 0;
var applauseCounter = 0;
var booCounter = 0;
var multiplierFontSize = 35;
var playerScore = 0;
var audio_Bg;
var audio_Melody;
var audio_applause;
var audio_boo;
var fadeOutCheck = false;
var button;
var resetLaserObject;

// Create a Phaser game instance
function createGame() {
	game = new Phaser.Game(
		GAME_WIDTH,
		GAME_HEIGHT,
		Phaser.AUTO,
		'game_container',
		{ preload: preload, create: create, update: update, init: init, render: render }
	);
}

// Preload assets
function preload() {
	// Load background image
	game.load.image('background', './app/img/assets/Background.png');
	// Load text image
	game.load.bitmapFont('desyrel', './app/img/assets/desyrel.png', './app/img/assets/desyrel.xml');
	// Load note image
	var dir = 'app/img/assets/';
	game.load.image('laser1', dir + 'J_image.png');
	game.load.image('laser2', dir + 'K_image.png');
	game.load.image('laser3', dir + 'L_image.png');
	game.load.image('successNote', dir + 'fireball2.png');
	game.load.image('successNoteK', dir + 'fireball2.png');
	game.load.image('successNoteL', dir + 'fireball2.png');
	game.load.image('button', './app/img/assets/start.png');
	game.load.image('ScoreBG', './app/img/assets/ScoreBG.png');
}
var scoreText;
var multiplierText;

function init() {
	// Listen to space & enter keys
	var keys = [Phaser.KeyCode.J, Phaser.KeyCode.K, Phaser.KeyCode.L];
	// Create Phaser.Key objects for listening to the state
	phaserKeys = game.input.keyboard.addKeys(keys);
	// Capture these keys to stop the browser from receiving this event
	game.input.keyboard.addKeyCapture(keys);
}

// Assets are available in create
function create() {

	game.add.image(game.world.centerX, game.world.centerY, 'background').anchor.set(0.5);
	// Image for the score to sit on top of
	var ScoreBG = game.add.image(-110, -5, 'ScoreBG');
	ScoreBG.scale.setTo(1.3,1.3);
	// Create the game score and multiplier
	scoreText = game.add.bitmapText(112, 25, 'desyrel','Phaser & Pixi \nrocking!', 44);
	multiplierText = game.add.bitmapText(112, 75, 'desyrel','Phaser & Pixi \nrocking!', multiplierFontSize);
	// Create the group using the group factory
	lasers_K_ = game.add.group();
	lasers_L_ = game.add.group();
	lasers_J_ = game.add.group();
	// To move the sprites later on, we have to enable the body
	lasers_K_.enableBody = true;
	lasers_L_.enableBody = true;
	lasers_J_.enableBody = true;
	// Set the body type to the ARCADE physics, since we don't need any advanced physics
	lasers_K_.physicsBodyType = Phaser.Physics.ARCADE;
	lasers_L_.physicsBodyType = Phaser.Physics.ARCADE;
	lasers_J_.physicsBodyType = Phaser.Physics.ARCADE;

	/*
		This will create 20 sprites and add it to the stage. They're inactive and invisible, but they're there for later use.
		We only have 20 laser bullets available, and will 'clean' and reset they're off the screen.
		This way we save on precious resources by not constantly adding & removing new sprites to the stage
	*/

	lasers_K_.createMultiple(90, 'laser1');
	lasers_L_.createMultiple(90, 'laser2');
	lasers_J_.createMultiple(90, 'laser3');
	lasers_K_.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetLaser);
	lasers_L_.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetLaser);
	lasers_J_.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetLaser);
	// Same as above, set the anchor of every sprite to 0.5, 1.0
	lasers_K_.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
	lasers_L_.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
	lasers_J_.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
	// This will set 'checkWorldBounds' to true on all sprites in the group
	lasers_K_.setAll('checkWorldBounds', true);
	lasers_L_.setAll('checkWorldBounds', true);
	lasers_J_.setAll('checkWorldBounds', true);

	button = game.add.button(game.world.centerX - 190, 240, 'button', startGame, this, 2, 1, 0);
}

// Start Game
function startGame () {
				// TEST LASERS
				fire_K_Laser();
				setTimeout(function() { fire_K_Laser(); }, 1000);
				setTimeout(function() { fire_L_Laser(); }, 2000);
				setTimeout(function() { fire_L_Laser(); }, 3000);
				setTimeout(function() { fire_J_Laser(); }, 4000);
				setTimeout(function() { fire_J_Laser(); }, 5000);
	// Remove the start button
	button.kill();
	// button.alpha = 1;
	// game.add.tween(button).to( { alpha: 1 }, 400, Phaser.Easing.Linear.None, true, 0, 200, true);
	// setTimeout(function() { button.kill(); }, 800);

	// Load audio
	audio_Bg = new Audio("./app/audio/Zionexx_Guitar_Hero.wav");
	audio_Melody = new Audio("./app/audio/Zionexx_Guitar_Hero_Melody.wav");
	audio_Wrong_Note1 = new Audio("./app/audio/missedNotes/Missed_Note1.wav");
	audio_Wrong_Note2 = new Audio("./app/audio/missedNotes/Missed_Note2.wav");
	audio_Wrong_Note3 = new Audio("./app/audio/missedNotes/Missed_Note3.wav");
	audio_Wrong_Note4 = new Audio("./app/audio/missedNotes/Missed_Note4.wav");
	audio_boo = new Audio("./app/audio/boo.wav");
	audio_applause = new Audio("./app/audio/applause.wav");
	audio_Wrong_Note1.volume = 0.25;
	audio_Wrong_Note2.volume = 0.25;
	audio_Wrong_Note3.volume = 0.25;
	audio_Wrong_Note4.volume = 0.25;
	audio_applause.volume = 0.6;
	// Play audio
	audio_Melody.oncanplaythrough = function(){
		setTimeout(function() {
			audio_Bg.play();
			audio_Melody.play();
		}, 325);
	}
	// Launch Notes
	fireSong();
}

// Update
function update() {
	// Update the score based on the users points
	scoreText.setText('Score:' + playerScore);
	multiplierText.setText('Multiplier: X' + multiplier);
	// Loop over the keys to detect if it has been clicked
	for (var index in phaserKeys) {
		// Save a reference to the current key
		var key = phaserKeys[index];
		// Check all key presses
		if (key.justDown) {
			// Check the key that was pressed and the position of the note
			// Calculate score with the current note
			if (key.keyCode === 74) {
				calScore(lasers_K_);
				// checkWrongNote(lasers_K_);
			};
			if (key.keyCode === 75) {
				calScore(lasers_L_);
				// checkWrongNote(lasers_L_);
			};
			if (key.keyCode === 76) {
				calScore(lasers_J_);
				// checkWrongNote(lasers_J_);
			};
		}
	}
}

// Mute audio on missed notes
function mute_song(){
	audio_Melody.muted = true;
}

// function to fade out audio
function audioFadeOut(currSong) {
	// check this statement so that this function will only fire once
	if (fadeOutCheck === true) {
		return;
	};
	fadeOutCheck = true;
	var vol = .6;
	var fadeout = setInterval(
	  function() {
      vol -= 0.025;
	    if (vol > 0) {currSong.volume = vol;}
	    else {
	    	// rest the volume of the cheering for next streak
	    	vol = .6;
		    currSong.pause();
		    currSong.currentTime = 0;
		    currSong.volume = vol;
		    console.log("go");
		    clearInterval(fadeout);
		    fadeOutCheck = false;
	    }
	  }, 200);
}

// Reset laser when the laser goes out of bounds (missed a note)
function resetLaser(laser, wrongNoteCheck) {
	// console.log("laser", laser);
	multiplier = 1;
	// check for the number of missed notes and fire boo audio
	booCounter--;
	if (booCounter === -10) {
		// visual effects for missed notes
		$("#game_container").addClass("MULTImissedNoteBoarder");
		audio_boo.play();
	};
	// mute the applause
	if (!audio_applause.paused) {
		audioFadeOut(audio_applause);
	};
	// Save the highest streak for the current game
	if (currentStreak > currentHighStreak) {
		currentHighStreak = currentStreak;
		console.log("currentHighStreak", currentHighStreak);
	};
	// Reset currentStreak
	currentStreak = 0;
	// Animate the page on missed and wrong notes
	$("#game_container").addClass("missedNoteBoarder");
	setTimeout(function() { $("#game_container").removeClass("missedNoteBoarder"); }, 50);

	// Check for wrong note and not just missing a note
	if (wrongNoteCheck !== false) {
		// Mute song as if you weren't playing
		mute_song();
		// remove the note from the page
		laser.destroy();
	};
}

function dealWithCorrectNotes(thisNote) {
	booCounter = 0;
	calmultiplyer();
	// Add to currentStreak
	currentStreak++
	// Enable music for correct notes
	audio_Melody.muted = false;
	// Kill the note so it doesn't go out of bounds
	thisNote.destroy();
	// remove missed not visual
	$("#game_container").removeClass("MULTImissedNoteBoarder");
}

// Calculate Multiplier
function calmultiplyer() {
	switch (true) {
		case (currentStreak < 10):
			// reset applauseId and counter
			applauseCounter = 0;
			applauseId = 0;
			multiplier = 1;
			break;
		case (currentStreak >= 10 && currentStreak < 20):
			multiplier = 2;
			break;
		case (currentStreak >= 20 && currentStreak < 30):
			multiplier = 4;
			break;
		case (currentStreak >= 30 && currentStreak < 40):
			multiplier = 6;
			break;
		case (currentStreak >= 40):
			multiplier = 8;
			applauseCounter++;
			// Check how well the player is doing and give them applause
			if (applauseCounter > 40 && applauseId === 0) {
				// add to applauseId so it doesn't play multiple times
				applauseId++;
				// play applause sound sample
				audio_applause.play();
			};
			break;
	}
}

function addCorrectNoteAnimation(curNote, Xcor) {
	// Create fireball image
	var correctNoteFireIMG = game.add.image(X_cord, 565, 'successNote');
	correctNoteFireIMG.scale.setTo(0.15, 0.15);
	correctNoteFireIMG.alpha = 0;
	game.add.tween(correctNoteFireIMG).to( { alpha: 1 }, 150, Phaser.Easing.Linear.None, true, 0, 75, true);
	setTimeout(function() { correctNoteFireIMG.kill(); }, 300);
	var exitNum = 0;
	var scale = 0.15;
	var scaleUp = setInterval(
	  function() {
	  	exitNum++;
	  	if (exitNum > 1000) {
	  		clearInterval(scaleUp);
	  	};
      scale += 0.005;
	    correctNoteFireIMG.scale.setTo(scale, scale);
	  }, 20);
}

// Calculate Score
function calScore(curNote) {
	var didHit = false;
	for (var i = 0; i < curNote.children.length; i++) {
		// Check the position of the note
		if (curNote.children[i].y > GAME_HEIGHT - 75 && curNote.children[i].y < GAME_HEIGHT - 25) {
			// Define X_cord for the use of placing the fireball correctly
			X_cord = curNote.children[i].x - 45;
			// Add to score
			playerScore += (50 * multiplier);
			didHit = true;
			// Fire the function to add points and add animations
			dealWithCorrectNotes(curNote.children[i]);
			addCorrectNoteAnimation(curNote, curNote.children[i]);
		} else if (curNote.children[i].y > GAME_HEIGHT - 100 && curNote.children[i].y < GAME_HEIGHT) {
			X_cord = curNote.children[i].x - 45;
			playerScore += (25 * multiplier);
			didHit = true;
			dealWithCorrectNotes(curNote.children[i]);
			addCorrectNoteAnimation(curNote, X_cord);
		};
	};
	// Deal with playing the wrong note
	if (didHit === false) {
		var random = Math.random();
		// Play wrong note sound
		switch (true) {
			case (random < 0.25):
				audio_Wrong_Note1.play();
				break;
			case (random >= 0.25 && random < 0.5):
				audio_Wrong_Note2.play();
				break;
			case (random >= 0.5 && random < 0.75):
				audio_Wrong_Note3.play();
				break;
			case (random >= 0.75):
				audio_Wrong_Note4.play();
				break;
		};
		resetLaser(curNote, false);
		console.log("you played the wrong note");
	};
}

// function to scale the note as it moves down the page
function scaleNote(curNote) {
	var exitNum = 0;
	var scale = 0.05;
	var scaleUp = setInterval(
	  function() {
	  	exitNum++;
	  	if (exitNum > 1000) {
	  		clearInterval(scaleUp);
	  	};
      scale += 0.002;
	    curNote.scale.setTo(scale, scale);
	  }, 20);
};

function fire_K_Laser() {
	// Get the first laser that's inactive, by passing 'false' as a parameter
	var laser = lasers_L_.getFirstExists(false);
	// scale note as it goes down the page
	laser.scale.setTo(0.05, 0.05);
	scaleNote(laser);
	if (laser) {
		// If we have a laser, set it to the starting position
		laser.reset(228, 230);
		// Give it a velocity of 500 so it starts moving
		laser.body.velocity.y = 300;
	}
}
function fire_J_Laser() {
	var laser = lasers_K_.getFirstExists(false);
	laser.scale.setTo(0.05, 0.05);
	laser.angle = 3;
	scaleNote(laser);
	if (laser) {
		laser.reset(205, 230);
		laser.body.velocity.y = 300;
		laser.body.velocity.x = -85;
	}
}
function fire_L_Laser() {
	var laser = lasers_J_.getFirstExists(false);
	laser.scale.setTo(0.05, 0.05);
	laser.angle = -3;
	scaleNote(laser);
	if (laser) {
		laser.reset(250, 230);
		laser.body.velocity.y = 300;
		laser.body.velocity.x = 85;
	}
}


// Render some debug text on screen
function render() {}






