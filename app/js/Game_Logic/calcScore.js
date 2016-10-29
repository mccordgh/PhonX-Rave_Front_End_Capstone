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

// Calculate Score
function calScore(curNote) {
  if (gameStarted === false) {
    return;
  };
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