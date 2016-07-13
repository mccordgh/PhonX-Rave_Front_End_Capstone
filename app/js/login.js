"use strict";

let currentPlayerUID;
let ref = new Firebase("https://phonx-rave.firebaseio.com/");
let difficulty;
let chosenSong;

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
  // Get access to all users and make sure the user name is not taken
  $.ajax({
    url: "https://phonx-rave.firebaseio.com/Players/.json",
    method: "GET"
  }).done(function(playerList) {
    // set a flag variable
    let isTaken = false;
    for (var variable in playerList) {
      // Check for duplicate names in firebase
      if (playerList[variable].userName === userName) {
        isTaken = true;
      }
    }
    if (isTaken === true) {
      alert("That user name is already taken.")
    } else {
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
          var message = error.toString();
          if (message.indexOf("The specified email address") > 0) {
            alert("This email is already associated with another profile")
          };
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
          // On click, go to the choose_song screen
          $(".choose_song").removeClass("hidden");
        }
      });
    }
  })
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
      var message = error.toString();
      if (message.indexOf("d user does not") > 0) {
            alert("The specified user does not exist")
          };
    } else {
      // Write code to allow user to access the website
      console.log("Authenticated successfully with payload:", authData);
      // Assign the correct currentPlayerUID
      currentPlayerUID = authData.uid
      // Hide the login screen
      $(".login_intro").addClass("hidden");
      // On click, go to the difficulty screen
      $(".choose_song").removeClass("hidden");
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
    slime_longestStreak: 0,
    slime_highScore: 0,
    pioneer66_longestStreak: 0,
    pioneer66_highScore: 0,
    lvl3_longestStreak: 0,
    lvl3_highScore: 0,
    lvl4_longestStreak: 0,
    lvl4_highScore: 0,
    lvl5_longestStreak: 0,
    lvl5_highScore: 0,
    lvl6_longestStreak: 0,
    lvl6_highScore: 0,
    lvl7_longestStreak: 0,
    lvl7_highScore: 0,
    lvl8_longestStreak: 0,
    lvl8_highScore: 0,
    lvl9_longestStreak: 0,
    lvl9_highScore: 0,
    lvl10_longestStreak: 0,
    lvl10_highScore: 0,
    lvl11_longestStreak: 0,
    lvl11_highScore: 0,
    lvl12_longestStreak: 0,
    lvl12_highScore: 0,
    lvl13_longestStreak: 0,
    lvl13_highScore: 0,
    lvl14_longestStreak: 0,
    lvl14_highScore: 0,
    lvl15_longestStreak: 0,
    lvl15_highScore: 0,
    playerId: uid
  })
};

// Functions to choose a song
$("#I_Want_You").on('click', ()=>{
  chosenSong = "I_Want_You";
  creatAudio("Pioneer66", 2, 3)
  $(".choose_song").addClass("hidden");
  $(".difficulty").removeClass("hidden");
});
$("#Slime").on('click', ()=>{
  chosenSong = "Slime";
  creatAudio("Slime", 0, 1)
  $(".choose_song").addClass("hidden");
  $(".difficulty").removeClass("hidden");
});
$("#Fade").on('click', ()=>{
  chosenSong = "Fade";
  creatAudio("Fade", 4, 5)
  $(".choose_song").addClass("hidden");
  $(".difficulty").removeClass("hidden");
});

// Functions to set difficulty
$("#medium").click(()=>{
  // Set difficulty
  difficulty = "medium";
  // On click, create the game and change the screen
  $(".difficulty").addClass("hidden");
  $(".instructions").removeClass("hidden");
});
$("#easy").click(()=>{
  // Set difficulty
  difficulty = "easy";
  // On click, create the game and change the screen
  $(".difficulty").addClass("hidden");
  $(".instructions").removeClass("hidden");
});
$("#hard").click(()=>{
  // Set difficulty
  difficulty = "hard";
  // On click, create the game and change the screen
  $(".difficulty").addClass("hidden");
  $(".instructions").removeClass("hidden");
});


$("#startGame").click(()=>{
  // On click, create the game and change the screen
  $(".instructions").addClass("hidden");
  createGame();
});




