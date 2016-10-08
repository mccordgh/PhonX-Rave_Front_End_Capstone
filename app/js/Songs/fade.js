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

// var x = 1;
// var intervalID = setInterval(function(){
//     if (x >= 5000) {
//         clearInterval(intervalID);
//     };
//     console.log("x",x);
//     x+= 1000;
// }, (1000));


function trial(noteArray){
    console.log("note",noteArray);
    // if (note === "J") {
    //     fire_J_Laser();
    // };
    // if (note === "K") {
    //     fire_K_Laser();
    // };
    // if (note === "L") {
    //     fire_L_Laser();
    // };
}

for (var i = 0; i < fadeTimingEvents.length; i++) {
    if (fadeTimingEvents[i].difficulty === "hard") {
        // This is the difficulty that has been chosen.
        // for (var j = 0; j < fadeTimingEvents[i].notes.length; j++) {
        currentSongNotesToFire = fadeTimingEvents[i];
        // invoke()
        console.log("currentSongNotesToFire", currentSongNotesToFire);
        // invoke(fadeTimingEvents[i].notes[j][0], fadeTimingEvents[i].notes[j][1])
        // };
    };
};

var count = 0;
var time = 1000;
var intId;
var currentSongNotesToFire;
function invoke(){
    intId = setInterval(function(){
        trial(currentSongNotesToFire.notes[count][1]);
        time = currentSongNotesToFire.notes[count+1][0] - currentSongNotesToFire.notes[count][0]; //some new value
        intId = window.clearInterval(intId);
        count += 1;
        console.log("time", time);
        invoke();
    }, time);
}

invoke();





