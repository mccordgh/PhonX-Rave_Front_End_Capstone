// INTRO //
// A.a //

var fireSlime = function() {
  var sectionA = 0;
  var introAa = function () {
    setTimeout(function() { fire_L_Laser(); }, 000);
    setTimeout(function() { fire_K_Laser(); }, 250);
    setTimeout(function() { fire_J_Laser(); }, 500);

    setTimeout(function() { fire_L_Laser(); }, 1500);
    setTimeout(function() { fire_J_Laser(); }, 1750);
    setTimeout(function() { fire_K_Laser(); }, 2000);

    if (difficulty === "hard") {
      setTimeout(function() { fire_K_Laser(); }, 3500);
      setTimeout(function() { fire_J_Laser(); }, 3750);
    }
    setTimeout(function() { fire_L_Laser(); }, 4000);
    setTimeout(function() { fire_K_Laser(); }, 4250);
    setTimeout(function() { fire_J_Laser(); }, 4500);

    if (difficulty === "hard") {
      setTimeout(function() { fire_K_Laser(); }, 5500);
      setTimeout(function() { fire_J_Laser(); }, 5750);
    }
    setTimeout(function() { fire_L_Laser(); }, 6000);
    setTimeout(function() { fire_K_Laser(); }, 6250);
    setTimeout(function() { fire_J_Laser(); }, 6500);

    if (sectionA === 1) {
      return;
    };
    setTimeout(function() { fire_K_Laser(); }, 6750);
    setTimeout(function() { fire_J_Laser(); }, 7000);
    setTimeout(function() { fire_K_Laser(); }, 7250);
    if (difficulty === "hard") {
      setTimeout(function() { fire_L_Laser(); }, 7500);
      setTimeout(function() { fire_K_Laser(); }, 7750);
    }
    sectionA++;
  };

  // FIRE Section A.a //
  setTimeout(function() { introAa(); }, 7000);
  setTimeout(function() { introAa(); }, 15000);

  // A.b
  var introAb = function () {
    setTimeout(function() { fire_K_Laser(); }, 500);
    setTimeout(function() { fire_J_Laser(); }, 750);
    setTimeout(function() { fire_L_Laser(); }, 1000);
    setTimeout(function() { fire_K_Laser(); }, 1250);
    setTimeout(function() { fire_J_Laser(); }, 1500);
    setTimeout(function() { fire_L_Laser(); }, 1750);
    if (difficulty === "hard") {
      setTimeout(function() { fire_K_Laser(); }, 2000);
      setTimeout(function() { fire_J_Laser(); }, 2250);
    }
  }
  // FIRE Section A.b //
  setTimeout(function() { introAb(); }, 22000);
  setTimeout(function() { introAb(); }, 24000);
  setTimeout(function() { introAb(); }, 26000);
  setTimeout(function() { introAb(); }, 28000);


  // Drop
  var drop = function () {
    var sectionB = 0;
    // Drop.a
    function drop_a_a() {
      setTimeout(function() { fire_L_Laser(); }, 00);
      if (difficulty === "hard") {
        setTimeout(function() { fire_J_Laser(); }, 00);
      }

      setTimeout(function() { fire_L_Laser(); }, 500);
      if (difficulty === "hard") {
        setTimeout(function() { fire_K_Laser(); }, 625);
      }
      setTimeout(function() { fire_J_Laser(); }, 750);
      if (difficulty === "hard") {
        setTimeout(function() { fire_K_Laser(); }, 875);
        setTimeout(function() { fire_L_Laser(); }, 1000);
      }
      setTimeout(function() { fire_K_Laser(); }, 1625);
      setTimeout(function() { fire_J_Laser(); }, 1625);
    }
    drop_a_a();

    function drop_a_b() {
      setTimeout(function() { fire_L_Laser(); }, 2000);
      if (difficulty === "hard") {
        setTimeout(function() { fire_K_Laser(); }, 2125);
        setTimeout(function() { fire_J_Laser(); }, 2250);
      }
      setTimeout(function() { fire_K_Laser(); }, 2375);
      setTimeout(function() { fire_J_Laser(); }, 2500);
      setTimeout(function() { fire_J_Laser(); }, 2750);

      if (sectionB === 1) {
        return;
      };
      setTimeout(function() { fire_J_Laser(); }, 3000);
      if (difficulty === "hard") {
        setTimeout(function() { fire_L_Laser(); }, 3000);
      }

      if (difficulty === "hard") {
        setTimeout(function() { fire_J_Laser(); }, 3250);
      }
      setTimeout(function() { fire_K_Laser(); }, 3250);

      setTimeout(function() { fire_J_Laser(); }, 3500);
      if (difficulty === "hard") {
        setTimeout(function() { fire_L_Laser(); }, 3500);
      }

      if (difficulty === "hard") {
        setTimeout(function() { fire_J_Laser(); }, 3750);
        setTimeout(function() { fire_K_Laser(); }, 3750);
      }
      if (difficulty === "medium") {
        setTimeout(function() { fire_L_Laser(); }, 3750);
      }
      // Drop.b
      setTimeout(function() { drop_a_a(); }, 4000);
      // Continue Drop.b.b
      setTimeout(function() { fire_L_Laser(); }, 6000);
      setTimeout(function() { fire_J_Laser(); }, 6500);
      setTimeout(function() { fire_J_Laser(); }, 6750);
      setTimeout(function() { fire_K_Laser(); }, 7000);
      setTimeout(function() { fire_K_Laser(); }, 7167);
      setTimeout(function() { fire_K_Laser(); }, 7333);
      setTimeout(function() { fire_J_Laser(); }, 7500);
      sectionB++;
    }
    drop_a_b();


////////////////////////////////////////////////////////////////////////
    setTimeout(function() { fire_J_Laser(); }, 8000);
    setTimeout(function() { fire_K_Laser(); }, 8500);
    setTimeout(function() { fire_L_Laser(); }, 8500);
    setTimeout(function() { fire_J_Laser(); }, 9000);
    setTimeout(function() { fire_K_Laser(); }, 9500);
    setTimeout(function() { fire_L_Laser(); }, 9500);
////////////////////////////////////////////////////////////////////////

    setTimeout(function() { fire_J_Laser(); }, 10000);
    setTimeout(function() { fire_K_Laser(); }, 10000);

    setTimeout(function() { fire_L_Laser(); }, 10500);
    if (difficulty === "hard") {
      setTimeout(function() { fire_K_Laser(); }, 10625);
    }
    setTimeout(function() { fire_J_Laser(); }, 10750);
    if (difficulty === "hard") {
      setTimeout(function() { fire_K_Laser(); }, 10875);
    }
    setTimeout(function() { fire_L_Laser(); }, 11000);
    setTimeout(function() { fire_K_Laser(); }, 11167);
    setTimeout(function() { fire_K_Laser(); }, 11333);
    setTimeout(function() { fire_J_Laser(); }, 11500);


    // Drop.c
    function drop_c() {
      setTimeout(function() { fire_L_Laser(); }, 000);
      if (difficulty === "hard") {
        setTimeout(function() { fire_J_Laser(); }, 500);
        setTimeout(function() { fire_J_Laser(); }, 750);
      }
      setTimeout(function() { fire_K_Laser(); }, 1000);
      setTimeout(function() { fire_K_Laser(); }, 1167);
      setTimeout(function() { fire_K_Laser(); }, 1333);
      setTimeout(function() { fire_J_Laser(); }, 1500);
    };
    setTimeout(function() {  drop_c(); }, 12000);

  }

  setTimeout(function() { drop(); }, 31000);
  setTimeout(function() {  drop(); }, 47000);


  // OUTRO
  function outro() {
    function dblbeat_1() {
      if (difficulty === "hard") {
        setTimeout(function() { fire_J_Laser(); }, 00);
      }
      setTimeout(function() { fire_K_Laser(); }, 125);
    }

    function dblbeat_2() {
      if (difficulty === "hard") {
        setTimeout(function() { fire_K_Laser(); }, 00);
      }
      setTimeout(function() { fire_L_Laser(); }, 125);
    }

    function dblbeat_3() {
      if (difficulty === "hard") {
        setTimeout(function() { fire_L_Laser(); }, 00);
      }
      setTimeout(function() { fire_J_Laser(); }, 125);
    }

    // Reuse this code to keep it DRY
    function fire_dblbeats(currDblBeat, num) {
      setTimeout(function() { fire_K_Laser(); }, 250);

      setTimeout(function() { currDblBeat(); }, 500);
      if (num === 0) {
        setTimeout(function() { currDblBeat(); }, 875);
      };
      setTimeout(function() { currDblBeat(); }, 1250);
      setTimeout(function() { currDblBeat(); }, 1625);
    }

    setTimeout(function() { fire_dblbeats(dblbeat_1, 0); }, 0);
    setTimeout(function() { fire_dblbeats(dblbeat_2, 0); }, 2000);
    setTimeout(function() { fire_dblbeats(dblbeat_3, 1); }, 4000);

    // Continue to the second phrase
    setTimeout(function() { fire_K_Laser(); }, 6000);
    setTimeout(function() { fire_J_Laser(); }, 6250);
    setTimeout(function() { fire_L_Laser(); }, 6500);
    setTimeout(function() { fire_K_Laser(); }, 6750);
    setTimeout(function() { fire_L_Laser(); }, 7000);

  }
  // Final 2 beats of the song
  setTimeout(function() { fire_J_Laser(); }, 78250);
  setTimeout(function() { fire_K_Laser(); }, 78500);
  setTimeout(function() { fire_J_Laser(); }, 78750);
  setTimeout(function() { fire_L_Laser(); }, 79000);

  // Fire the outro twice
  setTimeout(function() { outro(); }, 63000);
  setTimeout(function() { outro(); }, 71000);

  // Add applause
  setTimeout(function() {audio_applause2.play()}, 79000);
  // Fire function to add score to player
  setTimeout(function() { postScore(playerScore, currentHighStreak, "slime_"); }, 82000);
};

postScore(playerScore, currentHighStreak, "slime_");









