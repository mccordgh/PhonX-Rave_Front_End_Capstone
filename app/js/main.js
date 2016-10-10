// Start Game
function startGame () {
	gameStartTimeStamp = Date.now();
	console.log("gameStartTimeStamp", gameStartTimeStamp);
				// // TEST LASERS
				// fire_K_Laser();
				// setTimeout(function() { fire_K_Laser(); }, 1000);
				// setTimeout(function() { fire_L_Laser(); }, 2000);
				// setTimeout(function() { fire_L_Laser(); }, 3000);
				// setTimeout(function() { fire_J_Laser(); }, 4000);
				// setTimeout(function() { fire_J_Laser(); }, 5000);
	// Remove the start button
	button.kill();
	// Animate a new image of the star button
	var StartFadeOutIMG = game.add.image(50, 200, 'button');
	StartFadeOutIMG.scale.setTo(1, 1);
	StartFadeOutIMG.alpha = 0;
	game.add.tween(StartFadeOutIMG).to( { alpha: 1 }, 150, Phaser.Easing.Linear.None, true, 0, 75, true);
	setTimeout(function() { StartFadeOutIMG.kill(); }, 300);
	// Variables for the image function
	var exitNum = 0;
	var scale = 1;
	// Start Button animation
	var scaleUp = setInterval(
	  function() {
	  // 	if (pauseGame === true) {
			// 	clearInterval(scaleUp);
			// };
	  	exitNum++;
	  	if (exitNum > 1000) {
	  		clearInterval(scaleUp);
	  	};
      scale += 0.2;
	    StartFadeOutIMG.scale.setTo(scale, scale);
	    StartFadeOutIMG.x -= 40;
	    StartFadeOutIMG.y -= 30;
	  }, 20);

	// Load audio
	audio_Wrong_Note1 = new Audio("./app/audio/missedNotes/Missed_Note11.wav");
	audio_Wrong_Note2 = new Audio("./app/audio/missedNotes/Missed_Note22.wav");
	audio_Wrong_Note3 = new Audio("./app/audio/missedNotes/Missed_Note33.wav");
	audio_Wrong_Note4 = new Audio("./app/audio/missedNotes/Missed_Note44.wav");
	spExplosion = new Audio("./app/audio/explosion2.wav");
	audio_boo = new Audio("./app/audio/boo.wav");
	audio_applause = new Audio("./app/audio/applause.wav");
	audio_applause2 = new Audio("./app/audio/applause.wav");
	audio_applause3 = new Audio("./app/audio/applause.wav");
	spExplosion.volume = 0.3;
	audio_Wrong_Note1.volume = 0.4;
	audio_Wrong_Note2.volume = 0.4;
	audio_Wrong_Note3.volume = 0.4;
	audio_Wrong_Note4.volume = 0.4;
	audio_applause.volume = 0.5;
	audio_applause2.volume = 0.7;
	audio_applause3.volume = 0.4;

	// Play audio and fire notes for appropriate song
	if (chosenSong === "Slime") {
		setTimeout(function() {
			// Play main audio
			audio_Melody_Slime.muted = false;
			audio_Bg_Slime.play();
			audio_Melody_Slime.play();
			// Fire laser notes
		}, 425);
		fireSlime();
	} else if (chosenSong === "I_Want_You") {
		// Play main audio
		audio_Melody_P66.muted = false;
		audio_Bg_P66.play();
		audio_Melody_P66.play();
		// Fire laser notes
		setTimeout(function() {
			firePioneer_66();
		}, 300);
	} else if (chosenSong === "Fade") {
		// Play main audio
		setTimeout(function() {
			audio_Melody_Fade.muted = false;
			audio_Bg_Fade.play();
			audio_Melody_Fade.play();
		}, 500);
		// Fire laser notes
		for (var i = 0; i < fadeTimingEvents.length; i++) {
	    if (fadeTimingEvents[i].difficulty === difficulty) {
        currentSongNotesToFire = fadeTimingEvents[i];
        console.log("currentSongNotesToFire", currentSongNotesToFire);
	    };
		};
		fireFade();
	}
}

