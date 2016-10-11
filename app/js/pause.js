var arrayOfVisiblePausedNotes = [];
function stopAnimationOfVisibleNotes(currLaserGroup){
  //Loop through all the lasers and find the ones that are on the page
  for (var i = 0; i < currLaserGroup.children.length; i++) {
    if (currLaserGroup.children[i].visible === true) {
      currLaserGroup.children[i].body.velocity.y = 0;
      currLaserGroup.children[i].body.velocity.x = 0;
      arrayOfVisiblePausedNotes.push(currLaserGroup.children[i]);
      console.log("scale of laser",currLaserGroup.children[i].scale);
    };
  };
}

function pauseGame(){
  // if the game is not paused, pause it
  if (gameIsPaused === false) {
    gameStartTimeStamp = Date.now();
    console.log("pause", gameStartTimeStamp);
    gameIsPaused = true;
    //Pause the music
    audio_Bg_Fade.pause();
    audio_Melody_Fade.pause();
    //Stop the animation
    stopAnimationOfVisibleNotes(lasers_J_);
    stopAnimationOfVisibleNotes(lasers_K_);
    stopAnimationOfVisibleNotes(lasers_L_);
    // console.log("arrayOfVisiblePausedNotes",arrayOfVisiblePausedNotes);
    clearInterval(intId);
  } else { // unpause the game
    fireFade();
    audio_Bg_Fade.play();
    audio_Melody_Fade.play();
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
      console.log("arrayOfVisiblePausedNotes",arrayOfVisiblePausedNotes[i].x);
    };
    arrayOfVisiblePausedNotes = [];
  }
}
