// Mute audio on missed notes
function mute_song(){
	audio_Melody_Slime.muted = true;
	audio_Melody_P66.muted = true;
	audio_Melody_Fade.muted = true;
}

// function to fade out audio
function audioFadeOut(currSong) {
	// check this statement so that this function will only fire once
	if (fadeOutCheck === true) {
		return;
	};
	fadeOutCheck = true;
	var vol = .6;
	var fadeout = setInterval(
	  function() {
      vol -= 0.025;
	    if (vol >= 0) {currSong.volume = vol;}
	    else {
	    	// rest the volume of the cheering for next streak
	    	vol = .5;
		    currSong.pause();
		    currSong.currentTime = 0;
		    currSong.volume = vol;
		    clearInterval(fadeout);
		    fadeOutCheck = false;
	    }
	  }, 200);
}

// This activates all the audio effects on the activation of star power
function activateStarPowerAudio_Effects() {
	// Add Low Pass Filter, it is delayed until the end of star power
	setTimeout(function() { starPowerLowPassFilter(); }, 9100);
	// Add ping_pong delay
	starPowerPing_Pong_Delay();
}

//Low Pass filter effect
function starPowerLowPassFilter() {
	// Set values to use for the q value and frequency cutoff
	var Q_value = 0;
	var frequency = 20000;
	var newDivider = 10000;
	// function to lower the frequency cutoff
	var lowPass_Down = setInterval(
		// Lower the cutoff frequency, add to the q-value to emphasize the frequencies as it cuts them off
	  function() {
	  	Q_value += 0.5;
      frequency = newDivider;
	  	newDivider /= 1.1;
	    if (frequency > 500) {
	    	filter0.Q.value = Q_value;
	    	filter1.Q.value = Q_value;
	    	filter2.Q.value = Q_value;
	    	filter0.frequency.value = frequency;
	    	filter1.frequency.value = frequency;
	    	filter2.frequency.value = frequency;
	    } else {
	    	// Q_value = 0;
	    	clearInterval(lowPass_Down);
	    }
	  }, 10);
	// function to raise the frequency cutoff back to normal
	function lowPass_Up_Call () {
		var lowPass_Up = setInterval(
		  function() {
		  	Q_value -= 0.5;
	      frequency = newDivider;
		  	newDivider *= 1.1;
		    if (frequency < 10000) {
		    	filter0.Q.value = 0;
		    	filter1.Q.value = 0;
		    	filter2.Q.value = 0;
		    	filter0.frequency.value = frequency;
		    	filter1.frequency.value = frequency;
		    	filter2.frequency.value = frequency;
		    } else {
		    	Q_value = 0;
		    	clearInterval(lowPass_Up);
		    }
		  }, 10);
	}
	setTimeout(function() { lowPass_Up_Call(); }, 1000);
}
// This controls the ping-pong audio delay
function starPowerPing_Pong_Delay() {
	var ppWet_Level = 0;
	var addDelay = setInterval(
	    function() {
	      ppWet_Level += 0.05;
	      if (chosenSong === "Slime") {
	      	if (ppWet_Level < 1) {
						ping_pong_Slime.wetLevel.gain.value = ppWet_Level; //value of wet level
		      } else {
		        clearInterval(addDelay);
		      }
	      } else {
	      	// This adds less ping pong delay than on "Slime"
	      	if (ppWet_Level < .7) {
						ping_pong_P66.wetLevel.gain.value = ppWet_Level;
						ping_pong_Fade.wetLevel.gain.value = ppWet_Level;
		      } else {
		        clearInterval(addDelay);
		      }
	      }
	    }, 250);
    // rest the ping pong and break the loop
		setTimeout(function() {
			ping_pong_Slime.wetLevel.gain.value = 0;
			ping_pong_P66.wetLevel.gain.value = 0;
			ping_pong_Fade.wetLevel.gain.value = 0;
		}, 10000);
}