// Update: runs multiple times a second
function update() {
	// Update the score based on the users points
	scoreText.setText('Score:' + playerScore);
	multiplierText.setText('Multiplier:');
	multiplierNumber.setText(`X ${multiplier}`);
	// Loop over the keys to detect if it has been clicked
	for (var index in phaserKeys) {
		// Save a reference to the current key
		var key = phaserKeys[index];
		// Check all key presses
		if (key.justDown) {
			// Check the key that was pressed and the position of the note
			// Calculate score with the current note
			if (key.keyCode === 32) {
				// Star Power activator
				activateStarPower();
			};
			if (key.keyCode === 74) {
				calScore(lasers_K_);
			};
			if (key.keyCode === 75) {
				calScore(lasers_L_);
			};
			if (key.keyCode === 76) {
				calScore(lasers_J_);
			};
			if (key.keyCode === 13) {
				pauseGame();
			};
		}
	}
	// Create a random number to utilize for shake animation
	// var shakeNum = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
	var shakeNum = Math.floor(Math.random() * 5);
	if (multiplier > 8) {
		// Shake the multiplier
		multiplierNumber.x = 273 + shakeNum;
		multiplierNumber.y = 72 + shakeNum;
	} else {
		// Keep the multiplier still
		multiplierNumber.x = 275;
		multiplierNumber.y = 74;
	}
	// Check to see if star power is full
	if (starPower === 300) {
		// this is used to fire the space bar image to indicate to the user they have starpower
		if (firstTimeSpaceBarFlag === true) {
			firstTimeSpaceBarFlag = false
			spaceBarIndicator();
		}
		// animate the star bar by randomizing the x and y coordinates
		starPowerBarIMG.x = 48 + shakeNum;
		starPowerBarIMG.y = 278 + shakeNum;
		starPowerBarMeterIMG.x = -37 + shakeNum;
		starPowerBarMeterIMG.y = 252 + shakeNum;
		PFMimg.x = 18 + shakeNum;
		PFMimg.y = 198 + shakeNum;
	} else {
		// Keep the image in the correct place if the bar isn't full
		starPowerBarIMG.x = 50;
		starPowerBarIMG.y = 280;
		starPowerBarMeterIMG.x = -35;
		starPowerBarMeterIMG.y = 254;
		PFMimg.x = 20;
		PFMimg.y = 200;
	}
	// Update the Star Power Background with the updated crop amount
	cropDimensions.height = 160 - (starPower/2 + 12);
	starPowerBarIMG.crop(cropDimensions);
}

function pauseGame(){
	// if the game is not paused, pause it
	if (gameIsPaused === false) {
		gameStartTimeStamp = Date.now();
		console.log("pause", gameStartTimeStamp);
		gameIsPaused = true;
		audio_Bg_Fade.pause();
		audio_Melody_Fade.pause();
		clearInterval(intId);
	} else { // unpause the game
		console.log("unpause");
		fireFade();
		audio_Bg_Fade.play();
		audio_Melody_Fade.play();
		gameIsPaused = false;
	}
}

//Fire the this function to create spacebar image so the user knows they have starpower.
function spaceBarIndicator(){
	function animateLoop() {
		var spaceBarAnimation = game.add.image(100, 540, 'spaceBar');
		spaceBarAnimation.scale.setTo(.5, .5);

		setTimeout (function animate () {
			spaceBarAnimation.alpha = 0;
			game.add.tween(spaceBarAnimation).to( { alpha: 1 }, 150, Phaser.Easing.Linear.None, true, 0, 75, true);
			setTimeout(function() { spaceBarAnimation.kill(); }, 300);
			// Variables for the image function
			var exitNum = 0;
			var scale = .5;
			// Start Button animation
			var scaleUp = setInterval(
			  function() {
			  	exitNum++;
			  	if (exitNum > 1000) {
			  		clearInterval(scaleUp);
			  	};
		      scale += 0.2;
			    spaceBarAnimation.scale.setTo(scale, scale);
			    spaceBarAnimation.x -= 40;
			    spaceBarAnimation.y -= 30;
			  }, 20);
		}, 500);
	}
	// Repeat the animation until the player activates starpower
	var repeatSpaceBarAnimation = setInterval( function() {
		if (starPower !== 300) {
			clearInterval(repeatSpaceBarAnimation);
			firstTimeSpaceBarFlag = true;
		} else {
			animateLoop();
		};
	}, 2000)
}

// Mute audio on missed notes
function mute_song(){
	audio_Melody_Slime.muted = true;
	audio_Melody_P66.muted = true;
	audio_Melody_Fade.muted = true;
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
	    if (vol >= 0) {currSong.volume = vol;}
	    else {
	    	// rest the volume of the cheering for next streak
	    	vol = .5;
		    currSong.pause();
		    currSong.currentTime = 0;
		    currSong.volume = vol;
		    clearInterval(fadeout);
		    fadeOutCheck = false;
	    }
	  }, 200);
}

