function fireFadeNotes(noteArray){
    // console.log("note",noteArray);
    for (var i = 0; i < noteArray.length; i++) {
        if (noteArray[i] === "J") {
            fire_J_Laser();
        };
        if (noteArray[i] === "K") {
            fire_K_Laser();
        };
        if (noteArray[i] === "L") {
            fire_L_Laser();
        };
    };
}



var noteCount = 0;
var time = 1000;
var intId;
var currentSongNotesToFire;
function fireFade(){
    intId = setInterval(function(){
        // console.log("global time", gameStartTimeStamp);
        fireFadeNotes(currentSongNotesToFire.notes[noteCount][1]);
        //Get the difference between the timing of the notes
        time = currentSongNotesToFire.notes[noteCount+1][0] - currentSongNotesToFire.notes[noteCount][0];
        intId = window.clearInterval(intId);
        noteCount += 1;
        // console.log("time", time);
        fireFade();
    }, time);
    if (noteCount === 1) {
        // Add applause
        setTimeout(function() {audio_applause2.play()}, (4.463*29936));
        // Fire function to add score to player
        setTimeout(function() { postScore(playerScore, currentHighStreak, "lvl3_"); }, (4.463*29936));
        // TEST SCENERIO
        // postScore(playerScore, currentHighStreak, "pioneer66_")
    };
}












var fireFadeNotInWorkingCode = function(timing, note) {
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






