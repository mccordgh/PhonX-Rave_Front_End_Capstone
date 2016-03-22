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



// Function to post score to Firebase
function postScore(score) {
    // If score is greater than the stored data, replace the high score

// $("#postNewUser").click(function(e) {

//   var UserScore = {
//     "highScore": 0;
//   }
//   $.ajax({
//     url: "https://phonx-rave.firebaseio.com/",
//     method: "POST",
//     data: JSON.stringify(NewUser)
//   }).done(function(addUser) {
//     console.log("NewUser", NewUser);
//     $("#userSongName").val("");
//     $("#userArtistName").val("");
//     $("#userAlbumName").val("");
//     $("#userGenreName").val("");
//   });
// });

}




