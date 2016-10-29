function fireSongWithCurrentNote(noteArray){
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
var time = 0;
var calcTimeDelay;
var currentSongNotesToFire;
function fireSongArrayOfNotes(){
    calcTimeDelay = setInterval(function(){
        fireSongWithCurrentNote(currentSongNotesToFire.notes[noteCount][1]);
        var actualTimeNoteWasFired = Date.now() - gameStartTimeStamp;
        calcTimeDelay = window.clearInterval(calcTimeDelay);
        if (noteCount < currentSongNotesToFire.notes.length-1) {
            //Get the difference between the timing of the notes
            time = (currentSongNotesToFire.notes[noteCount+1][0] - currentSongNotesToFire.notes[noteCount][0]).toFixed(0);
            // adjust for the delay
            time -= (actualTimeNoteWasFired - currentSongNotesToFire.notes[noteCount][0])
        };
        noteCount += 1;
        // fire the notes if there are still notes to play
        if (noteCount < currentSongNotesToFire.notes.length) {
            fireSongArrayOfNotes();
        } else {
            clearInterval(calcTimeDelay);
            setTimeout (function(){
                audio_applause2.play()
                postScore(playerScore, currentHighStreak, leaderBoardStringId)
            }, 2000)
        }
    }, time);
}






