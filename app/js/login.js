"use strict";

var currentPlayerUID;
var ref = new Firebase("https://phonx-rave.firebaseio.com/");
$("#sign_up_BTN").click(()=>{
  //Define user name and psWord
  let userName = $("#sign_up_name").val();
  let userPassword = $("#sign_up_password").val();

  ref.createUser({
    email    : userName,
    password : userPassword
  }, function(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
    } else {
      console.log("Successfully created user account with uid:", userData.uid);
      $(".login").addClass("hidden");
      // On click, create the game
      console.log("ref.getAuth", userData.uid);
      createPlayer(userData.uid);
      createGame();
    }
  });
})

$("#login_up_BTN").click(()=>{
  let userName = $("#sign_up_name").val();
  let userPassword = $("#sign_up_password").val();

  ref.authWithPassword({
    email    : userName,
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
      // On click, create the game
      createGame();
    }
  });
});

$("#logout_up_BTN").click(()=>{
  ref.unauth();
})

// function addNameId()

function createPlayer(uid){
  currentPlayerUID = uid;
  // var authData = ref.getAuth()
  console.log("uid", uid);
  var newPlayersRef = ref.child("Players");
  var newPlayer = newPlayersRef.push();
  newPlayer.set({
    longestStreak: 0,
    highScore: 0,
    playerId: uid
  })
};





