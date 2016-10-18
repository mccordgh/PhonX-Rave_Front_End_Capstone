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
    // console.log("arrayOfVisiblePausedNotes",arrayOfVisiblePausedNotes);
    clearInterval(calcTimeDelay);
  } else { // unpause the game
    // get the time delay from the amount of time paused
    var unpauseTimeDelay = Date.now() - gamePausedTimeStamp;
    // reanimate the border and pass in the time delay
    activateStarPowerBorder(unpauseTimeDelay)
    // reanimate the diminish function
    diminishStarpowerFunction();
    console.log("unpauseTimeDelay", unpauseTimeDelay);
    gameStartTimeStamp += unpauseTimeDelay
    console.log("gameStartTimeStamp", gameStartTimeStamp);
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
