var fireFade = function(timing, note) {
    for (var i = 0; i < note.length; i++) {
        if (note[i] === "J") {
            setTimeout(function(){fire_J_Laser();}, (4.67*timing));
        };
        if (note[i] === "K") {
            setTimeout(function(){fire_K_Laser();}, (4.67*timing));
        };
        if (note[i] === "L") {
            setTimeout(function(){fire_L_Laser();}, (4.67*timing));
        };
    };
    // Add applause
    setTimeout(function() {audio_applause2.play()}, (4.463*29936));
    // Fire function to add score to player
    setTimeout(function() { postScore(playerScore, currentHighStreak, "lvl3_"); }, (4.463*29936));
    // TEST SCENERIO
    // postScore(playerScore, currentHighStreak, "pioneer66_")
}













