"use strict";
alert('go');
setTimeout(function() {
  createGame(); 
  $("#container")
}, 1000);

window.onload = function() {

  $(".login").addClass("hidden");
  // createGame();
  // console.log("wid", self.innerWidth);
  // if (self.innerWidth < 450) {
  //   console.log("go");

  //   let userEmail = "1@1.com";
  //   let userPassword = "1";

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

  //   setTimeout(function() { fire_L_Laser(); 
  //       // Set difficulty
  //     difficulty = "expert";
  //     // On click, create the game and change the screen
  //     $(".difficulty").addClass("hidden");
  //     createGame();
  //   }, 000);
  // }
};

var currentPlayerUID;
var ref = new Firebase("https://phonx-rave.firebaseio.com/");
$("#sign_up_BTN").on('click', ()=>{
  //Define user name and psWord
  let userName = $("#sign_up_userName").val();
  let userEmail = $("#sign_up_email").val();
  let userPassword = $("#sign_up_password").val();

  ref.createUser({
    email    : userEmail,
    password : userPassword
  }, function(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
    } else {
      console.log("Successfully created user account with uid:", userData.uid);
      $(".login").addClass("hidden");
      // On click, create the game
      console.log("ref.getAuth", userData.uid);
      createPlayer(userData.uid, userName);
      // Hide the login screen
      $(".login").addClass("hidden");
      // On click, go to the difficulty screen
      $(".difficulty").removeClass("hidden");
    }
  });
})


$("#login_up_BTN").on('click', ()=>{
  let userEmail = $("#sign_up_email").val();
  let userPassword = $("#sign_up_password").val();

  ref.authWithPassword({
    email    : userEmail,
    password : userPassword
  }, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      // Write code to allow user to access the website
      console.log("Authenticated successfully with payload:", authData);
      // Assign the correct currentPlayerUID
      currentPlayerUID = authData.uid
      // Hide the login screen
      $(".login").addClass("hidden");
      // On click, go to the difficulty screen
      $(".difficulty").removeClass("hidden");
    }
  });
});

function createPlayer(uid, name){
  currentPlayerUID = uid;
  // var authData = ref.getAuth()
  console.log("uid", uid);
  var newPlayersRef = ref.child("Players");
  var newPlayer = newPlayersRef.push();
  newPlayer.set({
    userName: name,
    longestStreak: 0,
    highScore: 0,
    playerId: uid
  })
};


var difficulty;
$("#medium").click(()=>{
  // Set difficulty
  difficulty = "medium";
  // On click, create the game and change the screen
  $(".difficulty").addClass("hidden");
  createGame();
});

$("#expert").click(()=>{
  // Set difficulty
  difficulty = "expert";
  // On click, create the game and change the screen
  $(".difficulty").addClass("hidden");
  createGame();
});




