// // setTimeout(function() { fireRedLaser(); }, 2500);
// // setTimeout(function() { fireBlueLaser(); }, 7000);
// // setTimeout(function() { fireGreenLaser(); }, 3000);

// // INTRO //
// // A.a //

// var fireSong = function() {
//   var sectionA = 0;
//   var introAa = function () {
//     setTimeout(function() { fireRedLaser(); }, 000);
//     setTimeout(function() { fireBlueLaser(); }, 250);
//     setTimeout(function() { fireGreenLaser(); }, 500);

//     setTimeout(function() { fireRedLaser(); }, 1500);
//     setTimeout(function() { fireGreenLaser(); }, 1750);
//     setTimeout(function() { fireBlueLaser(); }, 2000);

//     setTimeout(function() { fireBlueLaser(); }, 3500);
//     setTimeout(function() { fireGreenLaser(); }, 3750);
//     setTimeout(function() { fireRedLaser(); }, 4000);
//     setTimeout(function() { fireBlueLaser(); }, 4250);
//     setTimeout(function() { fireGreenLaser(); }, 4500);

//     setTimeout(function() { fireBlueLaser(); }, 5500);
//     setTimeout(function() { fireGreenLaser(); }, 5750);
//     setTimeout(function() { fireRedLaser(); }, 6000);
//     setTimeout(function() { fireBlueLaser(); }, 6250);
//     setTimeout(function() { fireGreenLaser(); }, 6500);

//     if (sectionA === 1) {
//       return;
//     };

//     setTimeout(function() { fireBlueLaser(); }, 6750);
//     setTimeout(function() { fireGreenLaser(); }, 7000);
//     setTimeout(function() { fireBlueLaser(); }, 7250);
//     setTimeout(function() { fireRedLaser(); }, 7500);
//     setTimeout(function() { fireBlueLaser(); }, 7750);
//     sectionA++;
//   };

//   // FIRE Section A.a //
//   setTimeout(function() { introAa(); }, 7000);
//   setTimeout(function() { introAa(); }, 15000);

//   // A.b
//   var introAb = function () {
//     setTimeout(function() { fireBlueLaser(); }, 500);
//     setTimeout(function() { fireGreenLaser(); }, 750);
//     setTimeout(function() { fireRedLaser(); }, 1000);
//     setTimeout(function() { fireBlueLaser(); }, 1250);
//     setTimeout(function() { fireGreenLaser(); }, 1500);
//     setTimeout(function() { fireRedLaser(); }, 1750);
//     setTimeout(function() { fireBlueLaser(); }, 2000);
//     setTimeout(function() { fireGreenLaser(); }, 2250);
//   }
//   // FIRE Section A.b //
//   setTimeout(function() { introAb(); }, 22000);
//   setTimeout(function() { introAb(); }, 24000);
//   setTimeout(function() { introAb(); }, 26000);
//   setTimeout(function() { introAb(); }, 28000);


//   // Drop
//   var drop = function () {
//     var sectionB = 0;
//     // Drop.a
//     function drop_a_a() {
//       setTimeout(function() { fireRedLaser(); }, 00);
//       setTimeout(function() { fireGreenLaser(); }, 00);

//       setTimeout(function() { fireRedLaser(); }, 500);
//       setTimeout(function() { fireBlueLaser(); }, 625);
//       setTimeout(function() { fireGreenLaser(); }, 750);
//       setTimeout(function() { fireBlueLaser(); }, 875);
//       setTimeout(function() { fireRedLaser(); }, 1000);
//       setTimeout(function() { fireBlueLaser(); }, 1625);
//       setTimeout(function() { fireGreenLaser(); }, 1625);
//     }
//     drop_a_a();

//     function drop_a_b() {
//       setTimeout(function() { fireRedLaser(); }, 2000);
//       setTimeout(function() { fireBlueLaser(); }, 2125);
//       setTimeout(function() { fireGreenLaser(); }, 2250);
//       setTimeout(function() { fireBlueLaser(); }, 2375);
//       setTimeout(function() { fireGreenLaser(); }, 2500);
//       setTimeout(function() { fireGreenLaser(); }, 2750);

//       if (sectionB === 1) {
//         return;
//       };
//       setTimeout(function() { fireGreenLaser(); }, 3000);
//       setTimeout(function() { fireRedLaser(); }, 3000);

//       setTimeout(function() { fireGreenLaser(); }, 3250);
//       setTimeout(function() { fireBlueLaser(); }, 3250);

//       setTimeout(function() { fireGreenLaser(); }, 3500);
//       setTimeout(function() { fireRedLaser(); }, 3500);

