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
