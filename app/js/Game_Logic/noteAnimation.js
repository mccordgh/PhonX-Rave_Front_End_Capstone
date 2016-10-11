function fire_K_Laser() {
  // Get the first laser that's inactive, by passing 'false' as a parameter
  var laser = lasers_K_.getFirstExists(false);
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
  var laser = lasers_J_.getFirstExists(false);
  // console.log("laser", laser);
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
  var laser = lasers_L_.getFirstExists(false);
  laser.scale.setTo(0.05, 0.05);
  laser.angle = -3;
  scaleNote(laser);
  if (laser) {
    laser.reset(250, 230);
    laser.body.velocity.y = 290;
    laser.body.velocity.x = 80;
  }
}

// function to scale the note as it moves down the page
function scaleNote(curNote) {
  var exitNum = 0;
  if (curNote.scale.x !== 0.05) {
    // This is a paused note
    scale = curNote.scale.x;
  } else {
    var scale = 0.05;
  }
  var scaleUp = setInterval(
    function() {
      exitNum++;
      if (exitNum > 1000 || gameIsPaused === true) {
        clearInterval(scaleUp);
      };
      scale += 0.002;
      curNote.scale.setTo(scale, scale);
    }, 20);
};

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

// animation for the fire after correct notes
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
