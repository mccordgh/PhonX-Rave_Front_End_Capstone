// Activate star power when player presses space bar
function activateStarPower() {
  if (starPower === 300) {
    // Play Explosion to get this party started!
    spExplosion.play();
    // time stamp for the beginning of star power
    starPowerSTARTTime = Date.now();
    // Add border visual
    activateStarPowerBorder(null);
    // Add lightning effects
    activateStarPowerLightning();
    setTimeout(function() { activateStarPowerLightning(); }, 5000);
    // Add audio effects
    activateStarPowerAudio_Effects();
    // Add applause if it isn't already going
    if (audio_applause.paused) {
      audio_applause.play();
    };
    isStarPowerActive = true;
    diminishStarpowerFunction();
  };
}

// Diminish star power number over time
diminishStarpowerFunction = function() {
  var diminishStarpower = setInterval(
  // lower the star power until it reaches 0, then clear the interval
  function() {
    if (gameIsPaused === true) {
      clearInterval(diminishStarpower);
    } else if (starPower > 1){
      starPower -= 1;
    } else {
      $("#game_container").removeClass("star_power");
      starPower = 0;
      isStarPowerActive = false;
      clearInterval(diminishStarpower);
    }
  }, 34);
}

// This animates the border when star power is activated
function activateStarPowerBorder(unpauseTimeDelayVar) {
  var countTracker = 1;
  // calculation for the duration of star power
  if (unpauseTimeDelayVar === null) {
    starPowerENDTime = starPowerSTARTTime + 10000;
    console.log("starPowerENDTime",starPowerENDTime);
  }else{
    starPowerENDTime += unpauseTimeDelayVar;
  }
  var changeBoarder = setInterval(
    function() {
      if (gameIsPaused === true) {
        setTimeout(function() { $("#game_container").addClass("star_power"+countTracker); }, 101);
        $("#game_container").addClass("star_power1");
        // Stop the animation and find out how much star power time has passed
        clearInterval(changeBoarder);
        starPowerPauseTime = Date.now();
      };
      if (Date.now() < starPowerENDTime) {
        // Add and rotate borders here
        setTimeout(function() { $("#game_container").removeClass(); }, 100);
        $("#game_container").addClass("star_power"+countTracker);
        if (countTracker < 5) {
          countTracker ++
        }else{
          countTracker = 1;
        };
      } else {
        clearInterval(changeBoarder);
      }
    }, 101);
}

// Initiate the chain
function activateStarPowerLightning() {
  // Fire first lightning
  activateLightningChain('StarPowerBorderLightning', -20, -60);
  // Fire second lightning
  setTimeout(function() { activateLightningChain('StarPowerBorderLightning2', -60, -60); }, 500);
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



