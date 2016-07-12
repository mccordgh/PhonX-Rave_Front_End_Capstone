$(document).ready(function(){
  // Get the height and width of the page
  var window_width = $(window).width();
  var window_height = $(window).height();

  // .each used for multiple modals if necessary
  $('.modal_window').each(function(){
    // Get the height and width of the modal
    var modal_height = $(this).outerHeight();
    var modal_width = $(this).outerWidth();
    // Calculate top and left offset needed for centering
    var top = 50;
    var left = (window_width-modal_width)/3;
    // Apply new top and left css values
    $(this).css({'top' : top , 'left' : left});
  });

  $('.close_modal').click(function(){
    // Use the function to close it
    close_modal();
  });

});

// THE FUNCTIONS
function close_modal(){
  // Hide the mask
  $('#mask').fadeOut(500);
  // Hide modal window(s)
  $('.modal_window').fadeOut(500);
  location.reload();
}

function show_modal(htmlString){
  // Set display to block and opacity to 0 so we can use fadeTo
  $('#mask').css({ 'display' : 'block', opacity : 0});
  // Fade in the mask to opacity 0.8
  $('#mask').fadeTo(500,0.8);
  // Show the modal window
  $('#leader_board').fadeIn(500);
  // Fill in the html with the current leader board string built up in the ajax call
  $('#leader_board').html(htmlString);
}

// Function to post score to Firebase
function postScore(score, streak, song) {
  var streakToPost = streak;
  if (currentStreak > currentHighStreak) {
    streakToPost = currentStreak;
  };
  // Get access to current player info in firebase
  $.ajax({
    url: "https://phonx-rave.firebaseio.com/Players/.json",
    method: "GET"
  }).done(function(playerList) {
    if (song === "slime") {
      // Get access to current player highScore
      console.log("currentPlayerUID", currentPlayerUID);
      // Loop through all players
      for (variable in playerList) {
        // Check for current player
        if (playerList[variable].playerId === currentPlayerUID) {
          // If score is greater than the stored data, replace the high score
          if (score > playerList[variable].highScore) {
            var userScoreRef = new Firebase(`https://phonx-rave.firebaseio.com/Players/${variable}`);
            // Modify the 'first' and 'last' children, but leave other data at userScoreRef unchanged
            userScoreRef.update({ highScore: score});
          }
          // If longest streakToPost is greater than the stored data, replace the longest streak
          if (streakToPost > playerList[variable].longestStreak) {
            var userStreakRef = new Firebase(`https://phonx-rave.firebaseio.com/Players/${variable}`);
            // Modify the 'first' and 'last' children, but leave other data at userStreakRef unchanged
            userStreakRef.update({ longestStreak: streakToPost});
          }
        }
      }
    }
    else if (song === "pioneer66") {
      // Get access to current player highScore
      console.log("currentPlayerUID", currentPlayerUID);
      // Loop through all players
      for (variable in playerList) {
        // Check for current player
        if (playerList[variable].playerId === currentPlayerUID) {
          // If score is greater than the stored data, replace the high score
          if (score > playerList[variable].pioneer66_highScore) {
            var userScoreRef = new Firebase(`https://phonx-rave.firebaseio.com/Players/${variable}`);
            // Modify the 'first' and 'last' children, but leave other data at userScoreRef unchanged
            userScoreRef.update({ pioneer66_highScore: score});
          }
          // If longest streakToPost is greater than the stored data, replace the longest streak
          if (streakToPost > playerList[variable].pioneer66_longestStreak) {
            var userStreakRef = new Firebase(`https://phonx-rave.firebaseio.com/Players/${variable}`);
            // Modify the 'first' and 'last' children, but leave other data at userStreakRef unchanged
            userStreakRef.update({ pioneer66_longestStreak: streakToPost});
          }
        }
      }
    }; // add more songs here
  })
}

// AJAX request to get leader board
function getPlayers (score, streak, song) {
  $.ajax({
    url: "https://phonx-rave.firebaseio.com/Players/.json",
    method: "GET"
  }).done(function(playerList) {
    console.log("playerList", playerList);
    var playerScoreArray = [];
    var playerNameArray = [];
    var playerStreakArray = [];
    var contentString = "<div class='replay'><h4>Click anywhere to play again!</h4></div>"
    contentString += `<h1>Your Score:</h1><h2>${score}</h2>`;
    // Loop through, find the highest score, create a new array
    let trialvar = "highScore";
    for (let player in playerList) {
      playerScoreArray.push(playerList[player][trialvar]);
    }
    // Sort the array by score from highest to lowest
    playerScoreArray.sort(function(a,b){return b - a})
    // Loop through the array and add to the string in the correct order
    for (var i = 1; i < playerScoreArray.length+1; i++) {
      // Loop through and sort the data by the score property, create a name array to correspond with the score array
      for (let player in playerList) {
        if (playerList[player].highScore === playerScoreArray[i-1]) {
          playerNameArray.push(playerList[player].userName);
          playerStreakArray.push(playerList[player].longestStreak)
        };
      }
      // Add to the DOM in the correct order now that both arrays are in order
      contentString += `<h4>${i} ${playerNameArray[i-1]}: ${playerScoreArray[i-1]}</h4>
                        <h5>Longest Streak: ${playerStreakArray[i-1]}</h5>`
    };
    contentString += "<div class='replay'><h4>Click anywhere to play again!</h4></div>"
    // Post the leader_board
    show_modal(contentString);
  })
}





