var arrayOfVisiblePausedNotes = [];
function stopAnimationOfVisibleNotes(currLaserGroup){
  //Loop through all the lasers and find the ones that are on the page
  for (var i = 0; i < currLaserGroup.children.length; i++) {
    if (currLaserGroup.children[i].visible === true) {
      currLaserGroup.children[i].body.velocity.y = 0;
      currLaserGroup.children[i].body.velocity.x = 0;
      arrayOfVisiblePausedNotes.push(currLaserGroup.children[i]);
    };
  };
}

function pauseGame(){
  // if the game is not paused, pause it
  if (gameIsPaused === false) {
    //pause audio
    if (audio_boo.play) {
      console.log("this is paused");
      audio_boo.pause();
      audio_booPauseIsPlaying = true;
    };
    if (audio_applause.play) {
      console.log("this is paused");
      audio_applause.pause();
      audio_applausePauseIsPlaying = true;
    }
    if (audio_applause2.play) {
      console.log("this is paused");
      audio_applause2.pause();
      audio_applause2PauseIsPlaying = true;
    }
    if (audio_applause3.play) {
      console.log("this is paused");
      audio_applause3.pause();
      audio_applause3PauseIsPlaying = true;
    }
    // audio_applause2.pause();
    // audio_applause2PauseIsPlaying = true;
    // audio_applause3.pause();
    // audio_applause3PauseIsPlaying = true;
    main_GainNode0.gain.value = 0;
    main_GainNode1.gain.value = 0;
    main_GainNode2.gain.value = 0;
    gamePausedTimeStamp = Date.now();
    console.log("pause", gameStartTimeStamp);
    gameIsPaused = true;
    //Pause the music
    audio_Bg_Fade.pause();
    audio_Melody_Fade.pause();
    audio_Bg_P66.pause();
    audio_Melody_P66.pause();
    audio_Bg_Slime.pause();
    audio_Melody_Slime.pause();
    //Stop the animation
    stopAnimationOfVisibleNotes(lasers_J_);
    stopAnimationOfVisibleNotes(lasers_K_);
    stopAnimationOfVisibleNotes(lasers_L_);
    // keep track of timing for pause
    pauseTimeTracker();
    // console.log("arrayOfVisiblePausedNotes",arrayOfVisiblePausedNotes);
    clearInterval(calcTimeDelay);
  } else { // unpause the game
    if (audio_booPauseIsPlaying === true) {
      audio_boo.play();
      audio_booPauseIsPlaying = false;
    };
    if (audio_applausePauseIsPlaying === true) {
      audio_applause.play();
      audio_applausePauseIsPlaying = false;
    }
    if (audio_applause2PauseIsPlaying === true) {
      audio_applause2.play();
      audio_applause2PauseIsPlaying = false;
    }
    if (audio_applause3PauseIsPlaying === true) {
      audio_applause3.play();
      audio_applause3PauseIsPlaying = false;
    }
    main_GainNode0.gain.value = 1;
    main_GainNode1.gain.value = 1;
    main_GainNode2.gain.value = 1;
    // get the time delay from the amount of time paused
    unpauseTimeDelay = Date.now() - gamePausedTimeStamp;
    // reanimate the border and pass in the time delay
    activateStarPowerBorder(unpauseTimeDelay)
    // reanimate the diminish function
    diminishStarpowerFunction();
    console.log("unpauseTimeDelay", unpauseTimeDelay);
    gameStartTimeStamp += unpauseTimeDelay
    console.log("gameStartTimeStamp", gameStartTimeStamp);
    unpauseTimeDelay = 0;
    fireSongArrayOfNotes();
    if (chosenSong === "Slime") {
      audio_Bg_Slime.play();
      audio_Melody_Slime.play();
    }
    if (chosenSong === "I_Want_You") {
      audio_Bg_P66.play();
      audio_Melody_P66.play();
    }
    if (chosenSong === "Fade") {
      audio_Bg_Fade.play();
      audio_Melody_Fade.play();
    }
    gameIsPaused = false;
    // add animation back to the stopped visible notes
    for (var i = 0; i < arrayOfVisiblePausedNotes.length; i++) {
      scaleNote(arrayOfVisiblePausedNotes[i]);
      // arrayOfVisiblePausedNotes[i].angle = -3;
      // get the correct x and y directions based on the x position
      if (arrayOfVisiblePausedNotes[i].x === 228) {
        // this is K
        arrayOfVisiblePausedNotes[i].body.velocity.y = 290;
      } else if (arrayOfVisiblePausedNotes[i].x < 228) {
        // this is J
        arrayOfVisiblePausedNotes[i].body.velocity.y = 290;
        arrayOfVisiblePausedNotes[i].body.velocity.x = -80;
      } else if (arrayOfVisiblePausedNotes[i].x > 228) {
        // this is L
        arrayOfVisiblePausedNotes[i].body.velocity.y = 290;
        arrayOfVisiblePausedNotes[i].body.velocity.x = 80;
      }
    };
    arrayOfVisiblePausedNotes = [];
  }
}

pauseTimeTracker = function () {
  var calPauseTimeDelay = setInterval(
  function() {
    if (gameIsPaused === true) {
      gamePauseTimeDelayStamp = Date.now();
    } else if (gameIsPaused === false) {
      gamePauseTimeDelayStamp = null;
      clearInterval(calPauseTimeDelay);
    }
  }, 9);
}






