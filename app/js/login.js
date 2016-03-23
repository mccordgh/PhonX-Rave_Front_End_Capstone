"use strict";

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
      createPlayer();
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
      $(".login").addClass("hidden");
      // On click, create the game
      createGame();
    }
  });
});

$("#logout_up_BTN").click(()=>{
  ref.unauth();
})

function createPlayer(){
  var authData = ref.getAuth()
  var newPlayersRef = ref.child("Players");

  var newPlayer = newPlayersRef.push();
  newPlayer.set({
    highScore: 0,
    playerId: authData.uid
  })
};





