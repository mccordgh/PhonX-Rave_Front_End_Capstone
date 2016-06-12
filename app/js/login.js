"use strict";

var currentPlayerUID;
var onPage = false;

function init() {
  // Get a reference to our touch-sensitive element
  var touchzone = document.getElementById("touchzone");
  // Add an event handler for the touchstart event
  touchzone.addEventListener("touchstart", touchHandler, false);
  alert("come OnNNN!!!")
}

function touchHandler(event) {
  alert("come OnNNN!!!")
  // Get a reference to our coordinates div
  var coords = document.getElementById("coords");
  // Write the coordinates of the touch to the div
  coords.innerHTML = 'x: ' + event.touches[0].pageX + ', y: ' + event.touches[0].pageY;
}





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







