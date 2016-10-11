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