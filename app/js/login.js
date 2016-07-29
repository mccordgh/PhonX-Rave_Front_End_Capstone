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

// Back Button functions
$(".back_2").on('click', ()=>{
  $(".choose_song").removeClass("hidden");
  $(".difficulty").addClass("hidden");
})

$(".back_3").on('click', ()=>{
  $(".difficulty").removeClass("hidden");
  $(".instructions").addClass("hidden");
})

// Show the overall leader board
$("#show_leaderboard").on('click', ()=>{
  $(".leaderboard_btn_div").addClass("hidden");
  $(".choose_song").addClass("hidden");
  $(".difficulty").addClass("hidden");
  $(".instructions").addClass("hidden");
  $(".leaderboard").removeClass("hidden");

  // Add content to the leader board
  // Get access to current player info in firebase
  $.ajax({
    url: "https://phonx-rave.firebaseio.com/Players/.json",
    method: "GET"
  }).done(function(playerList) {
    console.log("playerList", playerList);
    // Get access to current player highScore
    console.log("currentPlayerUID", currentPlayerUID);
    // Loop through all players
    console.log(playerList.lenght);
    for (var i = 0; i < playerList.length; i++) {
      console.log(playerList[i]);
    };
    // for (variable in playerList) {
    //   // Check for current player
    //   if (playerList[variable].playerId === currentPlayerUID) {
    //     // If score is greater than the stored data, replace the high score
    //     var userRef = new Firebase(`https://phonx-rave.firebaseio.com/Players/${variable}`);
    //     if (score > playerList[variable][highScoreId]) {
    //       // Modify the 'first' and 'last' children, but leave other data at userScoreRef unchanged
    //       userRef.update({ [highScoreId]: score});
    //     }
    //     // If longest streakToPost is greater than the stored data, replace the longest streak
    //     if (streakToPost > playerList[variable][highStreakId]) {
    //       // Modify the 'first' and 'last' children, but leave other data at userStreakRef unchanged
    //       userRef.update({ [highStreakId]: streakToPost});
    //     }
    //   }
    // }
  }).then(()=>{
    $.ajax({
    url: "https://phonx-rave.firebaseio.com/Players/.json",
    method: "GET"
  }).done(function(playerList) {
      $("#game_container").html("");
      console.log("playerList", playerList);
      var Fade_highScoreId = "lvl3_highScore"
      var Fade_highStreakId = "lvl3_longestStreak"
      var Slime_highScoreId = "slime_highScore"
      var Slime_highStreakId = "slime_longestStreak"
      var Pioneer66_highScoreId = "pioneer66_highScore"
      var Pioneer66_highStreakId = "pioneer66_longestStreak"

      var Fade_playerScoreArray = [];
      var Fade_playerNameArray = [];
      var Fade_playerStreakArray = [];
      var Fade_playerLeaderBoard = [];

      var Slime_playerScoreArray = [];
      var Slime_playerNameArray = [];
      var Slime_playerStreakArray = [];
      var Slime_playerLeaderBoard = [];

      var Pioneer66_playerScoreArray = [];
      var Pioneer66_playerNameArray = [];
      var Pioneer66_playerStreakArray = [];
      var Pioneer66_playerLeaderBoard = [];
      var contentString = "<h4>Leader Board</h4><div class='row'>";
      // Loop through, find the highest score, create a new array for Fade
      for (let player in playerList) {
        console.log("playerList", playerList);
        if (playerList[player].pioneer66_highScore !== 0) {
          // .push(playerList[player].pioneer66_highScore);
          Pioneer66_playerLeaderBoard.push(
            {
              playerName : playerList[player].userName,
              playerHighScore : playerList[player].pioneer66_highScore,
              playerHighStreak : playerList[player].pioneer66_longestStreak
            }
          );
        };
      }
      console.log("Pioneer66_playerLeaderBoard", Pioneer66_playerLeaderBoard);
      // console.log("playerLeaderBoard", playerLeaderBoard);
      Array.prototype.sortOn = function(key){
          this.sort(function(a, b){
              if(a[key] < b[key]){
                  return -1;
              }else if(a[key] > b[key]){
                  return 1;
              }
              return 0;
          });
      }
      Pioneer66_playerLeaderBoard.sortOn("playerHighScore");
      Pioneer66_playerLeaderBoard.reverse();
      console.log("P_66 Shithghjowejg", Pioneer66_playerLeaderBoard);
      console.log("Pioneer66_playerLeaderBoard sorted", Pioneer66_playerLeaderBoard);
      contentString += '<div class="col m4 leader_board_3divs"><h4>I Want You</h4>'
      for (var i = 0; i < Pioneer66_playerLeaderBoard.length; i++) {
        contentString += `<h5>${i+1} ${Pioneer66_playerLeaderBoard[i].playerName}: ${Pioneer66_playerLeaderBoard[i].playerHighScore}</h5><p>Longest Streak: ${Pioneer66_playerLeaderBoard[i].playerHighStreak}</p>`
      };
      contentString += '</div>';
      // Loop through, find the highest score, create a new array for Fade
      for (let player in playerList) {
        console.log("playerList", playerList);
        if (playerList[player].lvl3_highScore !== 0) {
          Fade_playerScoreArray.push(playerList[player].lvl3_highScore);
          Fade_playerLeaderBoard.push(
            {
              playerName : playerList[player].userName,
              playerHighScore : playerList[player].lvl3_highScore,
              playerHighStreak : playerList[player].lvl3_longestStreak
            }
          );
        };
      }
      console.log("Fade_playerLeaderBoard", Fade_playerLeaderBoard);
      // console.log("playerLeaderBoard", playerLeaderBoard);
      Array.prototype.sortOn = function(key){
          this.sort(function(a, b){
              if(a[key] < b[key]){
                  return -1;
              }else if(a[key] > b[key]){
                  return 1;
              }
              return 0;
          });
      }
      Fade_playerLeaderBoard.sortOn("playerHighScore");
      Fade_playerLeaderBoard.reverse();
      console.log("Fade Shithghjowejg", Fade_playerLeaderBoard);
      console.log("Fade_playerLeaderBoard sorted", Fade_playerLeaderBoard);
      contentString += '<div class="col m4 leader_board_3divs"><h4>Fade</h4>'
      for (var i = 0; i < Fade_playerLeaderBoard.length; i++) {
        contentString += `<h5>${i+1} ${Fade_playerLeaderBoard[i].playerName}: ${Fade_playerLeaderBoard[i].playerHighScore}</h5><p>Longest Streak: ${Fade_playerLeaderBoard[i].playerHighStreak}</p>`
      };
      contentString += '</div>';






      // Loop through, find the highest score, create a new array for Fade
      for (let player in playerList) {
        console.log("playerList", playerList);
        if (playerList[player].slime_highScore !== 0) {
          Slime_playerScoreArray.push(playerList[player].slime_highScore);
          Slime_playerLeaderBoard.push(
            {
              playerName : playerList[player].userName,
              playerHighScore : playerList[player].slime_highScore,
              playerHighStreak : playerList[player].slime_longestStreak
            }
          );
        };
      }
      console.log("Slime_playerLeaderBoard", Slime_playerLeaderBoard);
      // console.log("playerLeaderBoard", playerLeaderBoard);
      Array.prototype.sortOn = function(key){
          this.sort(function(a, b){
              if(a[key] < b[key]){
                  return -1;
              }else if(a[key] > b[key]){
                  return 1;
              }
              return 0;
          });
      }
      Slime_playerLeaderBoard.sortOn("playerHighScore");
      Slime_playerLeaderBoard.reverse();
      console.log("Fade Shithghjowejg", Slime_playerLeaderBoard);
      console.log("Slime_playerLeaderBoard sorted", Slime_playerLeaderBoard);
      contentString += '<div class="col m4 leader_board_3divs"><h4>Slime</h4>'
      for (var i = 0; i < Slime_playerLeaderBoard.length; i++) {
        contentString += `<h5>${i+1} ${Slime_playerLeaderBoard[i].playerName}: ${Slime_playerLeaderBoard[i].playerHighScore}</h5><p>Longest Streak: ${Slime_playerLeaderBoard[i].playerHighStreak}</p>`
      };
      contentString += '</div>';











      contentString += '</div>';
      // Post the leader_board
      console.log("contentString", contentString);
      $(".leader_board_info").html(contentString);
    })
  })

})

$(".start_over").on('click', ()=>{
  $(".leaderboard").addClass("hidden");
  $(".leaderboard_btn_div").removeClass("hidden");
  $(".choose_song").removeClass("hidden");
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
          $(".leaderboard_btn_div").removeClass("hidden");
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
      $(".leaderboard_btn_div").removeClass("hidden");
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
  $(".leaderboard_btn_div").addClass("hidden");
  $(".instructions").addClass("hidden");
  createGame();
});




