"use strict";

var currentPlayerUID;
var ref = new Firebase("https://phonx-rave.firebaseio.com/");

// when the login modal is clicked, show appropriate divs
$(".launch_login_modal").on('click', ()=>{
  $("#log_In_Title").removeClass("hidden");
  $("#login_up_BTN").removeClass("hidden");
  $("#sign_Up_Title").addClass("hidden");
  $("#user_Name_Input").addClass("hidden");
  $("#sign_up_BTN").addClass("hidden");
})

// when the sign up modal is clicked, show appropriate divs
$(".launch_signup_modal").on('click', ()=>{
  $("#sign_Up_Title").removeClass("hidden");
  $("#user_Name_Input").removeClass("hidden");
  $("#sign_up_BTN").removeClass("hidden");
  $("#log_In_Title").addClass("hidden");
  $("#login_up_BTN").addClass("hidden");
})

$("#logInScreen").on('click', ()=>{
  // Hide the login-intro screen
  $(".login_intro").addClass("hidden");
  // On click, go to the login/signup screen
  $(".login").removeClass("hidden");
})

$("#sign_up_BTN").on('click', ()=>{
  //Define user name and psWord
  let userName = $("#sign_up_userName").val();
  let userEmail = $("#sign_up_email").val();
  let userPassword = $("#sign_up_password").val();
  console.log(userName);
  console.log(userEmail);
  console.log(userPassword);
  ref.createUser({
    email    : userEmail,
    password : userPassword
  }, function(error, userData) {
    if (error) {
      if (userName === "" || userEmail === "" || userPassword === "") {
        alert("Please fill in all the required information");
        return;
      };
      console.log("Error creating user:", error);
    } else {
      if (userName === "" || userEmail === "" || userPassword === "") {
        alert("Please fill in all the required information");
        return;
      };
      console.log("Successfully created user account with uid:", userData.uid);
      // On click, create the game
      console.log("ref.getAuth", userData.uid);
      createPlayer(userData.uid, userName);
      // Hide the login screen
      $(".login_intro").addClass("hidden");
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
      var errorTxt = error.toString();
      if (errorTxt.indexOf("email") > 0) {
        window.alert("Incorrect email")
      } else if (errorTxt.indexOf("password") > 0) {
        window.alert("Incorrect password")
      };
      console.log(error);
    } else {
      // Write code to allow user to access the website
      console.log("Authenticated successfully with payload:", authData);
      // Assign the correct currentPlayerUID
      currentPlayerUID = authData.uid
      // Hide the login screen
      $(".login_intro").addClass("hidden");
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
  $(".instructions").removeClass("hidden");
});

$("#expert").click(()=>{
  // Set difficulty
  difficulty = "expert";
  // On click, create the game and change the screen
  $(".difficulty").addClass("hidden");
  $(".instructions").removeClass("hidden");
});


$("#startGame").click(()=>{
  // On click, create the game and change the screen
  $(".instructions").addClass("hidden");
  createGame();
});




