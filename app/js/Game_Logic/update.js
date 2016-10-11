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
        calScore(lasers_J_);
      };
      if (key.keyCode === 75) {
        calScore(lasers_K_);
      };
      if (key.keyCode === 76) {
        calScore(lasers_L_);
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