// Reset laser when the laser goes out of bounds (missed a note)
function resetLaser(laser, wrongNoteCheck) {
	// console.log("laser", laser);
	// Rest the multiplier counter
	multiplier = 1;
	// check for the number of missed notes and fire boo audio
	booCounter--;
	if (booCounter === -10) {
		// visual effects for missed notes
		$("#game_container").addClass("MULTImissedNoteBoarder");
		audio_boo.play();
	};
	// mute the applause if it is playing
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

// This animates the border when star power is activated
function activateStarPowerBorder() {
	var counter = 0;
	var changeBoarder = setInterval(
	  function() {
	    if (counter < 20) {
	    	counter += 1;
	    	// Add and rotate borders here
				$("#game_container").addClass("star_power");
				setTimeout(function() { $("#game_container").removeClass("star_power"); }, 100);
				setTimeout(function() { $("#game_container").addClass("star_power1"); }, 100);
				setTimeout(function() { $("#game_container").removeClass("star_power1"); }, 200);
				// setTimeout(function() { $("#game_container").addClass("star_power2"); }, 200);
				// setTimeout(function() { $("#game_container").removeClass("star_power2"); }, 300);
				setTimeout(function() { $("#game_container").addClass("star_power3"); }, 200);
				setTimeout(function() { $("#game_container").removeClass("star_power3"); }, 300);
				setTimeout(function() { $("#game_container").addClass("star_power4"); }, 300);
				setTimeout(function() { $("#game_container").removeClass("star_power4"); }, 400);
				setTimeout(function() { $("#game_container").addClass("star_power5"); }, 400);
				setTimeout(function() { $("#game_container").removeClass("star_power5"); }, 500);
	    } else {
		    clearInterval(changeBoarder);
	    }
	  }, 500);
}


// Functions to animate the lightning strikes
function lightning_Stutter(currentLightningIMG, x, y) {
  var StarPowerBorderLightning = this.game.add.sprite(x,y,currentLightningIMG);
  setTimeout(function() { StarPowerBorderLightning.destroy(); }, 50);
}
function lightning_Strike(currentLightningIMG, x, y) {
	var StarPowerBorderLightning = this.game.add.sprite(x,y,currentLightningIMG);
  setTimeout(function() { StarPowerBorderLightning.destroy(); }, 300);
}
function activateLightningChain(currentLightningIMG, x, y) {
	lightning_Strike(currentLightningIMG, x, y);
	var timer = 400
	for (var i = 1; i < 5; i++) {
  	setTimeout(function() { lightning_Stutter(currentLightningIMG, x, y); }, timer);
		timer += 100
	};
  setTimeout(function() { lightning_Strike(currentLightningIMG, x, y); }, 800);
}
// Initiate the chain
function activateStarPowerLightning() {
	// Fire first lightning
	activateLightningChain('StarPowerBorderLightning', -20, -60);
	// Fire second lightning
	setTimeout(function() { activateLightningChain('StarPowerBorderLightning2', -60, -60); }, 500);
}

// This activates all the audio effects on the activation of star power
function activateStarPowerAudio_Effects() {
	// Add Low Pass Filter, it is delayed until the end of star power
	setTimeout(function() { starPowerLowPassFilter(); }, 9100);
	// Add ping_pong delay
	starPowerPing_Pong_Delay();
}

//Low Pass filter effect
function starPowerLowPassFilter() {
	// Set values to use for the q value and frequency cutoff
	var Q_value = 0;
	var frequency = 20000;
	var newDivider = 10000;
	// function to lower the frequency cutoff
	var lowPass_Down = setInterval(
		// Lower the cutoff frequency, add to the q-value to emphasize the frequencies as it cuts them off
	  function() {
	  	Q_value += 0.5;
      frequency = newDivider;
	  	newDivider /= 1.1;
	    if (frequency > 500) {
	    	filter0.Q.value = Q_value;
	    	filter1.Q.value = Q_value;
	    	filter2.Q.value = Q_value;
	    	filter0.frequency.value = frequency;
	    	filter1.frequency.value = frequency;
	    	filter2.frequency.value = frequency;
	    } else {
	    	// Q_value = 0;
	    	clearInterval(lowPass_Down);
	    }
	  }, 10);
	// function to raise the frequency cutoff back to normal
	function lowPass_Up_Call () {
		var lowPass_Up = setInterval(
		  function() {
		  	Q_value -= 0.5;
	      frequency = newDivider;
		  	newDivider *= 1.1;
		    if (frequency < 10000) {
		    	filter0.Q.value = 0;
		    	filter1.Q.value = 0;
		    	filter2.Q.value = 0;
		    	filter0.frequency.value = frequency;
		    	filter1.frequency.value = frequency;
		    	filter2.frequency.value = frequency;
		    } else {
		    	Q_value = 0;
		    	clearInterval(lowPass_Up);
		    }
		  }, 10);
	}
	setTimeout(function() { lowPass_Up_Call(); }, 1000);
}
// This controls the ping-pong audio delay
function starPowerPing_Pong_Delay() {
	var ppWet_Level = 0;
	var addDelay = setInterval(
	    function() {
	      ppWet_Level += 0.05;
	      if (chosenSong === "Slime") {
	      	if (ppWet_Level < 1) {
						ping_pong_Slime.wetLevel.gain.value = ppWet_Level; //value of wet level
		      } else {
		        clearInterval(addDelay);
		      }
	      } else {
	      	// This adds less ping pong delay than on "Slime"
	      	if (ppWet_Level < .7) {
						ping_pong_P66.wetLevel.gain.value = ppWet_Level;
						ping_pong_Fade.wetLevel.gain.value = ppWet_Level;
		      } else {
		        clearInterval(addDelay);
		      }
	      }
	    }, 250);
    // rest the ping pong and break the loop
		setTimeout(function() {
			ping_pong_Slime.wetLevel.gain.value = 0;
			ping_pong_P66.wetLevel.gain.value = 0;
			ping_pong_Fade.wetLevel.gain.value = 0;
		}, 10000);
}

// Activate star power when player presses space bar
function activateStarPower() {
	if (starPower === 300) {
		// Play Explosion to get this party started!
		spExplosion.play();
		// Add border visual
		activateStarPowerBorder();
		// Add lightning effects
		activateStarPowerLightning();
		setTimeout(function() { activateStarPowerLightning(); }, 5000);
		// Add audio effects
		activateStarPowerAudio_Effects();
		// Add applause if it isn't already going
		if (audio_applause.paused) {
			audio_applause.play();
		};
		// Disable Star Power after 10 seconds
		setTimeout(function() {
			// Redefine that star power is not active any more
			isStarPowerActive = false;
			$("#game_container").removeClass("star_power");
			// Ensure that starPower is reset
			starPower = 0 ;
		}, 10000);
		// Variable to indicate that star power is currently on
		isStarPowerActive = true;
		// Diminish star power number over time
		var diminishStarpower = setInterval(
  	// lower the star power until it reaches 0, then clear the interval
	  function() {
	    if (starPower > 10) {
	    	starPower -= 1;
	    } else {
	    	starPower = 0;
		    clearInterval(diminishStarpower);
	    }
	  }, 34);
	};
}

function dealWithCorrectNotes(thisNote) {
	// Correct notes don't deserve boo's
	booCounter = 0;
	calmultiplyer();
	// Add to currentStreak
	currentStreak++
	// Enable music for correct notes
	if (chosenSong === "Slime") {
		audio_Melody_Slime.muted = false;
	};
	if (chosenSong === "I_Want_You") {
		audio_Melody_P66.muted = false;
	};
	if (chosenSong === "Fade") {
		audio_Melody_Fade.muted = false;
	};
	// Kill the note so it doesn't go out of bounds
	thisNote.destroy();
	// remove missed not visual
	$("#game_container").removeClass("MULTImissedNoteBoarder");
}

// Calculate Multiplier and check Star Power
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
	// Check for starPower
	if (isStarPowerActive === false) {
		// Add to starPower, don't allow it to go over 100.
		if (chosenSong === "I_Want_You") {
			starPower += 6
	  } else if (chosenSong === "Slime") {
			starPower += 10
	  } else if (chosenSong === "Fade") {
	  	starPower += 6
	  }
		if (starPower > 300) {
			starPower = 300;
			// Animation to indicate that StarPower is available
			starBarFull = true;
		}
	} else {
		// The player is utilizing StarPower, add the multiplier
		multiplier = multiplier * 2;
		// Add the lightning image and add animation
		var lightningIMG = game.add.image(X_cord-80, 470, 'StarPowerLightning');
		lightningIMG.scale.setTo(0.6, 0.6);
		lightningIMG.alpha = 0;
		game.add.tween(lightningIMG).to( { alpha: 1 }, 150, Phaser.Easing.Linear.None, true, 0, 75, true);
		setTimeout(function() { lightningIMG.kill(); }, 300);
		var exitNum = 0;
		var scale = 0.6;
		var scaleUp = setInterval(
		  function() {
		  	exitNum++;
		  	if (exitNum > 1000) {
		  		clearInterval(scaleUp);
		  	};
	      scale += 0.005;
		    lightningIMG.scale.setTo(scale, scale);
		  }, 20);
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
		laser.body.velocity.y = 290;
	}
}
function fire_J_Laser() {
	var laser = lasers_K_.getFirstExists(false);
	laser.scale.setTo(0.05, 0.05);
	laser.angle = 3;
	scaleNote(laser);
	if (laser) {
		laser.reset(205, 230);
		laser.body.velocity.y = 290;
		laser.body.velocity.x = -80;
	}
}
function fire_L_Laser() {
	var laser = lasers_J_.getFirstExists(false);
	laser.scale.setTo(0.05, 0.05);
	laser.angle = -3;
	scaleNote(laser);
	if (laser) {
		laser.reset(250, 230);
		laser.body.velocity.y = 290;
		laser.body.velocity.x = 80;
	}
}


// Render some debug text on screen
function render() {}






