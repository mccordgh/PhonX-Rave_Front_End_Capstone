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
    var left = (window_width-modal_width)/2;
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

// AJAX request to get leader board
function getPlayers (score, streak) {
  $.ajax({
    url: "https://phonx-rave.firebaseio.com/Players/.json",
    method: "GET"
  }).done(function(playerList) {
    console.log("playerList", playerList);
    var playerContentArray = [];
    var contentString = `<h1>Your Score:</h1><h3>${score}</h3>`;
    // loop through and find the highest score
    for (let player in playerList) {
      console.log("player", playerList[player].highScore);
    //   console.log("player in list:", player);
    //   playerContentArray.push(playerList[player]);
    //   console.log("playerContentArray", playerContentArray);
    }




    // for (let player in playerList) {
    //   // playerList[player].Objid = player;
    //   var currentPlayer = playerList[player];
    //   contentString += "<div class='row musicRow' id='" + player + "'>";
    //     contentString += "<div class='col-md-12 column'>";
    //       contentString += "<h3>" + currentPlayer.title + "</h3>";
    //     contentString += "</div>";
    //     contentString += "<div class='col-md-12 column'>";
    //       contentString += "<h4>" + currentPlayer.artist + " | " + currentPlayer.album + " | " + currentPlayer.genre + "</h4>";
    //     contentString += "</div>";
    //     contentString += "<div class='col-md-12'>";
    //       contentString += '<button type="button" class="btn btn-link deleteBtn">Delete</button>';
    //     contentString += "</div>";
    //   contentString += "</div>";
    // }
    // playerEl.append(contentString);
    // console.log("playerContentArray", playerContentArray);

    show_modal(contentString);
  })
}





