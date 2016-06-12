"use strict";

var currentPlayerUID;
var onPage = false;
var getPointerEvent = function(event) {
    return event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0] : event;
};
var $touchArea = $('#touchArea'),
    touchStarted = false, // detect if a touch event is sarted
    currX = 0,
    currY = 0,
    cachedX = 0,
    cachedY = 0;

//setting the events listeners
$touchArea.on('touchstart mousedown',function (e){
    e.preventDefault(); 
    var pointer = getPointerEvent(e);
    // caching the current x
    cachedX = currX = pointer.pageX;
    // caching the current y
    cachedY = currY = pointer.pageY;
    // a touch event is detected      
    touchStarted = true;
    $touchArea.text('Touchstarted');
    // detecting if after 200ms the finger is still in the same position
    setTimeout(function (){
        if ((cachedX === currX) && !touchStarted && (cachedY === currY)) {
            // Here you get the Tap event
            $touchArea.text('Tap');
        }
    },200);
});
$touchArea.on('touchend mouseup touchcancel',function (e){
    e.preventDefault();
    // here we can consider finished the touch event
    touchStarted = false;
    $touchArea.text('Touchended');
});
$touchArea.on('touchmove mousemove',function (e){
    e.preventDefault();
    var pointer = getPointerEvent(e);
    currX = pointer.pageX;
    currY = pointer.pageY;
    if(touchStarted) {
         // here you are swiping
         $touchArea.text('Swiping');
    }
   
});



// var ref = new Firebase("https://phonx-rave.firebaseio.com/");
// $("#sign_up_BTN").on('click', ()=>{
//   //Define user name and psWord
//   let userName = $("#sign_up_userName").val();
//   let userEmail = $("#sign_up_email").val();
//   let userPassword = $("#sign_up_password").val();

//   ref.createUser({
//     email    : userEmail,
//     password : userPassword
//   }, function(error, userData) {
//     if (error) {
//       console.log("Error creating user:", error);
//     } else {
//       console.log("Successfully created user account with uid:", userData.uid);
//       $(".login").addClass("hidden");
//       // On click, create the game
//       console.log("ref.getAuth", userData.uid);
//       createPlayer(userData.uid, userName);
//       // Hide the login screen
//       $(".login").addClass("hidden");
//       // On click, go to the difficulty screen
//       $(".difficulty").removeClass("hidden");
//     }
//   });
// })


// // use enter to fire log in... log in will handle if the user has been created
// $(document).on("keypress", function(e) {
//   if(e.keyCode == '13'){
//     if (onPage) {
//       expert();
//     } else {
//       log_in();
//     }
//   }
// })
// $("#login_up_BTN").on('click', log_in())

// function log_in (){
//   window.alert("hello?");
//   onPage = true;
//   let userEmail = $("#sign_up_email").val();
//   let userPassword = $("#sign_up_password").val();

//   ref.authWithPassword({
//     email    : userEmail,
//     password : userPassword
//   }, function(error, authData) {
//     if (error) {
//       console.log("Login Failed!", error);
//     } else {
//       // Write code to allow user to access the website
//       console.log("Authenticated successfully with payload:", authData);
//       // Assign the correct currentPlayerUID
//       currentPlayerUID = authData.uid
//       // Hide the login screen
//       $(".login").addClass("hidden");
//       // On click, go to the difficulty screen
//       $(".difficulty").removeClass("hidden");
//     }
//   });
// };

// function createPlayer(uid, name){
//   currentPlayerUID = uid;
//   // var authData = ref.getAuth()
//   console.log("uid", uid);
//   var newPlayersRef = ref.child("Players");
//   var newPlayer = newPlayersRef.push();
//   newPlayer.set({
//     userName: name,
//     longestStreak: 0,
//     highScore: 0,
//     playerId: uid
//   })
// };


// var difficulty;
// $("#medium").click(()=>{
//   // Set difficulty
//   difficulty = "medium";
//   // On click, create the game and change the screen
//   $(".difficulty").addClass("hidden");
//   createGame();
// });

// $("#expert").click(expert());

// function expert(){
//   // Set difficulty
//   difficulty = "expert";
//   // On click, create the game and change the screen
//   $(".difficulty").addClass("hidden");
//   createGame();
// };







