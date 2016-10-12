// Start Game
function startGame () {
  gameStartTimeStamp = Date.now();
  console.log("gameStartTimeStamp", gameStartTimeStamp);
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
  // variable for the delay
  var delay;
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
    setTimeout(function() {
      // Fire laser notes
      for (var i = 0; i < fadeTimingEvents.length; i++) {
        if (fadeTimingEvents[i].difficulty === difficulty) {
          currentSongNotesToFire = fadeTimingEvents[i];
          delay = currentSongNotesToFire.notes[0][0];
          console.log("delay",delay);
        };
      };
      fireFade();
    }, 550);
    // Play main audio
    audio_Melody_Fade.muted = false;
    audio_Bg_Fade.play();
    audio_Melody_Fade.play();
  }
}

// Render some debug text on screen
function render() {}

