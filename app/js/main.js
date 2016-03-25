var GAME_WIDTH = 450;
var GAME_HEIGHT = 700;
// Game Variables
var game;
var lasersBlue;
var lasersRed;
var lasersGreen;
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
	// Load text image
	game.load.bitmapFont('desyrel', './app/img/assets/desyrel.png', './app/img/assets/desyrel.xml');
	// Load note image
	var dir = 'app/img/assets/';
	game.load.image('laser', dir + 'laserBlue02.png');
	game.load.image('button', './app/img/assets/start.png');
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
	// Create the game score and multiplier
	scoreText = game.add.bitmapText(100, 50, 'desyrel','Phaser & Pixi \nrocking!', 44);
	multiplierText = game.add.bitmapText(100, 100, 'desyrel','Phaser & Pixi \nrocking!', multiplierFontSize);
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

	button = game.add.button(game.world.centerX - 185, 40, 'button', startGame, this, 2, 1, 0);
}

// Function to post score to Firebase
function postScore(score, streak) {
	var streakToPost = streak;
	if (currentStreak > currentHighStreak) {
		streakToPost = currentStreak;
	};
	// Get access to current player info in firebase
  $.ajax({
    url: "https://phonx-rave.firebaseio.com/Players/.json",
    method: "GET"
  }).done(function(playerList) {
  	// Get access to crrent player highScore
  	console.log("currentPlayerUID", currentPlayerUID);
  	// Loop through all players
    for (variable in playerList) {
    	// Check for current player
    	if (playerList[variable].playerId === currentPlayerUID) {
		    // If score is greater than the stored data, replace the high score
		    if (score > playerList[variable].highScore) {
				  var userScoreRef = new Firebase(`https://phonx-rave.firebaseio.com/Players/${variable}`);
				  // Modify the 'first' and 'last' children, but leave other data at userScoreRef unchanged
				  userScoreRef.update({ highScore: score});
		    }
		    // If longest streakToPost is greater than the stored data, replace the longest streak
		    if (streakToPost > playerList[variable].longestStreak) {
				  var userStreakRef = new Firebase(`https://phonx-rave.firebaseio.com/Players/${variable}`);
				  // Modify the 'first' and 'last' children, but leave other data at userStreakRef unchanged
				  userStreakRef.update({ longestStreak: streakToPost});
		    }
    	}
		}
  })
}

// Start Game
function startGame () {
	// Load audio
	button.kill();
	audio_Bg = new Audio("./app/audio/Zionexx_Guitar_Hero.wav");
	audio_Melody = new Audio("./app/audio/Zionexx_Guitar_Hero_Melody.wav");
	audio_applause = new Audio("./app/audio/applause.wav");
	audio_applause.volume = 0.6;
	audio_boo = new Audio("./app/audio/boo.wav");
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
				calScore(lasersBlue);
			};
			if (key.keyCode === 75) {
				calScore(lasersRed);
			};
			if (key.keyCode === 76) {
				calScore(lasersGreen);
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
function resetLaser(laser) {
	multiplier = 1;
	// check for the number of missed notes and fire boo audio
	booCounter--;
	if (booCounter === -10) {
		audio_boo.play();
	};
	// mute the applause
	if (!audio_applause.paused) {
		audioFadeOut(audio_applause);
	};
	// remove the note from the page
	laser.kill();
	mute_song();
	// Save the highest streak for the current game
	if (currentStreak > currentHighStreak) {
		currentHighStreak = currentStreak;
		console.log("currentHighStreak", currentHighStreak);
	};
	// Reset currentStreak
	currentStreak = 0;
}


function dealWithCorrectNotes(thisNote) {
	booCounter = 0;
	calmultiplyer();
	// Add to currentStreak
	currentStreak++
	// Enable music for correct notes
	audio_Melody.muted = false;
	// Kill the note so it doesn't go out of bounds
	thisNote.kill();
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

// Calculate Score
function calScore(curNote) {
	for (var i = 0; i < curNote.children.length; i++) {
		// Check the position of the note
		if (curNote.children[i].y > GAME_HEIGHT - 75 && curNote.children[i].y < GAME_HEIGHT - 25) {
			playerScore += (50 * multiplier);
			dealWithCorrectNotes(curNote.children[i]);
		} else if (curNote.children[i].y > GAME_HEIGHT - 100 && curNote.children[i].y < GAME_HEIGHT) {
			playerScore += (25 * multiplier);console.log("playerScore", playerScore);
			dealWithCorrectNotes(curNote.children[i]);
		}
	};
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

// Render some debug text on screen
function render() {}






