function fireFadeNotes(noteArray){
    for (var i = 0; i < noteArray.length; i++) {
        if (noteArray[i] === "J") {
            fire_J_Laser();
            // console.log("J timeStamp",(Date.now()-gameStartTimeStamp));
        };
        if (noteArray[i] === "K") {
            fire_K_Laser();
            // console.log("K timeStamp",(Date.now()-gameStartTimeStamp));
            // console.log("K timeStamp",Date.now());
        };
        if (noteArray[i] === "L") {
            fire_L_Laser();
            // console.log("L timeStamp",Date.now());
        };
    };
}

var noteCount = 0;
var time = 0;
var calcTimeDelay;
var currentSongNotesToFire;
function fireFade(){
    calcTimeDelay = setInterval(function(){
        // console.log("global time", gameStartTimeStamp);
        fireFadeNotes(currentSongNotesToFire.notes[noteCount][1]);
        var actualTimeNoteWasFired = Date.now() - gameStartTimeStamp;
        calcTimeDelay = window.clearInterval(calcTimeDelay);
        //Get the difference between the timing of the notes
        if (noteCount === 0) {
            console.log("global time + note time[i]", gameStartTimeStamp + currentSongNotesToFire.notes[noteCount+1][0]+500);
            console.log("time difference",time);
        };
        time = (currentSongNotesToFire.notes[noteCount+1][0] - currentSongNotesToFire.notes[noteCount][0]).toFixed(0);
        console.log("Working Ok Calc",currentSongNotesToFire.notes[noteCount][0]);
        // adjust for the delay
        time -= (actualTimeNoteWasFired - currentSongNotesToFire.notes[noteCount][0])
        noteCount += 1;
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






