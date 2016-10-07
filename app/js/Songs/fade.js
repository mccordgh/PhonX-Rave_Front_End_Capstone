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


function trial(note, timing){
    console.log("note",note);
    if (note === "J") {
        setTimeout(function(){fire_J_Laser();}, (4.67*timing));
    };
    if (note === "K") {
        setTimeout(function(){fire_K_Laser();}, (4.67*timing));
    };
    if (note === "L") {
        setTimeout(function(){fire_L_Laser();}, (4.67*timing));
    };
}


function interval(func, wait, times){
    var interv = function(w, t){
        return function(){
            if(typeof t === "undefined" || t-- > 0){
                setTimeout(interv, w);
                func("J", 2000);
            }
        };
    }(wait, times);

    setTimeout(interv, wait);
    wait += 1000;
};

interval(trial, 1000, 3);