//       setTimeout(function() { fireGreenLaser(); }, 3750);
//       setTimeout(function() { fireBlueLaser(); }, 3750);

//       // Drop.b
//       setTimeout(function() { drop_a_a(); }, 4000);
//       // Continue Drop.b.b
//       setTimeout(function() { fireRedLaser(); }, 6000);
//       setTimeout(function() { fireGreenLaser(); }, 6500);
//       setTimeout(function() { fireGreenLaser(); }, 6750);
//       setTimeout(function() { fireBlueLaser(); }, 7000);
//       setTimeout(function() { fireBlueLaser(); }, 7167);
//       setTimeout(function() { fireBlueLaser(); }, 7333);
//       setTimeout(function() { fireGreenLaser(); }, 7500);
//       sectionB++;
//     }
//     drop_a_b();


// ////////////////////////////////////////////////////////////////////////
//     setTimeout(function() { fireGreenLaser(); }, 8000);
//     setTimeout(function() { fireGreenLaser(); }, 8500);
//     setTimeout(function() { fireGreenLaser(); }, 9000);
//     setTimeout(function() { fireGreenLaser(); }, 9500);
// ////////////////////////////////////////////////////////////////////////

//     setTimeout(function() { fireGreenLaser(); }, 10000);
//     setTimeout(function() { fireBlueLaser(); }, 10000);

//     setTimeout(function() { fireRedLaser(); }, 10500);
//     setTimeout(function() { fireBlueLaser(); }, 10625);
//     setTimeout(function() { fireGreenLaser(); }, 10750);
//     setTimeout(function() { fireBlueLaser(); }, 10875);
//     setTimeout(function() { fireRedLaser(); }, 11000);
//     setTimeout(function() { fireBlueLaser(); }, 11167);
//     setTimeout(function() { fireBlueLaser(); }, 11333);
//     setTimeout(function() { fireGreenLaser(); }, 11500);


//     // Drop.c

//   }

//   setTimeout(function() { drop(); }, 31000);
//   setTimeout(function() {  drop(); }, 47000);


//   // OUTRO
//   function outro() {
//     var lastPhrase;
//     function dblbeat_1() {
//       setTimeout(function() { fireGreenLaser(); }, 00);
//       setTimeout(function() { fireBlueLaser(); }, 125);
//     }

//     function dblbeat_2() {
//       setTimeout(function() { fireBlueLaser(); }, 00);
//       setTimeout(function() { fireRedLaser(); }, 125);
//     }

//     function dblbeat_3() {
//       setTimeout(function() { fireRedLaser(); }, 00);
//       setTimeout(function() { fireGreenLaser(); }, 125);
//     }

//     // Reuse this code to keep it DRY
//     function fire_dblbeats(currDblBeat, num) {
//       setTimeout(function() { fireBlueLaser(); }, 250);

//       setTimeout(function() { currDblBeat(); }, 500);
//       if (num === 0) {
//         setTimeout(function() { currDblBeat(); }, 875);
//       };
//       setTimeout(function() { currDblBeat(); }, 1250);
//       setTimeout(function() { currDblBeat(); }, 1625);
//     }

//     setTimeout(function() { fire_dblbeats(dblbeat_1, 0); }, 0);
//     setTimeout(function() { fire_dblbeats(dblbeat_2, 0); }, 2000);
//     setTimeout(function() { fire_dblbeats(dblbeat_3, 1); }, 4000);

//     // Continue to the second phrase
//     setTimeout(function() { fireBlueLaser(); }, 5000);
//     setTimeout(function() { fireGreenLaser(); }, 5250);
//     setTimeout(function() { fireRedLaser(); }, 5500);
//     setTimeout(function() { fireBlueLaser(); }, 5750);
//     setTimeout(function() { fireRedLaser(); }, 6000);

//     if (lastPhrase === 1) {
//       setTimeout(function() { fireBlueLaser(); }, 6000);
//       setTimeout(function() { fireGreenLaser(); }, 6250);
//       setTimeout(function() { fireRedLaser(); }, 6500);
//       setTimeout(function() { fireBlueLaser(); }, 6750);
//       setTimeout(function() { fireRedLaser(); }, 7000);
//     };
//     lastPhrase++;
//   }
//   setTimeout(function() { outro(); }, 63000);
//   setTimeout(function() { outro(); }, 71000);

//   // Fire function to add score to player
//   setTimeout(function() { postScore(playerScore, currentHighStreak); }, 81000);
//   // display leaderboard with ajax request
//   setTimeout(function() { getPlayers(playerScore, currentHighStreak); }, 82005);
// };









